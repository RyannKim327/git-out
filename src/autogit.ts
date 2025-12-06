// src/RandomAsyncTask.ts
import { NativeModules } from 'react-native';

interface RandomAsyncTaskInterface {
  /**
   * Runs some work on a background thread on Android and resolves
   * with a random string when finished.
   */
  doSomething(): Promise<string>;
}

const { RandomAsyncTask } = NativeModules as {
  RandomAsyncTask: RandomAsyncTaskInterface;
};

export default RandomAsyncTask;
package com.yourapp

import com.facebook.react.bridge.*
import kotlinx.coroutines.*
import java.util.UUID

@ReactModule(name = RandomAsyncTaskModule.NAME)
class RandomAsyncTaskModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    companion object {
        const val NAME = "RandomAsyncTask"
    }

    override fun getName(): String = NAME

    @ReactMethod
    fun doSomething(promise: Promise) {
        // Launch on IO dispatcher (background thread pool)
        CoroutineScope(Dispatchers.IO).launch {
            try {
                // Simulate random async work
                delay((500L..1500L).random())
                val result = UUID.randomUUID().toString()
                promise.resolve(result)
            } catch (e: Exception) {
                promise.reject("RANDOM_ERROR", e.message, e)
            }
        }
    }
}
import RandomAsyncTask from './src/RandomAsyncTask';

async function run() {
  try {
    const id = await RandomAsyncTask.doSomething();
    console.log('Got async result:', id);
  } catch (e) {
    console.error(e);
  }
}

run();
