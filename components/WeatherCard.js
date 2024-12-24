import React from 'react';
import { View, Text, Animated, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function WeatherCard({ weather, forecast }) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [weather]);

  const getWeatherIcon = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'clear': return 'weather-sunny';
      case 'rain': return 'weather-rainy';
      case 'clouds': return 'weather-cloudy';
      case 'snow': return 'weather-snowy';
      case 'thunderstorm': return 'weather-lightning';
      default: return 'weather-cloudy';
    }
  };

  const getDayName = (date) => {
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    return days[new Date(date).getDay()];
  };

  if (!weather) return null;

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <LinearGradient
        colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.5)']}
        style={styles.card}
      >
        <View style={styles.header}>
          <Text style={styles.location}>{weather.name}</Text>
          <Text style={styles.temperature}>{Math.round(weather.main.temp)}°C</Text>
          <Text style={styles.description}>{weather.weather[0].description}</Text>
        </View>

        <ScrollView style={styles.forecastContainer}>
          {forecast?.map((day, index) => (
            <View key={index} style={styles.forecastDay}>
              <Text style={styles.dayName}>{getDayName(day.dt_txt)}</Text>
              <MaterialCommunityIcons 
                name={getWeatherIcon(day.weather[0].main)} 
                size={24} 
                color="#fff" 
              />
              <Text style={styles.forecastTemp}>
                {Math.round(day.main.temp)}°C
              </Text>
              <Text style={styles.precipitation}>
                {day.rain ? `${Math.round(day.rain['3h'])}%` : '0%'}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.detailsContainer}>
          <View style={styles.detail}>
            <MaterialCommunityIcons name="water-percent" size={24} color="#fff" />
            <Text style={styles.detailValue}>{weather.main.humidity}%</Text>
          </View>
          <View style={styles.detail}>
            <MaterialCommunityIcons name="weather-windy" size={24} color="#fff" />
            <Text style={styles.detailValue}>{weather.wind.speed} m/s</Text>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = {
  card: {
    borderRadius: 20,
    margin: 10,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  location: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },
  temperature: {
    fontSize: 48,
    color: '#fff',
    fontWeight: '300',
  },
  description: {
    fontSize: 18,
    color: '#fff',
    textTransform: 'capitalize',
  },
  forecastContainer: {
    marginVertical: 20,
    maxHeight: 300,
  },
  forecastDay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  dayName: {
    color: '#fff',
    width: 100,
  },
  forecastTemp: {
    color: '#fff',
    width: 50,
    textAlign: 'right',
  },
  precipitation: {
    color: '#fff',
    width: 50,
    textAlign: 'right',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  detail: {
    alignItems: 'center',
  },
  detailValue: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
  },
};