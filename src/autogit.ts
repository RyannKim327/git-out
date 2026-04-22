// src/services/ApiService.ts
async function fetchRandomJoke(): Promise<any> {
  const url = 'https://official-joke-api.appspot.com/jokes/random';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API responded with ${response.status}`);
    }

    const data = await response.json();   // <- the "async task" part
    return data;
  } catch (err) {
    console.warn('Unable to load joke:', err);
    throw err;          // bubble up so the caller can react
  }
}

export const ApiService = { fetchRandomJoke };
// src/App.tsx
import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { ApiService } from './services/ApiService';

export default function App() {
  const [joke, setJoke] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    ApiService.fetchRandomJoke()
      .then((data) => setJoke(`${data.setup} … ${data.punchline}`))
      .catch(() => setJoke('Couldn’t fetch a joke :('))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <Text style={styles.text}>{joke ?? 'Press reload to fetch a joke.'}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18, padding: 20, textAlign: 'center' },
});
