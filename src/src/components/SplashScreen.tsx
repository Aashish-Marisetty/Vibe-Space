import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Heart, Sparkles } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(1), 1000);
    const timer2 = setTimeout(() => setStage(2), 2000);
    const timer3 = setTimeout(() => setStage(3), 3000);
    const timer4 = setTimeout(() => onComplete(), 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900 flex items-center justify-center z-50">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mb-8"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-teal-400 rounded-full blur-xl opacity-50 animate-pulse" />
            <div className="relative bg-gradient-to-r from-purple-500 to-teal-500 rounded-full p-6">
              <Music className="w-16 h-16 text-white" />
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: stage >= 1 ? 1 : 0 }}
            className="absolute -top-2 -right-2"
          >
            <Heart className="w-8 h-8 text-pink-400 animate-pulse" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: stage >= 1 ? 1 : 0 }}
            className="absolute -bottom-2 -left-2"
          >
            <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: stage >= 2 ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
            VibeSpace
          </h1>
          <p className="text-xl text-white/80">Your Emotional Companion</p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: stage >= 3 ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-8"
        >
          <div className="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <p className="text-white/70">Discovering your perfect mood match...</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SplashScreen;