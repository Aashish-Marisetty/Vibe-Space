import React from 'react';
import { motion } from 'framer-motion';
import { useMood } from '../contexts/MoodContext';

const moods = [
  { id: 'happy', emoji: '😊', label: 'Happy', color: 'from-yellow-400 to-orange-400' },
  { id: 'sad', emoji: '😢', label: 'Sad', color: 'from-blue-400 to-blue-600' },
  { id: 'relaxed', emoji: '😌', label: 'Relaxed', color: 'from-green-400 to-teal-400' },
  { id: 'excited', emoji: '🤩', label: 'Excited', color: 'from-purple-400 to-pink-400' },
  { id: 'anxious', emoji: '😰', label: 'Anxious', color: 'from-red-400 to-pink-400' },
  { id: 'focused', emoji: '🎯', label: 'Focused', color: 'from-indigo-400 to-purple-400' },
  { id: 'nostalgic', emoji: '🌅', label: 'Nostalgic', color: 'from-amber-400 to-orange-400' },
  { id: 'romantic', emoji: '💕', label: 'Romantic', color: 'from-rose-400 to-pink-400' },
];

const MoodSelector: React.FC = () => {
  const { currentMood, setMood } = useMood();

  const handleMoodSelect = (mood: typeof moods[0]) => {
    setMood({
      ...mood,
      timestamp: new Date(),
    });
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-4xl font-bold text-primary mb-4">How are you feeling?</h2>
        <p className="text-secondary text-lg">Choose your current mood to get personalized recommendations</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
      >
        {moods.map((mood, index) => (
          <motion.button
            key={mood.id}
            onClick={() => handleMoodSelect(mood)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`relative p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-105 ${
              currentMood?.id === mood.id
                ? 'bg-white/80 dark:bg-white/20 border-gray-300 dark:border-white/40 shadow-lg shadow-purple-500/20'
                : 'bg-white/60 dark:bg-white/5 border-gray-200 dark:border-white/20 hover:bg-white/80 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/30'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-center">
              <div className="text-5xl mb-3 select-none">{mood.emoji}</div>
              <div className="text-primary font-medium text-lg">{mood.label}</div>
            </div>
            
            {currentMood?.id === mood.id && (
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r opacity-20 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))`,
                }}
              />
            )}
          </motion.button>
        ))}
      </motion.div>

      {currentMood && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-block px-8 py-4 bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-white/20">
            <p className="text-primary text-lg">
              Current mood: <span className="font-semibold text-accent">{currentMood.label} {currentMood.emoji}</span>
            </p>
            <p className="text-secondary text-sm mt-1">
              Set at {new Date(currentMood.timestamp).toLocaleTimeString()}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MoodSelector;