import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Heart, Music, Film, Settings, User, Menu, X, Users, History, RefreshCw, Lightbulb, Globe } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Modal from './Modal';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import type { LatLngExpression } from 'leaflet';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import SavedSessionsModal from './SavedSessionsModal';
import { useMood } from '../contexts/MoodContext';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSosOpen, setSosOpen] = useState(false);
  const { user, logout } = useAuth();
  const [userLocation, setUserLocation] = useState<LatLngExpression | null>(null);
  const { isDark, toggleTheme } = useTheme();
  const { moodHistory } = useMood();
  const [isSavedSessionsOpen, setSavedSessionsOpen] = useState(false);
  const [userInfoOpen, setUserInfoOpen] = useState(false);
  const streak = calculateStreak(moodHistory);
  const summary = getMoodSummary(moodHistory);

  React.useEffect(() => {
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
    window.location.href = '/login';
  };

  function calculateStreak(moodHistory: any[]): number {
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
  function getMoodSummary(moodHistory: any[]): string {
    if (!moodHistory.length) return 'No mood data yet.';
    const moodCounts: Record<string, number> = {};
    let happiestDay = '';
    const dayCounts: Record<string, number> = {};
    moodHistory.forEach((mood: any) => {
      moodCounts[mood.label] = (moodCounts[mood.label] || 0) + 1;
      const day = new Date(mood.timestamp).toLocaleDateString('en-US', { weekday: 'long' });
      dayCounts[day] = (dayCounts[day] || 0) + 1;
    });
    const mostCommonMood = Object.entries(moodCounts).sort((a,b) => b[1]-a[1])[0][0];
    happiestDay = Object.entries(dayCounts).sort((a,b) => b[1]-a[1])[0][0];
    return `Most common mood: ${mostCommonMood}. Happiest day: ${happiestDay}.`;
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'mood', label: 'Mood', icon: Heart },
    { id: 'music', label: 'Music', icon: Music },
    { id: 'musicHistory', label: 'Music History', icon: History },
    { id: 'movies', label: 'Movies', icon: Film },
    { id: 'movieHistory', label: 'Movie History', icon: History },
    { id: 'dailyMuse', label: 'Daily Muse', icon: RefreshCw },
    { id: 'moodTips', label: 'Mood Tips', icon: Lightbulb },
    { id: 'partner', label: 'Partner Sync', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (viewId: string) => {
    onViewChange(viewId);
    setIsOpen(false);
  };

  const hospitals = [
    { name: 'City Hospital', address: '123 Main St', phone: '+1234567890', lat: 37.775, lng: -122.418 },
    { name: 'General Hospital', address: '456 Elm St', phone: '+0987654321', lat: 37.776, lng: -122.417 },
    { name: 'Care Clinic', address: '789 Oak Ave', phone: '+1122334455', lat: 37.774, lng: -122.419 },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-200 classic-btn"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Navigation Sidebar */}
      <motion.nav
        initial={false}
        animate={{ 
          x: isOpen ? 0 : -280,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 h-full w-72 bg-[#18181b] border-r border-gray-800 z-40 md:relative md:translate-x-0 md:opacity-100 md:w-64 text-[#f8f5f0]"
      >
        <div className="p-6 h-full flex flex-col">
          {/* Logo */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-teal-500 rounded-xl flex items-center justify-center">
              <Music className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">VibeSpace</h1>
          </div>

          {/* User Profile Section at the top of sidebar */}
          <div className="bg-[#23272f] rounded-xl p-4 mb-6 border border-gray-700 text-[#f8f5f0]">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-teal-400 rounded-full flex items-center justify-center">
                <Avatar />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{user?.displayName || 'User'}</p>
                <p className="text-white/70 text-sm truncate">{user?.email || 'user@example.com'}</p>
              </div>
            </div>
            <button className="w-full text-left font-bold text-md text-gray-900 dark:text-[#f8f5f0] flex items-center justify-between focus:outline-none mb-2" onClick={() => setUserInfoOpen((v) => !v)}>
              User Info <span className="ml-2">{userInfoOpen ? '▲' : '▼'}</span>
            </button>
            {userInfoOpen && (
              <div className="mt-1 space-y-1 text-sm text-gray-700 dark:text-[#f8f5f0]">
                <div>Name: {user?.displayName || '-'}</div>
                <div>Email: {user?.email || '-'}</div>
                <div>Mobile: {user?.mobile || '-'}</div>
              </div>
            )}
            <div className="mt-2 text-sm">MoodStreaks: <span className="font-bold">{streak}</span></div>
            <div className="mt-2 text-xs text-white/70">{summary}</div>
            <button className="w-full mt-2 btn-secondary" onClick={toggleTheme}>
              {isDark ? <Sun className="w-5 h-5 text-yellow-400 inline" /> : <Moon className="w-5 h-5 text-blue-400 inline" />} {isDark ? 'Light Mode' : 'Dark Mode'}
            </button>
            <button className="w-full mt-2 btn-danger" onClick={handleLogout}>
              Logout / Switch Account
            </button>
            <button className="w-full mt-2 btn-primary" onClick={() => setSavedSessionsOpen(true)}>
              Saved Mood Sessions & Timeline
            </button>
            <SavedSessionsModal isOpen={isSavedSessionsOpen} onClose={() => setSavedSessionsOpen(false)} />
          </div>

          {/* Navigation Items */}
          <div className="space-y-2 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-500 to-teal-500 text-white shadow-lg font-semibold'
                      : 'text-white hover:bg-white/20 hover:text-white bg-white/5'
                  } classic-btn`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Language Selector */}
          <div className="mt-6">
            <button
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-white hover:bg-white/20 hover:text-white bg-white/5 transition-all duration-200 classic-btn"
              // TODO: Implement language selector logic/modal
            >
              <Globe className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium">Language</span>
            </button>
          </div>

          {/* SOS Button */}
          <div className="mt-6">
            <button
              className="w-full flex items-center justify-center btn-danger font-bold transition-all duration-200"
              onClick={() => setSosOpen(true)}
            >
              🚨 SOS
            </button>
          </div>
        </div>
      </motion.nav>
      <Modal isOpen={isSosOpen} onClose={() => setSosOpen(false)}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-500">Emergency - Nearest Hospitals</h2>
          <div className="mb-4" style={{ height: 300, width: '100%' }}>
            {userLocation && (
              <MapContainer center={userLocation as LatLngExpression} zoom={15} style={{ height: '100%', width: '100%', borderRadius: '1rem' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={userLocation as LatLngExpression}>
                  <Popup>You are here</Popup>
                </Marker>
                {hospitals.map((h, i) => (
                  <Marker key={i} position={[h.lat, h.lng] as LatLngExpression}>
                    <Popup>
                      <div className="font-semibold">{h.name}</div>
                      <div className="text-xs">{h.address}</div>
                      <a href={`tel:${h.phone}`} className="block mt-2 px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700">Call</a>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            )}
            {!userLocation && <div className="text-white">Locating...</div>}
          </div>
          <ul className="mb-4 space-y-3">
            {hospitals.map((h, i) => (
              <li key={i} className="bg-[#23272f] rounded-lg p-4 border border-red-500 flex flex-col items-center">
                <div className="font-semibold text-lg text-white">{h.name}</div>
                <div className="text-white/70 text-sm mb-2">{h.address}</div>
                <a href={`tel:${h.phone}`} className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-all">Call {h.phone}</a>
              </li>
            ))}
          </ul>
          <button onClick={() => setSosOpen(false)} className="mt-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800">Close</button>
        </div>
      </Modal>
    </>
  );
};

export default Navigation;