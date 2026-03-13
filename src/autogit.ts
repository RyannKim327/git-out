//   ┌─── Imports ────────────────────────────────────────────────────────┐
import { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';

//   ┌─── Types ───────────────────────────────────────────────────────────────┐
interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

//   ┌─── Async helper ────────────────────────────────────────────────────────┐
async function fetchTodos(): Promise<TodoItem[]> {
  const url = 'https://jsonplaceholder.typicode.com/todos?_limit=5';

  // Simulate a "slow" network: optional, just for demo
  await new Promise(r => setTimeout(r, 800));

  const response = await fetch(url);
  if (!response.ok) throw new Error(`❌ ${response.status} ${response.statusText}`);

  const json = await response.json();
  // Map to our interface – TypeScript will check types
  return json.map((x: any) => ({
    id: x.id,
    title: x.title,
    completed: x.completed,
  }));
}

//   ┌─── Component that uses the async task ──────────────────────────────────┐
export default function AsyncExample() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTodos();
      console.log('Fetched:', data);
      setTodos(data);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      console.warn(msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Run once on mount
  useEffect(() => {
    load();
  }, []);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text style={styles.error}>{error}</Text>}
      {!loading && !error && (
        <>
          {todos.map(t => (
            <Text key={t.id} style={styles.todo}>
              {t.completed ? '✅' : '🕒'} {t.title}
            </Text>
          ))}
        </>
      )}
      <Button title="Reload" onPress={load} disabled={loading} />
    </View>
  );
}

//   ┌─── Styles ───────────────────────────────────────────────────────────────┐
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  todo: { fontSize: 18, marginVertical: 4 },
  error: { color: 'red', marginBottom: 12 },
});
