import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMood } from '../contexts/MoodContext';
import { getRecommendations } from '../utils/getRecommendations';
import { Play, Heart, Share2, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';

// Sample songs for each mood (to maintain the rich UI)
const moodSongs = {
  happy: [
    { title: 'Happy', artist: 'Pharrell Williams', duration: '3:53', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop' },
    { title: 'Good as Hell', artist: 'Lizzo', duration: '2:39', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop' },
    { title: 'Can\'t Stop the Feeling!', artist: 'Justin Timberlake', duration: '3:56', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop' },
    { title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', duration: '4:30', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop' },
  ],
  sad: [
    { title: 'Someone Like You', artist: 'Adele', duration: '4:45', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop' },
    { title: 'Hurt', artist: 'Johnny Cash', duration: '3:38', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop' },
    { title: 'Mad World', artist: 'Gary Jules', duration: '3:07', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop' },
    { title: 'The Sound of Silence', artist: 'Simon & Garfunkel', duration: '3:05', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop' },
  ],
  relaxed: [
    { title: 'Weightless', artist: 'Marconi Union', duration: '8:10', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop' },
    { title: 'River', artist: 'Eminem ft. Ed Sheeran', duration: '3:40', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop' },
    { title: 'Breathe', artist: 'Télépopmusik', duration: '4:28', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop' },
    { title: 'Clair de Lune', artist: 'Claude Debussy', duration: '5:20', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop' },
  ],
  excited: [
    { title: 'Thunder', artist: 'Imagine Dragons', duration: '3:07', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop' },
    { title: 'High Hopes', artist: 'Panic! At The Disco', duration: '3:01', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop' },
    { title: 'Believer', artist: 'Imagine Dragons', duration: '3:24', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop' },
    { title: 'Don\'t Stop Me Now', artist: 'Queen', duration: '3:29', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop' },
  ],
  anxious: [
    { title: 'Weightless', artist: 'Marconi Union', duration: '8:10', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop' },
    { title: 'Claire de Lune', artist: 'Debussy', duration: '5:20', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop' },
    { title: 'Gymnopédie No.1', artist: 'Erik Satie', duration: '3:21', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop' },
    { title: 'Spiegel im Spiegel', artist: 'Arvo Pärt', duration: '9:47', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop' },
  ],
  focused: [
    { title: 'Lofi Hip Hop', artist: 'Various Artists', duration: '∞', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop' },
    { title: 'Classical Focus', artist: 'Mozart', duration: '45:00', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop' },
    { title: 'Ambient Works', artist: 'Brian Eno', duration: '42:00', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop' },
    { title: 'Study Beats', artist: 'Various Artists', duration: '∞', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop' },
  ],
  nostalgic: [
    { title: 'Bohemian Rhapsody', artist: 'Queen', duration: '5:55', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop' },
    { title: 'Hotel California', artist: 'Eagles', duration: '6:30', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop' },
    { title: 'Stairway to Heaven', artist: 'Led Zeppelin', duration: '8:02', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop' },
    { title: 'Imagine', artist: 'John Lennon', duration: '3:03', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop' },
  ],
  romantic: [
    { title: 'Perfect', artist: 'Ed Sheeran', duration: '4:23', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop' },
    { title: 'All of Me', artist: 'John Legend', duration: '4:29', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop' },
    { title: 'Just the Way You Are', artist: 'Bruno Mars', duration: '3:40', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop' },
    { title: 'Can\'t Help Falling in Love', artist: 'Elvis Presley', duration: '3:00', cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop' },
  ],
};

const MusicRecommendations: React.FC = () => {
  const { currentMood } = useMood();
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!currentMood) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎵</div>
        <h3 className="text-2xl font-bold text-primary mb-2">No Mood Selected</h3>
        <p className="text-secondary">Select a mood to get personalized music recommendations</p>
      </div>
    );
  }

  // Get recommendations from the utility
  const recommendation = getRecommendations({ 
    mood: currentMood, 
    weather: { main: 'Clear', description: 'clear sky' } 
  });
  const songs = moodSongs[currentMood.id as keyof typeof moodSongs] || moodSongs.happy;

  const handlePlayPause = (index: number) => {
    if (currentlyPlaying === index && isPlaying) {
      setIsPlaying(false);
    } else {
      setCurrentlyPlaying(index);
      setIsPlaying(true);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h3 className="text-3xl font-bold text-primary mb-2">
          Music for your {currentMood.label.toLowerCase()} mood
        </h3>
        <p className="text-secondary text-lg">{recommendation.summary}</p>
      </motion.div>

      {/* Playlist Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="classic-card"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-2xl font-bold text-primary mb-2">{recommendation.music.title}</h4>
            <p className="text-secondary">by {recommendation.music.artist}</p>
          </div>
          <div className="flex space-x-2">
            <button className="classic-btn p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
              <Heart className="w-6 h-6 text-accent" />
            </button>
            <button className="classic-btn p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
              <Share2 className="w-6 h-6 text-accent" />
            </button>
          </div>
        </div>

        {/* Song List */}
        <div className="space-y-3">
          {songs.map((song, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center space-x-4 p-4 rounded-xl transition-all cursor-pointer ${
                currentlyPlaying === index && isPlaying
                  ? 'bg-gradient-to-r from-purple-500/20 to-teal-500/20 border border-purple-500/30'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
              onClick={() => handlePlayPause(index)}
            >
              <div className="relative">
                <img
                  src={song.cover}
                  alt={song.title}
                  className="w-12 h-12 rounded-lg object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/48x48/1f2937/ffffff?text=♪';
                  }}
                />
                <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  {currentlyPlaying === index && isPlaying ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white" />
                  )}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="text-primary font-medium truncate">{song.title}</div>
                <div className="text-secondary text-sm truncate">{song.artist}</div>
              </div>
              
              <div className="text-secondary text-sm">{song.duration}</div>
            </motion.div>
          ))}
        </div>

        {/* Player Controls */}
        {currentlyPlaying !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-gradient-to-r from-purple-600/20 to-teal-600/20 rounded-xl border border-purple-500/30"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={songs[currentlyPlaying].cover}
                  alt="Now playing"
                  className="w-10 h-10 rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/40x40/1f2937/ffffff?text=♪';
                  }}
                />
                <div>
                  <div className="text-primary font-medium text-sm">
                    {songs[currentlyPlaying].title}
                  </div>
                  <div className="text-secondary text-xs">
                    {songs[currentlyPlaying].artist}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="classic-btn p-2 hover:bg-white/10 rounded-full transition-colors">
                  <SkipBack className="w-5 h-5 text-accent" />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="classic-btn p-3 bg-teal-500 hover:bg-teal-600 rounded-full transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white" />
                  )}
                </button>
                <button className="classic-btn p-2 hover:bg-white/10 rounded-full transition-colors">
                  <SkipForward className="w-5 h-5 text-white" />
                </button>
                <button className="classic-btn p-2 hover:bg-white/10 rounded-full transition-colors">
                  <Volume2 className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Spotify Integration */}
        <div className="mt-6 p-4 bg-gradient-to-r from-green-600/20 to-green-500/20 rounded-xl border border-green-500/30">
          <div className="text-center">
            <p className="text-white mb-3">🎵 Listen on Spotify</p>
            <a
              href={recommendation.music.playlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-32 bg-black/30 rounded-lg flex items-center justify-center border border-green-500/20 hover:bg-black/40 transition-colors"
            >
              <div className="text-center">
                <div className="text-green-400 text-2xl mb-2">♪</div>
                <p className="text-white/70 text-sm">Open Spotify Playlist</p>
                <p className="text-white/50 text-xs">{recommendation.music.title}</p>
              </div>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MusicRecommendations;