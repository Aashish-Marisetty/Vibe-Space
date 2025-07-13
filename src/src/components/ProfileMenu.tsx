import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import SavedSessionsModal from './SavedSessionsModal';
import { useMood } from '../contexts/MoodContext';
import { MoodData } from '../contexts/MoodContext';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { useState as useReactState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { LatLngExpression } from 'leaflet';

function calculateStreak(moodHistory: MoodData[]): number {
  if (!moodHistory.length) return 0;
  let streak = 1;
  let lastDate = new Date(moodHistory[0].timestamp).setHours(0,0,0,0);
  for (let i = 1; i < moodHistory.length; i++) {
    const thisDate = new Date(moodHistory[i].timestamp).setHours(0,0,0,0);
    if (lastDate - thisDate === 86400000) {
      streak++;
      lastDate = thisDate;
    } else if (lastDate !== thisDate) {
      break;
    }
  }
  return streak;
}

function getMoodSummary(moodHistory: MoodData[]): string {
  if (!moodHistory.length) return 'No mood data yet.';
  const moodCounts: Record<string, number> = {};
  let happiestDay = '';
  const dayCounts: Record<string, number> = {};
  moodHistory.forEach((mood: MoodData) => {
    moodCounts[mood.label] = (moodCounts[mood.label] || 0) + 1;
    const day = new Date(mood.timestamp).toLocaleDateString('en-US', { weekday: 'long' });
    dayCounts[day] = (dayCounts[day] || 0) + 1;
  });
  const mostCommonMood = Object.entries(moodCounts).sort((a,b) => b[1]-a[1])[0][0];
  happiestDay = Object.entries(dayCounts).sort((a,b) => b[1]-a[1])[0][0];
  return `Most common mood: ${mostCommonMood}. Happiest day: ${happiestDay}.`;
}

const ProfileMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [isSavedSessionsOpen, setSavedSessionsOpen] = useState(false);
  const { moodHistory } = useMood();
  const { user, logout } = useAuth();
  const streak = calculateStreak(moodHistory);
  const summary = getMoodSummary(moodHistory);
  const [userInfoOpen, setUserInfoOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const [isSosOpen, setSosOpen] = useReactState(false);
  const [userLocation, setUserLocation] = useReactState<LatLngExpression | null>(null);
  const hospitals = [
    { name: 'City Hospital', address: '123 Main St', phone: '+1234567890', lat: 37.775, lng: -122.418 },
    { name: 'General Hospital', address: '456 Elm St', phone: '+0987654321', lat: 37.776, lng: -122.417 },
    { name: 'Care Clinic', address: '789 Oak Ave', phone: '+1122334455', lat: 37.774, lng: -122.419 },
  ];
  useEffect(() => {
    if (isSosOpen && !userLocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
        () => setUserLocation([37.7749, -122.4194]) // fallback: San Francisco
      );
    }
  }, [isSosOpen, userLocation]);

  // Unknown person emoji avatar
  const Avatar = () => {
    return <span className="text-2xl">👤</span>;
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
    // Redirect to login page
    window.location.href = '/login';
  };

  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-teal-500 flex items-center justify-center focus:outline-none classic-btn"
        onClick={() => setOpen((v) => !v)}
        aria-label="Profile"
      >
        <Avatar />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-[#18181b] rounded-xl shadow-lg py-4 z-50 border border-gray-200 dark:border-classic-gold">
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-900 dark:text-white">Profile Menu</div>
          <ul className="py-2">
            <li className="px-4 py-2 bg-gray-50 dark:bg-[#23272f] rounded-lg mb-2">
              <button
                className="w-full text-left font-bold text-lg text-gray-900 dark:text-[#f8f5f0] flex items-center justify-between focus:outline-none"
                onClick={() => setUserInfoOpen((v) => !v)}
                aria-expanded={userInfoOpen}
                aria-controls="user-info-details"
              >
                User Info
                <span className="ml-2">{userInfoOpen ? '▲' : '▼'}</span>
              </button>
              {userInfoOpen && (
                <div id="user-info-details" className="mt-2 space-y-1 text-sm text-gray-700 dark:text-[#f8f5f0]">
                  <div>Name: {user?.displayName || '-'}</div>
                  <div>Email: {user?.email || '-'}</div>
                  <div>Mobile: {user?.mobile || '-'}</div>
                </div>
              )}
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#23272f] cursor-pointer text-gray-900 dark:text-[#f8f5f0]">MoodStreaks: <span className="font-bold">{streak}</span></li>
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#23272f] cursor-pointer text-gray-900 dark:text-[#f8f5f0]">Partner Link Mode</li>
            <li
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#23272f] cursor-pointer text-gray-900 dark:text-[#f8f5f0]"
              onClick={() => setSavedSessionsOpen(true)}
            >
              Saved Mood Sessions & Timeline
            </li>
            <li
              className="px-4 py-2 hover:bg-red-100 dark:hover:bg-red-900 cursor-pointer text-red-600 dark:text-red-400 font-bold flex items-center space-x-2"
              onClick={() => window.open('https://www.google.com/maps/search/nearest+hospital+in+Vijayawada', '_blank')}
            >
              <span role="img" aria-label="SOS">🚨</span>
              <span>SOS - Nearest Hospitals</span>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#23272f] cursor-pointer text-gray-900 dark:text-[#f8f5f0] flex items-center space-x-2" onClick={toggleTheme}>
              {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-blue-400" />}
              <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
            </li>
            <li 
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#23272f] cursor-pointer text-red-500 dark:text-red-400"
              onClick={handleLogout}
            >
              Logout / Switch Account
            </li>
          </ul>
        </div>
      )}
      <SavedSessionsModal isOpen={isSavedSessionsOpen} onClose={() => setSavedSessionsOpen(false)} />
    </div>
  );
};

export default ProfileMenu; 