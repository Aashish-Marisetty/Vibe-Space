import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, Heart, Share2, Link, Copy, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import SyncSessionModal from './SyncSessionModal';

const PartnerSync: React.FC = () => {
  const [partnerCode, setPartnerCode] = useState('');
  const [myCode] = useState('MOOD-' + Math.random().toString(36).substr(2, 6).toUpperCase());
  const [copied, setCopied] = useState(false);
  const [connectedPartner, setConnectedPartner] = useState<string | null>(null);
  const { user } = useAuth();
  const [isSyncModalOpen, setSyncModalOpen] = useState(false);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(myCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleConnect = () => {
    if (partnerCode.trim()) {
      setConnectedPartner(partnerCode.trim());
      setPartnerCode('');
    }
  };

  const handleDisconnect = () => {
    setConnectedPartner(null);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Partner Sync</h2>
        <p className="text-white/70">Share emotional moments with someone special</p>
      </div>

      {/* My Sync Code */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#23272f] rounded-2xl p-6 border border-gray-700 text-[#f8f5f0]"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Share2 className="w-6 h-6 text-teal-400" />
          <h3 className="text-lg font-semibold text-white">Your Sync Code</h3>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex-1 p-3 bg-[#18181b] rounded-lg border border-gray-700 text-[#f8f5f0]">
            <code className="text-teal-400 font-mono text-lg">{myCode}</code>
          </div>
          <button
            onClick={handleCopyCode}
            className="p-3 bg-teal-500 hover:bg-teal-600 rounded-lg transition-colors"
          >
            {copied ? <Check className="w-5 h-5 text-white" /> : <Copy className="w-5 h-5 text-white" />}
          </button>
        </div>
        <p className="text-white/60 text-sm mt-2">Share this code with your partner to sync moods</p>
      </motion.div>

      {/* Connect Partner */}
      {!connectedPartner ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#23272f] rounded-2xl p-6 border border-gray-700 text-[#f8f5f0]"
        >
          <div className="flex items-center space-x-3 mb-4">
            <UserPlus className="w-6 h-6 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Connect Partner</h3>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Enter partner's sync code"
              value={partnerCode}
              onChange={(e) => setPartnerCode(e.target.value.toUpperCase())}
              className="w-full p-3 bg-[#23272f] border border-gray-700 rounded-lg text-[#f8f5f0] placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
            />
            <button
              onClick={handleConnect}
              disabled={!partnerCode.trim()}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 classic-btn"
            >
              <Link className="w-5 h-5" />
              <span>Connect</span>
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#23272f] rounded-2xl p-6 border border-gray-700 text-[#f8f5f0]"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Users className="w-6 h-6 text-green-400" />
            <h3 className="text-lg font-semibold text-white">Connected Partner</h3>
          </div>
          <div className="flex items-center justify-between p-4 bg-[#18181b] rounded-lg border border-gray-700 text-[#f8f5f0]">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">Partner ({connectedPartner})</p>
                <p className="text-green-400 text-sm">● Connected</p>
              </div>
            </div>
            <button
              onClick={handleDisconnect}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-red-400 hover:text-red-300 transition-colors"
            >
              Disconnect
            </button>
          </div>
        </motion.div>
      )}

      {/* Shared Mood Session */}
      {connectedPartner && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#23272f] rounded-2xl p-6 border border-gray-700 text-[#f8f5f0]"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Heart className="w-6 h-6 text-pink-400" />
            <h3 className="text-lg font-semibold text-white">Shared Mood Session</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-[#18181b] rounded-lg border border-gray-700 text-[#f8f5f0]">
              <div className="text-3xl mb-2">😊</div>
              <p className="text-white font-medium">You</p>
              <p className="text-white/70 text-sm">Happy</p>
            </div>
            <div className="text-center p-4 bg-[#18181b] rounded-lg border border-gray-700 text-[#f8f5f0]">
              <div className="text-3xl mb-2">😌</div>
              <p className="text-white font-medium">Partner</p>
              <p className="text-white/70 text-sm">Relaxed</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-lg border border-pink-500/30">
            <p className="text-white text-center">
              💕 Perfect match for a cozy movie night!
            </p>
          </div>
        </motion.div>
      )}

      <div className="text-center mt-6">
        <button
          className="bg-gradient-to-r from-purple-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold shadow hover:scale-105 transition-all"
          onClick={() => setSyncModalOpen(true)}
        >
          Start Sync Session
        </button>
      </div>

      <SyncSessionModal isOpen={isSyncModalOpen} onClose={() => setSyncModalOpen(false)} />
    </div>
  );
};

export default PartnerSync;