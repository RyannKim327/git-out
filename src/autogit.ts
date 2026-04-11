// RandomAsyncSample.tsx (React‑Native)
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, Alert} from 'react-native';

interface WeatherResponse {
  location: string;
  temp_c: number;
  condition: string;
  // add any other fields your API sends
}

const fetchWeather = async (
  location: string,
): Promise<WeatherResponse> => {
  const url = `https://api.example.com/weather?city=${encodeURIComponent(
    location,
  )}`;

  // Random twist – fake delay to emulate slower networks
  await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      // Add auth headers etc. if needed
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const data = (await response.json()) as WeatherResponse;
  return data;
};

export const RandomAsyncSample: React.FC = () => {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchWeather('San Francisco');
      setWeather(result);
    } catch (err: any) {
      setError(err.message || 'Unknown error');
      Alert.alert('Oops', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Pull the data once when the component mounts
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Async Weather Sample</Text>

      {loading && <Text>Loading…</Text>}

      {error && <Text style={styles.error}>Error: {error}</Text>}

      {weather && (
        <>
          <Text>Location: {weather.location}</Text>
          <Text>Temp: {weather.temp_c}°C</Text>
          <Text>Condition: {weather.condition}</Text>
        </>
      )}

      <Button title="Refresh" onPress={getWeather} disabled={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16},
  title: {fontSize: 20, marginBottom: 12},
  error: {color: 'red', marginTop: 8},
});
