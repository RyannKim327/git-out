// App.tsx
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

/**
 * Example of an async “network task” that you might run in Android
 * (React‑Native runs JavaScript on a background thread for you).
 */
const App: React.FC = () => {
  /*--- State: loading / data / error -----------------------------------*/
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  /*--- Effect: fire once on mount -------------------------------------*/
  useEffect(() => {
    /**
     * Async function inside the effect so we can use await at a top level.
     * It's an equivalent of Android’s AsyncTask (but without the Android
     * boilerplate) – just a Promise chain wrapped in async/await.
     */
    const fetchData = async () => {
      try {
        // 1️⃣ Make the request
        const response = await fetch(
          'https://api.adviceslip.com/advice',
        );

        // 2️⃣ Check for HTTP errors
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // 3️⃣ Parse the JSON payload
        const json = await response.json();

        // 4️⃣ Store the result
        setData(json);          // data.slip.advice will be the string
        setError(null);
      } catch (e) {
        // Anything that goes wrong lands here
        console.error('Failed to fetch advice:', e);
        setError((e as Error).message);
        setData(null);
      } finally {
        // Whatever happens, loading is done
        setLoading(false);
      }
    };

    fetchData();

    // Optional: cleanup if the component unmounts before fetch resolves
    // return () => { /* cancel request if using AbortController, e.g. */ };
  }, []); // empty deps → run once

  /*--- Rendering -----------------------------------------------------*/
  return (
    <SafeAreaView style={styles.container}>
      {loading && (
        <View style={styles.centered}>
          <ActivityIndicator size="large" />
          <Text style={styles.text}>Loading advice...</Text>
        </View>
      )}

      {!loading && error && (
        <View style={styles.centered}>
          <Text style={[styles.text, styles.error]}>Error: {error}</Text>
        </View>
      )}

      {!loading && data && (
        <View style={styles.centered}>
          <Text style={styles.title}>Here’s an advice for you:</Text>
          <Text style={styles.advice}>{data.slip?.advice ?? '—'}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

/*--- Styles ----------------------------------------------------------*/
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 16, marginTop: 12 },
  title: { fontSize: 18, fontWeight: '600' },
  advice: { fontSize: 18, fontWeight: '400', marginTop: 6, textAlign: 'center' },
  error: { color: 'red' },
});

export default App;
