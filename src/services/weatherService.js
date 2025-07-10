// src/services/weatherService.js

import weatherApi from '../api/weatherApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/storageKeys';

const OPENWEATHER_API_KEY = '1f23fda76fa94a04efce42e6b1feb1db';

/**
 * Save weather forecast data to AsyncStorage.
 */
const saveForecastToCache = async (data) => {
  try {
    if (!data) return;
    const json = JSON.stringify(data);
    if (json !== undefined) {
      await AsyncStorage.setItem(STORAGE_KEYS.WEATHER_CACHE, json);
    }
  } catch (error) {
    console.warn('Failed to save forecast to cache:', error);
  }
};

/**
 * Load weather forecast data from AsyncStorage.
 */
export const loadCachedForecast = async () => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEYS.WEATHER_CACHE);
    return json != null ? JSON.parse(json) : null;
  } catch (error) {
    console.warn('Failed to load cached forecast:', error);
    return null;
  }
};

/**
 * Fetch weather forecast by city or coordinates.
 * @param {string | { latitude: number, longitude: number }} location - City name or coordinates
 * @param {'metric' | 'imperial'} unit - Unit of measurement
 * @returns {object} { data, error }
 */
export const fetchForecast = async (location, unit = 'metric') => {
  try {
    const params = {
      units: unit,
      appid: OPENWEATHER_API_KEY,
    };

    if (typeof location === 'string') {
      params.q = location;
    } else if (
      typeof location === 'object' &&
      typeof location.latitude === 'number' &&
      typeof location.longitude === 'number'
    ) {
      params.lat = location.latitude;
      params.lon = location.longitude;
    } else {
      throw new Error('Invalid location format');
    }

    const response = await weatherApi.get('forecast', { params });
    const data = response.data;
    await saveForecastToCache(data);

    return { data, error: null };
  } catch (err) {
    if (err?.message === "Please check your internet connection.") {
       const cached = await loadCachedForecast();
        if (cached) {
        return {
          data: cached,
          error: null,
        };
      }
    }
     
    console.warn('Weather fetch failed:', err.message);
    return {
      data: null,
      error: err.message || 'Failed to fetch forecast data.',
    };
  }
};