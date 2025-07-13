import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Settings as SettingsIcon, LogOut, Moon, Sun, User, Bell, Shield } from 'lucide-react';

const Settings: React.FC = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Settings</h2>
        <p className="text-secondary">Customize your VibeSpace experience</p>
      </div>

      <div className="space-y-4">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="classic-card"
        >
          <div className="flex items-center space-x-3 mb-4">
            <User className="w-6 h-6 text-teal-400" />
            <h3 className="text-lg font-semibold text-white">Profile</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white/70">Display Name</span>
              <span className="text-white">{user?.displayName || 'User'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70">Email</span>
              <span className="text-white">{user?.email || 'user@example.com'}</span>
            </div>
          </div>
        </motion.div>

        {/* Theme Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="classic-card"
        >
          <div className="flex items-center space-x-3 mb-4">
            <SettingsIcon className="w-6 h-6 text-teal-400" />
            <h3 className="text-lg font-semibold text-white">Appearance</h3>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {isDark ? <Moon className="w-5 h-5 text-white/70" /> : <Sun className="w-5 h-5 text-white/70" />}
              <span className="text-white/70">Dark Mode</span>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                isDark ? 'bg-teal-500' : 'bg-white/20'
              }`}
            >
              <div
                className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                  isDark ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </motion.div>

        {/* Notifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="classic-card"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Bell className="w-6 h-6 text-teal-400" />
            <h3 className="text-lg font-semibold text-white">Notifications</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white/70">Mood Reminders</span>
              <button className="relative w-12 h-6 rounded-full bg-teal-500">
                <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 translate-x-6" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70">New Recommendations</span>
              <button className="relative w-12 h-6 rounded-full bg-white/20">
                <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 translate-x-0.5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Privacy Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="classic-card"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-6 h-6 text-teal-400" />
            <h3 className="text-lg font-semibold text-white">Privacy</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white/70">Share Mood Data</span>
              <button className="relative w-12 h-6 rounded-full bg-white/20">
                <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 translate-x-0.5" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70">Location Access</span>
              <button className="relative w-12 h-6 rounded-full bg-teal-500">
                <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 translate-x-6" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Logout Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={logout}
            className="w-full p-4 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-2xl text-red-400 hover:text-red-300 transition-colors flex items-center justify-center space-x-2"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;