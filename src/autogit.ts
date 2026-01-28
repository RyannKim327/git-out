/* ──────────────────────────────────────────────────────
   1️⃣  A tiny TypeScript helper that wraps the Fetch API
─────────────────────────────────────────────────────── */

const api = {
  /* GET a JSON‑encoded resource */
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const msg = `Fetching ${url} failed with status ${response.status}`;
      console.warn(msg);
      throw new Error(msg);
    }

    const json = await response.json();
    return json as T;
  },

  /* POST data as JSON */
  async post<T, U>(url: string, body: T): Promise<U> {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const msg = `Posting to ${url} failed with status ${response.status}`;
      console.warn(msg);
      throw new Error(msg);
    }

    const json = await response.json();
    return json as U;
  },
};

/* ──────────────────────────────────────────────────────
   2️⃣  A React‑Native component that uses the helper
─────────────────────────────────────────────────────── */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

type Todo = { userId: number; id: number; title: string; completed: boolean };

// Example URL: https://jsonplaceholder.typicode.com/todos/1
const TODO_URL = 'https://jsonplaceholder.typicode.com/todos/1';

export default function AsyncExample() {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /*═════════════════════════════════════════════════
       Run an “async task” when the component mounts
     ════════════════════════════════════════════════*/
    const fetchTodo = async () => {
      try {
        const data = await api.get<Todo>(TODO_URL);
        setTodo(data);
      } catch (e: any) {
        setError(e.message ?? 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, []);

  if (loading) return <ActivityIndicator style={styles.center} />;
  if (error) return <Text style={styles.error}>❌ {error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo #{todo?.id}</Text>
      <Text style={styles.content}>{todo?.title}</Text>
      <Text style={styles.status}>
        {todo?.completed ? '✅ Completed' : '🔄 Pending'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  center:      { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title:   { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  content: { fontSize: 18, marginBottom: 8 },
  status:  { fontSize: 16, color: '#777' },
  error:   { color: 'red', textAlign: 'center', margin: 20 },
});
