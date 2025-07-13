import React from 'react';
import { useHistory } from '../contexts/HistoryContext';

const MusicHistory: React.FC = () => {
  const { musicHistory } = useHistory();

  if (musicHistory.length === 0) {
    return (
      <div className="text-white text-center py-10">
        <h2 className="text-2xl font-bold mb-4">Music History</h2>
        <p>No music recommendations yet. Try getting a suggestion!</p>
      </div>
    );
  }

  // Group by mood
  const grouped = musicHistory.reduce((acc, item) => {
    acc[item.mood] = acc[item.mood] || [];
    acc[item.mood].push(item);
    return acc;
  }, {} as Record<string, typeof musicHistory>);

  return (
    <div className="text-white max-w-2xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Music History</h2>
      {Object.entries(grouped).map(([mood, items]) => (
        <div key={mood} className="mb-8">
          <h3 className="text-lg font-semibold mb-2">{mood}</h3>
          <ul className="space-y-2">
            {items.map((item, idx) => (
              <li key={idx} className="bg-[#23272f] rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between border border-gray-700 text-[#f8f5f0]">
                <div>
                  <span className="font-medium">{item.recommendation.title}</span>
                  {item.recommendation.artist && (
                    <span className="text-white/70 ml-2">by {item.recommendation.artist}</span>
                  )}
                </div>
                {item.recommendation.playlistUrl && (
                  <a
                    href={item.recommendation.playlistUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline mt-2 md:mt-0"
                  >
                    Listen
                  </a>
                )}
                <div className="text-xs text-white/50 mt-1 md:mt-0 md:ml-4">
                  {new Date(item.recommendation.timestamp).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MusicHistory; 