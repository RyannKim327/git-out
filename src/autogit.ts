package com.yourapp

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.util.concurrent.Executors
import java.util.concurrent.TimeUnit

class AsyncConnectorModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    // A background thread pool – you could also use AsyncTask (deprecated) or coroutines.
    private val executor = Executors.newSingleThreadExecutor()

    override fun getName(): String = "AsyncConnector"

    /**
     * Simulates a long‑running operation (e.g. a network call, DB query, etc.).
     * The result is delivered via the Promise, which the JS side can `await`.
     */
    @ReactMethod
    fun fetchMessage(promise: Promise) {
        executor.execute {
            try {
                // Simulate work (2 seconds)
                TimeUnit.SECONDS.sleep(2)

                // In a real app you might call an HTTP client, read a DB, etc.
                val message = "👋 Hello from Android (thread ${Thread.currentThread().name})"
                promise.resolve(message)
            } catch (e: Exception) {
                promise.reject("ERR_NATIVE", e)
            }
        }
    }
}
package com.yourapp

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class AsyncConnectorPackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> =
        listOf(AsyncConnectorModule(reactContext))

    override fun createViewManagers(
        reactContext: ReactApplicationContext
    ): List<ViewManager<*, *>> = emptyList()
}
// inside getPackages()
packages.add(AsyncConnectorPackage())
// AsyncConnector.ts
import { NativeModules } from 'react-native';

// Grab the native module that we just exposed.
const { AsyncConnector } = NativeModules;

/**
 * Thin wrapper that returns a Promise<string>.
 * The implementation lives in Kotlin; we just forward the call.
 */
export async function getAndroidMessage(): Promise<string> {
  // `AsyncConnector.fetchMessage` is automatically promisified by React‑Native.
  // If the native side rejects, this `await` will throw.
  const result = await AsyncConnector.fetchMessage();
  return result as string;
}
// App.tsx
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { getAndroidMessage } from './AsyncConnector';

export default function App() {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Kick off the async task once when the component mounts.
  useEffect(() => {
    (async () => {
      try {
        const msg = await getAndroidMessage(); // <-- our async task
        setMessage(msg);
      } catch (e: any) {
        setError(e.message ?? 'Unknown error');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0066ff" />}
      {error && <Text style={styles.error}>❌ {error}</Text>}
      {message && <Text style={styles.message}>✅ {message}</Text>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  message: { fontSize: 18, color: '#2e7d32', textAlign: 'center', margin: 16 },
  error: { fontSize: 18, color: '#c62828', textAlign: 'center', margin: 16 },
});
