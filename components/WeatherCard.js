import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function WeatherCard({ weather }) {
  if (!weather) {
    return <Text style={styles.loadingText}>No weather data available.</Text>;
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{weather.name}</Text>
      <Text style={styles.subtitle}>Temperature: {weather.main.temp}°C</Text>
      <Text style={styles.subtitle}>Weather: {weather.weather[0].description}</Text>
      <Text style={styles.subtitle}>Humidity: {weather.main.humidity}%</Text>
      <Text style={styles.subtitle}>Wind Speed: {weather.wind.speed} m/s</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { fontSize: 16, marginTop: 5 },
  loadingText: { fontSize: 16, color: 'gray', marginTop: 10 },
});
