import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMood } from '../contexts/MoodContext';
import { getRecommendations } from '../utils/getRecommendations';
import { Star, Calendar, Clock, Play, Heart, Share2, Info, ChevronLeft, ChevronRight } from 'lucide-react';

const MovieRecommendations: React.FC = () => {
  const { currentMood } = useMood();
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  if (!currentMood) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎬</div>
        <h3 className="text-2xl font-bold text-white mb-2">No Mood Selected</h3>
        <p className="text-white/70">Select a mood to get personalized movie recommendations</p>
      </div>
    );
  }

  // Get recommendations from the utility
  const recommendation = getRecommendations({ 
    mood: currentMood, 
    weather: { main: 'Clear', description: 'clear sky' } 
  });

  const currentMovie = recommendation.movies[currentMovieIndex];
  const totalMovies = recommendation.movies.length;

  const nextMovie = () => {
    setCurrentMovieIndex((prev) => (prev + 1) % totalMovies);
  };

  const prevMovie = () => {
    setCurrentMovieIndex((prev) => (prev - 1 + totalMovies) % totalMovies);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h3 className="text-3xl font-bold text-white mb-2">
          Movie Recommendation
        </h3>
        <div className="flex flex-col items-center">
          <img
            src={currentMovie.posterUrl}
            alt={currentMovie.title}
            className="mx-auto rounded-lg shadow mb-2 w-32 h-48 object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/300x450/1f2937/ffffff?text=' + encodeURIComponent(currentMovie.title);
            }}
          />
          <a
            href={currentMovie.infoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-blue-600 hover:underline mb-2 text-lg font-semibold"
          >
            {currentMovie.title}
          </a>
        </div>
        
        {/* Navigation buttons for multiple movies */}
        {totalMovies > 1 && (
          <div className="flex justify-center items-center space-x-4 mt-4">
            <button
              onClick={prevMovie}
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <span className="text-white/70 text-sm">
              {currentMovieIndex + 1} of {totalMovies}
            </span>
            <button
              onClick={nextMovie}
              className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
        )}
        
        <p className="text-white/70 text-lg mt-2">{recommendation.summary}</p>
      </motion.div>
    </div>
  );
};

export default MovieRecommendations;