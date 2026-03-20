// src/api/remote.ts
import { NativeModules, NativeEventEmitter } from 'react-native';

const { AndroidAsyncTask } = NativeModules;

// -----------------------------------------------------------------
// 1️⃣  The simple JS/TS side: an async fetch helper
// -----------------------------------------------------------------
export async function loadRemoteJson(url: string): Promise<any> {
  try {
    const response = await fetch(url, { method: 'GET' });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} – ${response.statusText}`);
    }
    const payload = await response.json();
    return payload;
  } catch (err) {
    console.error('loadRemoteJson error:', err);
    throw err;
  }
}

// -----------------------------------------------------------------
// 2️⃣  The bridge to Android (AsyncTask)
// -----------------------------------------------------------------
// On Android, create a module that exposes `runAsyncTask`
// which internally spawns an AsyncTask that returns a JSON string.

export function runAndroidTask(
  taskName: string,
  args: Record<string, any>
): Promise<any> {
  // The native module returns a Promise that resolves with a string
  return AndroidAsyncTask.runAsyncTask(taskName, args).then((result: string) => {
    try {
      return JSON.parse(result);
    } catch (err) {
      console.warn('Failed to parse JSON from Android:', err);
      throw err;
    }
  });
}

// -----------------------------------------------------------------
// 3️⃣  Example usage (e.g. inside a component)
// -----------------------------------------------------------------
/*
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { loadRemoteJson, runAndroidTask } from './api/remote';

export default function Demo() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Option A – vanilla fetch
    loadRemoteJson('https://jsonplaceholder.typicode.com/todos/1')
      .then(setData)
      .catch(err => setError(err.message));

    // Option B – delegate to Android AsyncTask
    // runAndroidTask('fetchTodo', { id: 1 })
    //   .then(setData)
    //   .catch(err => setError(err.message));
  }, []);

  if (error) return <View><Text>❌ {error}</Text></View>;
  return data ? <Text>✅ {JSON.stringify(data)}</Text> : <Text>⏳ Loading…</Text>;
}
*/
