package com.yourapp

import com.facebook.react.bridge.*
import kotlinx.coroutines.*

@ReactModule(name = AsyncTaskModule.NAME)
class AsyncTaskModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    companion object { const val NAME = "AsyncTaskModule" }

    override fun getName() = NAME

    private val scope = CoroutineScope(Dispatchers.IO + SupervisorJob())

    @ReactMethod
    fun doHeavyWork(promise: Promise) {
        scope.launch {
            try {
                // simulate 2-second blocking work
                val result = withContext(Dispatchers.IO) {
                    Thread.sleep(2000)
                    "Hello from Android async task ${System.currentTimeMillis()}"
                }
                promise.resolve(result)
            } catch (e: Exception) {
                promise.reject("ASYNC_ERR", e)
            }
        }
    }

    fun teardown() = scope.cancel()
}
import { NativeModules, NativeEventEmitter } from 'react-native';

const { AsyncTaskModule } = NativeModules;

if (!AsyncTaskModule) {
  throw new Error('AsyncTaskModule not found – did you register it on Android?');
}

export function doHeavyWork(): Promise<string> {
  return AsyncTaskModule.doHeavyWork();
}
import React, { useCallback } from 'react';
import { Button, Text, View } from 'react-native';
import { doHeavyWork } from './native/AsyncTask';

export default function App() {
  const [msg, setMsg] = React.useState('idle');

  const run = useCallback(async () => {
    setMsg('working…');
    try {
      const result = await doHeavyWork();
      setMsg(result);
    } catch (e) {
      setMsg(`Error: ${e}`);
    }
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{msg}</Text>
      <Button title="Start Async Task" onPress={run} />
    </View>
  );
}
