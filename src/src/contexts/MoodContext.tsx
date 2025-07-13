import React, { createContext, useContext, useState } from 'react';

export interface MoodData {
  id: string;
  emoji: string;
  label: string;
  color: string;
  timestamp: Date;
}

interface MoodContextType {
  currentMood: MoodData | null;
  moodHistory: MoodData[];
  setMood: (mood: MoodData) => void;
  dailyQuote: string;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export const useMood = () => {
  const context = useContext(MoodContext);
  if (!context) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
};

const quotes = [
  "Your mood is a choice, make it a powerful one.",
  "Emotions are data, not directions.",
  "The best soundtrack is the one that matches your soul.",
  "Every feeling has a story, every story has a song.",
  "Your emotional journey is uniquely yours.",
];

export const MoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentMood, setCurrentMood] = useState<MoodData | null>(null);
  const [moodHistory, setMoodHistory] = useState<MoodData[]>([]);
  const [dailyQuote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);

  const setMood = (mood: MoodData) => {
    setCurrentMood(mood);
    setMoodHistory(prev => [mood, ...prev.slice(0, 9)]);
  };

  return (
    <MoodContext.Provider value={{ currentMood, moodHistory, setMood, dailyQuote }}>
      {children}
    </MoodContext.Provider>
  );
};