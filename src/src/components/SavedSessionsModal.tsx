import React, { useState } from 'react';
import Modal from './Modal';
import { useMood } from '../contexts/MoodContext';
import { Clock, Calendar, Heart, BarChart, List } from 'lucide-react';

interface SavedSessionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SavedSessionsModal: React.FC<SavedSessionsModalProps> = ({ isOpen, onClose }) => {
  const { moodHistory } = useMood();
  const [activeTab, setActiveTab] = useState<'sessions' | 'timeline'>('sessions');

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTimelineDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getMoodColor = (color: string) => {
    // Map mood colors to classic theme colors
    const colorMap: { [key: string]: string } = {
      'red': 'text-red-400',
      'orange': 'text-orange-400',
      'yellow': 'text-yellow-400',
      'green': 'text-green-400',
      'blue': 'text-blue-400',
      'purple': 'text-purple-400',
      'pink': 'text-pink-400',
      'gray': 'text-gray-400'
    };
    return colorMap[color] || 'text-classic-gold';
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Heart className="w-6 h-6 text-white" />
          <h2 className="text-2xl font-bold text-[#f8f5f0]">Mood Sessions & Timeline</h2>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-4 bg-[#18181b] rounded-lg p-1">
          <button
            onClick={() => setActiveTab('sessions')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
              activeTab === 'sessions'
                ? 'bg-[#23272f] text-white'
                : 'text-[#f8f5f0]/70 hover:text-[#f8f5f0]'
            }`}
          >
            <List className="w-4 h-4" />
            <span>Sessions</span>
          </button>
          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
              activeTab === 'timeline'
                ? 'bg-[#23272f] text-white'
                : 'text-[#f8f5f0]/70 hover:text-[#f8f5f0]'
            }`}
          >
            <BarChart className="w-4 h-4" />
            <span>Timeline</span>
          </button>
        </div>
        
        {moodHistory.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">📝</div>
            <p className="text-white/70 text-lg mb-2">No mood sessions yet</p>
            <p className="text-[#f8f5f0]/70 text-sm">Your mood sessions will appear here once you start tracking your emotions.</p>
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            {activeTab === 'sessions' ? (
              // Detailed Sessions View
              <div className="space-y-3">
                {moodHistory.map((session, index) => (
                  <div 
                    key={session.id || index}
                    className="bg-[#23272f] rounded-lg p-4 border border-gray-700 hover:bg-[#18181b] transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{session.emoji}</span>
                        <div>
                          <h3 className={`font-semibold text-[#f8f5f0]`}>
                            {session.label}
                          </h3>
                          <div className="flex items-center space-x-2 text-white/70 text-sm">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(session.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[#f8f5f0]/70 text-xs">Session #{moodHistory.length - index}</div>
                        <div className="text-white/50 text-xs">Saved</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Timeline View
              <div className="space-y-2">
                {moodHistory.slice(0, 10).map((session, index) => (
                  <div 
                    key={session.id || index}
                    className="flex items-center justify-between p-3 bg-[#23272f] rounded-lg border border-gray-700 hover:bg-[#18181b] transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{session.emoji}</span>
                      <div>
                        <span className={`font-medium text-[#f8f5f0]`}>
                          {session.label}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white/50 text-xs">
                        {formatTimelineDate(session.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        <div className="mt-6 pt-4 border-t border-gray-700/30">
          <p className="text-[#f8f5f0]/70 text-sm">
            Total Sessions: <span className="text-white font-semibold">{moodHistory.length}</span>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default SavedSessionsModal; 