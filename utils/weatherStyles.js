import { StyleSheet } from 'react-native';

export const getWeatherElementStyle = (weatherType) => {
  const baseStyle = {
    position: 'absolute',
    width: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  };

  if (weatherType?.includes('thunder')) {
    return {
      ...baseStyle,
      height: 30,
    };
  }

  return {
    ...baseStyle,
    height: 20,
  };
};

export const getWeatherGradient = (weatherType) => {
  switch (weatherType) {
    case 'clear':
      return ['#4c669f', '#3b5998', '#192f6a'];
    case 'rain':
      return ['#616161', '#9bc5c3'];
    case 'thunder':
      return ['#373B44', '#4286f4'];
    default:
      return ['#8e9eab', '#eef2f3'];
  }
};