import React, { createContext, useContext, useState } from 'react';

export interface HistoryItem {
  mood: string;
  recommendation: {
    title: string;
    artist?: string;
    playlistUrl?: string;
    posterUrl?: string;
    infoUrl?: string;
    type: 'music' | 'movie';
    timestamp: number;
  };
}

interface HistoryContextType {
  musicHistory: HistoryItem[];
  movieHistory: HistoryItem[];
  addMusicHistory: (item: HistoryItem) => void;
  addMovieHistory: (item: HistoryItem) => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const useHistory = () => {
  const ctx = useContext(HistoryContext);
  if (!ctx) throw new Error('useHistory must be used within a HistoryProvider');
  return ctx;
};

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [musicHistory, setMusicHistory] = useState<HistoryItem[]>([]);
  const [movieHistory, setMovieHistory] = useState<HistoryItem[]>([]);

  const addMusicHistory = (item: HistoryItem) => {
    setMusicHistory((prev) => [item, ...prev]);
  };
  const addMovieHistory = (item: HistoryItem) => {
    setMovieHistory((prev) => [item, ...prev]);
  };

  return (
    <HistoryContext.Provider value={{ musicHistory, movieHistory, addMusicHistory, addMovieHistory }}>
      {children}
    </HistoryContext.Provider>
  );
}; 