// weatherService.js
import { API_KEY } from '../utils/constants';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function fetchWeatherData(query) {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?${query}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    if (data.cod !== 200) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

export async function fetchForecastData(query) {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?${query}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    
    if (!data || data.cod !== '200') {
      throw new Error(data?.message || 'Failed to fetch forecast');
    }

    // Process forecast data to get one forecast per day
    const dailyForecasts = [];
    const seen = new Set();
    
    data.list.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!seen.has(date)) {
        seen.add(date);
        dailyForecasts.push(item);
      }
    });

    return dailyForecasts.slice(0, 5); // Return 5 days forecast
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
}