export const parseForecast = (data) => {
  if (!data || typeof data !== 'object') {
    console.warn('⚠️ No forecast data received.');
    return getEmptyForecast();
  }
  if (!Array.isArray(data.list) || data.list.length === 0) {
    console.warn('⚠️ Forecast list is missing or empty:', data.list);
    return getEmptyForecast();
  }

  const cityName = data.city?.name || 'Unknown';
  const current = data.list[0];

  const forecast = [];
  const addedDays = new Set();

  data.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const dayName = date.toLocaleDateString(undefined, { weekday: 'short' });
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'long' });

    if (!addedDays.has(day)) {
      forecast.push({
        day: dayName,
        temp: Math.round(item.main.temp),
        desc: item.weather[0].description,
        icon: item.weather[0].icon,
        date: `${day}, ${month}`,
      });
      addedDays.add(day);
    }
    if (forecast.length >= 5) return;
  });

  return {
    name: cityName,
    temp: Math.round(current.main.temp),
    description: current.weather[0].description,
    icon: current.weather[0].icon,
    humidity: current.main.humidity,
    wind: current.wind.speed,
    rain: current.rain?.['3h'] ?? 0,
    forecast,
  };
};

const getEmptyForecast = () => ({
  name: 'Unknown',
  temp: 0,
  description: 'Unavailable',
  icon: '01d',
  humidity: 0,
  wind: 0,
  rain: 0,
  forecast: [],
});
