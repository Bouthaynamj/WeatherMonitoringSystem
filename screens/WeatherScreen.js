
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LocationSelector from '../components/LocationSelector';
import WeatherCard from '../components/WeatherCard';
import { fetchWeatherData } from '../services/weatherService';

export default function WeatherScreen() {
  const [weatherData, setWeatherData] = useState(null);
  
    
  const handleLocationSelect = async (location) => {
    try {
      const data = await fetchWeatherData(location);
      if (data && data.cod === 200) {
        setWeatherData(data);
      } else {
        alert('Location not found. Please try again.');
      }
    } catch (error) {
      alert('An error occurred while fetching weather data.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Location Selector for user input */}
      <LocationSelector onLocationSelect={handleLocationSelect} />

      {/* Weather data displayed dynamically */}
      {weatherData && <WeatherCard weather={weatherData} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 18, marginTop: 10 },
});
