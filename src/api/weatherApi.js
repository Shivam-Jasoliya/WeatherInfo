// src/api/weatherApi.js
import axios from 'axios';

const weatherApi = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  timeout: 10000,
});

weatherApi.interceptors.response.use(
  response => response,
  error => {
    let message = 'Something went wrong with the weather API.';

    if (error?.response?.status === 404) {
      message = 'City not found. Please check the city name.';
    } else if (error?.response?.status === 401) {
      message = 'Invalid API key or unauthorized access.';
    } else if (error?.response?.status === 429) {
      message = 'API rate limit exceeded. Try again later.';
    } else if (error?.response?.data?.message) {
      message = error.response.data.message;
    } else if (error?.message === 'Network Error') {
      message = 'Please check your internet connection.';
    }

    return Promise.reject(new Error(message));
  }
);

export default weatherApi;
