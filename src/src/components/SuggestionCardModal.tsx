import React, { useEffect, useRef } from 'react';
import Modal from './Modal';
import { getRecommendations, RecommendationResult } from '../utils/getRecommendations';
import { Film, ChevronLeft, ChevronRight } from 'lucide-react';
import { useMood } from '../contexts/MoodContext';
import { useHistory } from '../contexts/HistoryContext';

interface SuggestionCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  weather?: { main: string; description: string } | null; // Accept weather as a prop if available
}

const SuggestionCardModal: React.FC<SuggestionCardModalProps> = ({ isOpen, onClose, weather }) => {
  const { currentMood } = useMood();
  const { addMusicHistory, addMovieHistory } = useHistory();
  const addedRef = useRef(false);

  // Use weather from prop or fallback to mock if not provided
  const effectiveWeather = weather || { main: 'Clear', description: 'clear sky' };

  const recommendation: RecommendationResult = getRecommendations({
    mood: currentMood,
    weather: effectiveWeather,
  });
  const [movieIndex, setMovieIndex] = React.useState(0);
  const movies = recommendation.movies || [];
  React.useEffect(() => {
    setMovieIndex(0);
  }, [currentMood, isOpen]);
  const currentMovie = movies[movieIndex] || movies[0];
  const hasPrev = movieIndex > 0;
  const hasNext = movieIndex < movies.length - 1;

  useEffect(() => {
    if (isOpen && currentMood && !addedRef.current) {
      addMusicHistory({
        mood: currentMood.label,
        recommendation: {
          ...recommendation.music,
          type: 'music',
          timestamp: Date.now(),
        },
      });
      addMovieHistory({
        mood: currentMood.label,
        recommendation: {
          ...recommendation.movie,
          type: 'movie',
          timestamp: Date.now(),
        },
      });
      addedRef.current = true;
    }
    if (!isOpen) {
      addedRef.current = false;
    }
  }, [isOpen, currentMood, recommendation, addMusicHistory, addMovieHistory]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Your VibeSpace Suggestions</h2>
        <div className="mb-6">
          <div className="mb-2 text-lg font-semibold text-purple-700">Music Recommendation</div>
          <a
            href={recommendation.music.playlistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-blue-600 hover:underline mb-1"
          >
            {recommendation.music.title} — {recommendation.music.artist}
          </a>
        </div>
        <div className="mb-6">
          <div className="mb-2 text-lg font-semibold text-teal-700">Movie Recommendation</div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 mb-2">
              <button
                className="p-2 rounded-full hover:bg-white/10 disabled:opacity-40"
                onClick={() => setMovieIndex((i) => Math.max(i - 1, 0))}
                disabled={!hasPrev}
                aria-label="Previous movie"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <a
                href={currentMovie?.infoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-600 hover:underline"
              >
                <img
                  src={currentMovie?.posterUrl}
                  alt={currentMovie?.title}
                  className="mx-auto rounded-lg shadow w-32 h-48 object-cover"
                />
                <div className="mt-2 font-semibold text-lg text-white text-center">{currentMovie?.title}</div>
              </a>
              <button
                className="p-2 rounded-full hover:bg-white/10 disabled:opacity-40"
                onClick={() => setMovieIndex((i) => Math.min(i + 1, movies.length - 1))}
                disabled={!hasNext}
                aria-label="Next movie"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-teal-500 text-white rounded-xl font-semibold shadow hover:scale-105 transition-all classic-btn"
              onClick={() => window.open(currentMovie?.infoUrl, '_blank')}
              aria-label="Open movie recommendation link"
            >
              <Film className="w-5 h-5" />
              <span>Movie Link</span>
            </button>
            <div className="text-xs text-gray-400 mt-1">{movieIndex + 1} of {movies.length}</div>
          </div>
        </div>
        <div className="mb-4 text-gray-700 italic">{recommendation.summary}</div>
      </div>
    </Modal>
  );
};

export default SuggestionCardModal; 