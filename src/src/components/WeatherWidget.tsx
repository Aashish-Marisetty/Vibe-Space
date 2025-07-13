import React, { useEffect, useState } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Wind, MapPin, Thermometer } from 'lucide-react';

interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
}

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Try to get user's location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              // const { latitude, longitude } = position.coords;
              
              // In production, use OpenWeatherMap API
              // const API_KEY = 'your_openweather_api_key';
              // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
              
              // Mock weather data based on location
              const mockWeather: WeatherData = {
                location: 'Vijayawada, IN',
                temperature: 32,
                description: 'Partly Cloudy',
                icon: 'partly-cloudy',
                humidity: 65,
                windSpeed: 12,
                feelsLike: 35,
              };

              setTimeout(() => {
                setWeather(mockWeather);
                setLoading(false);
              }, 1500);
            },
            () => {
              // Fallback to default location
              const defaultWeather: WeatherData = {
                location: 'Your Location',
                temperature: 25,
                description: 'Clear Sky',
                icon: 'sunny',
                humidity: 60,
                windSpeed: 8,
                feelsLike: 27,
              };
              
              setTimeout(() => {
                setWeather(defaultWeather);
                setLoading(false);
              }, 1000);
            }
          );
        }
      } catch (err) {
        setError('Failed to fetch weather data');
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = (icon: string) => {
    switch (icon) {
      case 'sunny':
        return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="w-8 h-8 text-gray-500" />;
      case 'rainy':
        return <CloudRain className="w-8 h-8 text-blue-500" />;
      case 'snowy':
        return <CloudSnow className="w-8 h-8 text-blue-300" />;
      default:
        return <Wind className="w-8 h-8 text-teal-500" />;
    }
  };

  const getMoodSuggestion = (temp: number, description: string) => {
    if (temp > 30) return "Perfect weather for upbeat music! 🌞";
    if (temp < 10) return "Cozy weather for some warm melodies ❄️";
    if (description.toLowerCase().includes('rain')) return "Rainy day vibes call for mellow tunes 🌧️";
    return "Great weather for any mood! 🌤️";
  };

  if (loading) {
    return (
      <div className="classic-card">
        <div className="animate-pulse">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-300 dark:bg-white/20 rounded-full"></div>
            <div className="flex-1">
              <div className="h-6 bg-gray-300 dark:bg-white/20 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-white/20 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-300 dark:bg-white/20 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="classic-card">
        <div className="text-center text-secondary">
          <Cloud className="w-8 h-8 mx-auto mb-2" />
          <p>Weather data unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div className="classic-card">
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex-shrink-0">
          {getWeatherIcon(weather.icon)}
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 text-primary font-medium mb-1">
            <MapPin className="w-4 h-4 text-accent" />
            <span>{weather.location}</span>
          </div>
          <div className="text-3xl font-bold text-primary mb-1">
            {weather.temperature}°C
          </div>
          <div className="text-secondary">{weather.description}</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <Thermometer className="w-4 h-4 text-orange-500 mx-auto mb-1" />
          <div className="text-secondary text-xs">Feels like</div>
          <div className="text-primary font-medium">{weather.feelsLike}°C</div>
        </div>
        <div className="text-center">
          <Cloud className="w-4 h-4 text-blue-500 mx-auto mb-1" />
          <div className="text-secondary text-xs">Humidity</div>
          <div className="text-primary font-medium">{weather.humidity}%</div>
        </div>
        <div className="text-center">
          <Wind className="w-4 h-4 text-teal-500 mx-auto mb-1" />
          <div className="text-secondary text-xs">Wind</div>
          <div className="text-primary font-medium">{weather.windSpeed} km/h</div>
        </div>
      </div>

      <div className="p-3 bg-gradient-to-r from-teal-500/10 to-blue-500/10 dark:from-teal-500/20 dark:to-blue-500/20 rounded-lg border border-teal-500/20 dark:border-teal-500/30">
        <p className="text-primary text-sm text-center">
          {getMoodSuggestion(weather.temperature, weather.description)}
        </p>
      </div>
    </div>
  );
};

export default WeatherWidget;