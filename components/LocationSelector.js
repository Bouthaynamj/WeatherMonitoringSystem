import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function LocationSelector({ onLocationSelect }) {
  const [location, setLocation] = useState('');

  const handleSelect = () => {
    if (location.trim()) {
      onLocationSelect(location);
    } else {
      alert('Please enter a valid location.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter a location:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., London"
        value={location}
        onChangeText={setLocation}
      />
      <Button title="Get Weather" onPress={handleSelect} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20, padding: 20 },
  label: { fontSize: 16, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
});
