import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Animated } from 'react-native';

export default function LocationSelector({ onLocationSelect }) {
  const [location, setLocation] = useState('');
  const [animation] = useState(new Animated.Value(0));

  const handleSubmit = () => {
    if (location.trim()) {
      Animated.spring(animation, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
      onLocationSelect(location);
    }
  };

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: animation }] }]}>
      <TextInput
        style={styles.input}
        placeholder="Search city..."
        placeholderTextColor="#8b9cb5"
        value={location}
        onChangeText={setLocation}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = {
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 15,
    margin: 10,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 12,
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4a90e2',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
};