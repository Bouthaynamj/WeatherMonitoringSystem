import { API_URL, API_KEY } from '../utils/constants';

export async function fetchWeatherData(location) {
  try {
    const response = await fetch(`${API_URL}?q=${location}&appid=${API_KEY}&units=metric`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}
