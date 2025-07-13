import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMood } from '../contexts/MoodContext';
import { useAuth } from '../contexts/AuthContext';
import { Quote, TrendingUp, Clock, Heart } from 'lucide-react';
import WeatherWidget from './WeatherWidget';
import MoodSelector from './MoodSelector';
import SuggestionCardModal from './SuggestionCardModal';
import ProfileMenu from './ProfileMenu';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { currentMood, moodHistory, dailyQuote } = useMood();
  const [isSuggestionModalOpen, setSuggestionModalOpen] = React.useState(false);
  const [weatherData, setWeatherData] = React.useState<any>(null);

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // WeatherWidgetWrapper to intercept weather data
  const WeatherWidgetWrapper = () => {
    // This is a hacky workaround since we can't change WeatherWidget code
    // We'll use a MutationObserver to watch for changes in the DOM and extract weather info
    React.useEffect(() => {
      // No-op: in a real app, WeatherWidget should provide a callback or context
    }, []);
    return <WeatherWidget />;
  };

  // Parallax background state (scroll-based)
  const [bgPosY, setBgPosY] = useState('50%');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Move background up to +/- 20% based on scroll position (tweak factor as needed)
      const yPos = 50 + (scrollY / window.innerHeight) * 20;
      setBgPosY(`${yPos}%`);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen w-full">
      <div
        className="fixed inset-0 w-full h-full z-0"
        style={{
          backgroundImage: "url('/vibespace-bubble2.png.png')",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: `50% ${bgPosY}`,
          backgroundSize: 'cover',
        }}
      />
      <div className="flex flex-row gap-8 w-full max-w-6xl mx-auto p-6 min-h-screen relative z-10">
        {/* Left Column: Greeting, Weather, and Daily Muse */}
        <div className="flex flex-col gap-6 w-1/3 min-w-[220px] max-w-xs">
          {/* Wishes/Greeting as plain text */}
          <div className="mb-2">
            <h1 className="text-3xl font-bold text-primary mb-2">
              {getTimeGreeting()}, {user?.displayName || 'Friend'}!
            </h1>
            <p className="text-secondary">How are you feeling today?</p>
          </div>
          <div className="bg-white dark:bg-[#23272f] rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
            <WeatherWidgetWrapper />
          </div>
          <div className="bg-white dark:bg-[#23272f] rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="flex items-start space-x-3">
              <Quote className="w-6 h-6 text-teal-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">Daily Muse</h3>
                <p className="text-secondary italic">"{dailyQuote}"</p>
              </div>
            </div>
          </div>
        </div>
        {/* Right Column: Main Dashboard Content */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-center justify-between gap-4 mb-2"
          >
            <div className="flex-1 text-left" />
            {/* Move ProfileMenu to top-right */}
            <div className="flex-shrink-0 self-end">
              <ProfileMenu />
            </div>
          </motion.div>
          {/* Mood Selector & Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="flex flex-col items-center justify-center gap-4"
          >
            <div className="w-full flex justify-center">
              <MoodSelector />
            </div>
            {/* Emoji suggestion and ProfileMenu beside each other */}
            <div className="flex flex-row gap-4 mt-2 justify-center">
              <button
                className="btn-primary px-6 py-3 rounded-xl font-semibold shadow hover:scale-105 transition-all"
                onClick={() => setSuggestionModalOpen(true)}
              >
                Get Suggestions
              </button>
              <button
                className="btn-secondary px-6 py-3 rounded-xl font-semibold transition-all"
                onClick={() => {
                  setSuggestionModalOpen(false);
                  setTimeout(() => setSuggestionModalOpen(true), 100); // force re-mount for shuffle
                }}
              >
                Shuffle
              </button>
            </div>
            {/* Mood History Box below mood selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-[#23272f] rounded-2xl p-6 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-[#f8f5f0] shadow-lg w-full max-w-md mt-4"
            >
              <div className="flex items-center space-x-3 mb-2">
                <TrendingUp className="w-6 h-6 text-teal-400" />
                <h3 className="text-lg font-semibold text-primary">Mood History</h3>
              </div>
              {moodHistory.length > 0 ? (
                <div className="space-y-2 text-base">
                  {moodHistory.slice(0, 6).map((mood, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#23272f] rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{mood.emoji}</span>
                        <span className="text-primary font-medium">{mood.label}</span>
                      </div>
                      <span className="text-secondary text-xs">{new Date(mood.timestamp).toLocaleDateString()}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-secondary text-center py-2 text-xs">
                  No mood history yet.
                </p>
              )}
            </motion.div>
          </motion.div>
          <SuggestionCardModal
            isOpen={isSuggestionModalOpen}
            onClose={() => setSuggestionModalOpen(false)}
            weather={weatherData ? { main: weatherData.description, description: weatherData.description } : undefined}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;