import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import WeatherAnimations from '../components/WeatherAnimations';
import WeatherCard from '../components/WeatherCard';
import { fetchWeatherData, fetchForecastData } from '../services/weatherService';
import { getWeatherGradient } from '../utils/weatherStyles';

export default function WeatherScreen() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Allow location access to get local weather');
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      fetchWeatherByCoords(location.coords.latitude, location.coords.longitude);
    } catch (error) {
      console.error('Error getting location:', error);
      setLoading(false);
      Alert.alert('Error', 'Could not get current location');
    }
  };

  const fetchWeatherByCoords = async (latitude, longitude) => {
    try {
      const [weather, forecast] = await Promise.all([
        fetchWeatherData(`lat=${latitude}&lon=${longitude}`),
        fetchForecastData(`lat=${latitude}&lon=${longitude}`)
      ]);
      
      setWeatherData(weather);
      setForecastData(forecast);
    } catch (error) {
      Alert.alert('Error', 'Could not fetch weather data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (location.trim()) {
      setLoading(true);
      try {
        const [weather, forecast] = await Promise.all([
          fetchWeatherData(`q=${location}`),
          fetchForecastData(`q=${location}`)
        ]);
        
        setWeatherData(weather);
        setForecastData(forecast);
      } catch (error) {
        Alert.alert(
          'Error',
          'Could not find weather data for this location. Please try again.'
        );
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const weatherType = weatherData?.weather[0]?.main?.toLowerCase();

  return (
    <LinearGradient 
      colors={getWeatherGradient(weatherType)} 
      style={styles.container}
    >
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Search location..."
          value={location}
          onChangeText={setLocation}
          onSubmitEditing={handleSearch}
          placeholderTextColor="#fff"
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={styles.loader} />
      ) : (
        <WeatherCard weather={weatherData} forecast={forecastData} />
      )}
      
      <WeatherAnimations weatherType={weatherType} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  searchBar: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 30,
    fontSize: 16,
    color: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});