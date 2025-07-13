import React from 'react';
import { useHistory } from '../contexts/HistoryContext';

const MovieHistory: React.FC = () => {
  const { movieHistory } = useHistory();

  if (movieHistory.length === 0) {
    return (
      <div className="text-white text-center py-10">
        <h2 className="text-2xl font-bold mb-4">Movie History</h2>
        <p>No movie recommendations yet. Try getting a suggestion!</p>
      </div>
    );
  }

  // Group by mood
  const grouped = movieHistory.reduce((acc, item) => {
    acc[item.mood] = acc[item.mood] || [];
    acc[item.mood].push(item);
    return acc;
  }, {} as Record<string, typeof movieHistory>);

  return (
    <div className="text-white max-w-2xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Movie History</h2>
      {Object.entries(grouped).map(([mood, items]) => (
        <div key={mood} className="mb-8">
          <h3 className="text-lg font-semibold mb-2">{mood}</h3>
          <ul className="space-y-2">
            {items.map((item, idx) => (
              <li key={idx} className="bg-[#23272f] rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between border border-gray-700 text-[#f8f5f0]">
                <div>
                  <span className="font-medium">{item.recommendation.title}</span>
                </div>
                {item.recommendation.posterUrl && (
                  <img
                    src={item.recommendation.posterUrl}
                    alt={item.recommendation.title}
                    className="w-16 h-24 object-cover rounded shadow mt-2 md:mt-0"
                  />
                )}
                {item.recommendation.infoUrl && (
                  <a
                    href={item.recommendation.infoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline mt-2 md:mt-0"
                  >
                    More Info
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

export default MovieHistory; 