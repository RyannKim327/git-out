// android/app/src/main/java/com/yourprojectname/MyAndroidServiceModule.kt
package com.yourprojectname // Make sure this matches your project's package name

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise // Import Promise for async communication
import kotlinx.coroutines.* // Import coroutines
import kotlin.random.Random // For simulating success/failure

class MyAndroidServiceModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    // This name is used in JavaScript to access the module.
    // So, in TS, you'll call `NativeModules.MyAndroidServiceModule`
    override fun getName(): String {
        return "MyAndroidServiceModule"
    }

    /**
     * An example of an asynchronous method that will be exposed to JavaScript.
     * It simulates a long-running task using Kotlin Coroutines and returns a Promise.
     *
     * @param message A string parameter passed from JavaScript.
     * @param promise A Promise object used to send back success or failure to JavaScript.
     */
    @ReactMethod
    fun performAsyncTask(message: String, promise: Promise) {
        // Launch a coroutine in the IO dispatcher (suitable for network/disk operations)
        // This makes the task run on a background thread, not blocking the UI.
        CoroutineScope(Dispatchers.IO).launch {
            try {
                println("MyAndroidServiceModule: Received message: '$message' on thread ${Thread.currentThread().name}")

                // Simulate a long-running operation (e.g., network request, heavy computation)
                // This 'delay' is non-blocking for the thread it's on.
                delay(3000) // Wait for 3 seconds

                // Simulate a random success or failure
                val success = Random.nextBoolean()

                if (success) {
                    val result = "Android processed '$message' successfully! Timestamp: ${System.currentTimeMillis()}"
                    println("MyAndroidServiceModule: Sending success result: $result")
                    // Resolve the promise with the result, which sends it back to JavaScript.
                    promise.resolve(result)
                } else {
                    val error = "Android failed to process '$message'! Simulated error."
                    println("MyAndroidServiceModule: Sending error: $error")
                    // Reject the promise with an error code and message.
                    promise.reject("ASYNC_TASK_FAILED", error)
                }

            } catch (e: Exception) {
                // Catch any unexpected exceptions during the task.
                println("MyAndroidServiceModule: Exception during task: ${e.message}")
                promise.reject("NATIVE_ERROR", "An unexpected error occurred: ${e.message}", e)
            }
        }
    }
}
// android/app/src/main/java/com/yourprojectname/MyReactNativePackage.kt
package com.yourprojectname // Make sure this matches your project's package name

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager
import java.util.Collections

class MyReactNativePackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        // Register our custom native module here
        return listOf(MyAndroidServiceModule(reactContext))
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return Collections.emptyList()
    }
}
// android/app/src/main/java/com/yourprojectname/MainApplication.kt
package com.yourprojectname

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.soloader.SoLoader

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost =
      object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> =
            PackageList(this).packages.apply {
              // Add your custom package here.
              // Packages that cannot be autolinked yet can be added manually here, for example:
              add(MyReactNativePackage()) // <--- ADD THIS LINE
            }

        override fun getJSMainModuleName(): String = "index"

        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

        override val is
          get() = false // New architecture

        override fun getJSIModulePackage(): JSIModulePackage? = null // New architecture
      }

  override val reactHost: ReactHost
    get() = DefaultReactHost(this.applicationContext, reactNativeHost)

  override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, false)
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      load()
    }
    ReactNativeFlipper.initializeFlipper(this, reactNativeHost.reactInstanceManager)
  }
}
// android/app/build.gradle
dependencies {
    // ... other dependencies
    implementation "org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.3" // Or the latest version
    implementation "org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.3" // Or the latest version
}
// App.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  NativeModules,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';

// --- Type Definition for our Native Module (optional but highly recommended for TypeScript) ---
interface MyAndroidServiceModule {
  // The function signature MUST match the one defined in Kotlin (performAsyncTask(message: String, promise: Promise))
  // In TS, a function returning a Promise is how we represent the async native method.
  performAsyncTask(param: string): Promise<string>;
  // If you had other methods, you'd list them here:
  // getSomeValue(): Promise<number>;
  // syncMethod(arg: string): string; // For synchronous methods (though less common with async tasks)
}

// Get the native module instance
// Ensure 'MyAndroidServiceModule' matches the name returned by getName() in Kotlin!
const { MyAndroidServiceModule } = NativeModules as {
  MyAndroidServiceModule: MyAndroidServiceModule;
};

const App: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleTriggerAsyncTask = async () => {
    setLoading(true);
    setResult(null);
    setError(null); // Clear previous errors

    try {
      // Call the native module method. It returns a Promise that resolves or rejects.
      const response = await MyAndroidServiceModule.performAsyncTask(
        'Hello from TypeScript!',
      );
      setResult(response); // Update state with the successful result
      Alert.alert('Success', response);
    } catch (e: any) {
      // Handle errors (Promise rejection from native side)
      console.error('Error calling native module:', e);
      setError(`Native Error: ${e.code || 'UNKNOWN'} - ${e.message || 'An unknown error occurred.'}`);
      Alert.alert('Error', `Operation failed: ${e.message || 'Check console.'}`);
    } finally {
      setLoading(false); // Always stop loading, regardless of success or failure
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TypeScript to Android Async Task</Text>

      <Button
        title={loading ? 'Working on Android...' : 'Trigger Android Async Task'}
        onPress={handleTriggerAsyncTask}
        disabled={loading}
        color={loading ? '#ccc' : '#007bff'}
      />

      {loading && (
        <View style={styles.statusContainer}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text style={styles.statusText}>Executing native task...</Text>
        </View>
      )}

      {result && (
        <View style={styles.resultBox}>
          <Text style={styles.resultLabel}>Success Result:</Text>
          <Text style={styles.resultText}>{result}</Text>
        </View>
      )}

      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorLabel}>Error:</Text>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <Text style={styles.instructions}>
        (This will call a Kotlin module on Android which simulates a 3-second task with a random success/failure.)
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f2f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    padding: 10,
    backgroundColor: '#e6f7ff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#91d5ff',
  },
  statusText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#0050b3',
  },
  resultBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#e6ffe6',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#52c41a',
    width: '100%',
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#237804',
    marginBottom: 5,
  },
  resultText: {
    fontSize: 15,
    color: '#333',
  },
  errorBox: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#ffe6e6',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ff4d4f',
    width: '100%',
  },
  errorLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#a8071a',
    marginBottom: 5,
  },
  errorText: {
    fontSize: 15,
    color: '#333',
  },
  instructions: {
    marginTop: 40,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 20,
  },
});

export default App;
