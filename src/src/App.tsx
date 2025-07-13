import React, { useEffect, useState } from 'react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { MoodProvider } from './contexts/MoodContext';
import SplashScreen from './components/SplashScreen';
import LandingPage from './components/LandingPage';
import AuthForm from './components/AuthForm';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import MoodSelector from './components/MoodSelector';
import MusicRecommendations from './components/MusicRecommendations';
import MovieRecommendations from './components/MovieRecommendations';
import PartnerSync from './components/PartnerSync';
import Settings from './components/Settings';
import MusicHistory from './components/MusicHistory';
import MovieHistory from './components/MovieHistory';
import DailyMuse from './components/DailyMuse';
import MoodTips from './components/MoodTips';
import LanguageSelector from './components/LanguageSelector';
import ProfileMenu from './components/ProfileMenu';
import { HistoryProvider } from './contexts/HistoryContext';

const AppContent: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard');
  const [enteredLanding, setEnteredLanding] = useState(false);
  const { user, isLoading } = useAuth();
  const { isDark } = useTheme();

  useEffect(() => {
    const hasSeenSplash = localStorage.getItem('vibespace_splash_seen');
    if (hasSeenSplash) {
      setShowSplash(false);
    }
  }, []);

  // Apply theme to document body
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.classList.toggle('light', !isDark);
  }, [isDark]);

  const handleSplashComplete = () => {
    setShowSplash(false);
    localStorage.setItem('vibespace_splash_seen', 'true');
  };

  const handleEnterLanding = () => {
    setEnteredLanding(true);
  };

  if (!enteredLanding) {
    return <LandingPage onEnter={handleEnterLanding} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900 dark:from-purple-900 dark:via-blue-900 dark:to-teal-900 light:from-blue-50 light:via-purple-50 light:to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white dark:border-white light:border-gray-800 mx-auto mb-4"></div>
          <p className="text-white/70 dark:text-white/70 light:text-gray-600">Loading your emotional journey...</p>
        </div>
      </div>
    );
  }

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (!user) {
    return <AuthForm />;
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'mood':
        return <MoodSelector />;
      case 'music':
        return <MusicRecommendations />;
      case 'musicHistory':
        return <MusicHistory />;
      case 'movies':
        return <MovieRecommendations />;
      case 'movieHistory':
        return <MovieHistory />;
      case 'dailyMuse':
        return <DailyMuse />;
      case 'moodTips':
        return <MoodTips />;
      case 'partner':
        return <PartnerSync />;
      case 'settings':
        return <Settings />;
      case 'languageSelector':
        return <LanguageSelector />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 dark:from-black dark:via-gray-900 dark:to-black transition-colors duration-300">
      {/* Sidebar Navigation */}
      <div className="block w-64 h-full">
        <Navigation currentView={currentView} onViewChange={setCurrentView} />
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full h-full">
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center">
          <div className="w-full flex flex-col items-center justify-center">
            {renderCurrentView()}
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MoodProvider>
          <HistoryProvider>
            <AppContent />
          </HistoryProvider>
        </MoodProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;