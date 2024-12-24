import React from 'react';
import { View, Animated, Dimensions, StyleSheet } from 'react-native';
import { getWeatherElementStyle } from '../utils/weatherStyles';

const { width, height } = Dimensions.get('window');

export default function WeatherAnimations({ weatherType }) {
  const [elements] = React.useState(() => 
    Array(20).fill(0).map(() => ({
      x: Math.random() * width,
      y: -Math.random() * height,
      speed: Math.random() * 5 + 5,
      animation: new Animated.Value(-50),
    }))
  );

  React.useEffect(() => {
    if (weatherType?.includes('rain') || weatherType?.includes('thunder')) {
      animateElements();
    }
  }, [weatherType]);

  const animateElements = () => {
    const animations = elements.map(element => {
      element.animation.setValue(-50);
      return Animated.timing(element.animation, {
        toValue: height,
        duration: 1500 / element.speed,
        useNativeDriver: true,
      });
    });

    Animated.loop(
      Animated.stagger(100, animations)
    ).start();
  };

  if (!weatherType?.includes('rain') && !weatherType?.includes('thunder')) return null;

  return (
    <View style={styles.container}>
      {elements.map((element, index) => (
        <Animated.View
          key={index}
          style={[
            getWeatherElementStyle(weatherType),
            {
              left: element.x,
              transform: [{ translateY: element.animation }],
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: 'none',
  },
});