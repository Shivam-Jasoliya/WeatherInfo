import { useState } from 'react';
import { fetchForecast } from '../services/weatherService';

/**
 * Custom hook to fetch and manage weather forecast data.
 * @returns {{
 *  data: object|null,
 *  loading: boolean,
 *  error: string|null,
 *  fetchData: (city: string, unit: string) => Promise<void>
 * }}
 */
export const useWeather = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (city, unit) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchForecast(city, unit);
      setData(response?.data);
      setError(response?.error)
    } catch (e) {
      console.error('Fetch weather error:', e);
      setError('Failed to fetch weather. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};