import { NativeModules, Platform } from 'react-native';

interface AndroidAsyncInterface {
  performAsyncTask(input: string): Promise<string>;
}

const AndroidAsyncModule = NativeModules.AndroidAsyncModule as AndroidAsyncInterface;

export const runAndroidAsyncTask = async (input: string): Promise<string> => {
  if (Platform.OS !== 'android') {
    throw new Error('This functionality is only available on Android');
  }

  try {
    const result = await AndroidAsyncModule.performAsyncTask(input);
    return result;
  } catch (error) {
    console.error('Async task failed:', error);
    throw error;
  }
};
import { runAndroidAsyncTask } from './AndroidAsyncModule';

const processData = async () => {
  try {
    const input = 'Request_123';
    console.log('Starting async task...');
    const result = await runAndroidAsyncTask(input);
    console.log('Async task completed:', result);
    // Update UI with result
  } catch (error) {
    // Handle errors
  }
};

// Call processData() from a button press or lifecycle method
package com.yourproject;

import androidx.annotation.NonNull;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class AndroidAsyncModule extends ReactContextBaseJavaModule {

    public AndroidAsyncModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "AndroidAsyncModule";
    }

    @ReactMethod
    public void performAsyncTask(final String input, final Promise promise) {
        new AsyncBackgroundTask(promise).execute(input);
    }

    private static class AsyncBackgroundTask extends android.os.AsyncTask<String, Void, String> {

        private final Promise promise;
        private Exception exception;

        AsyncBackgroundTask(Promise promise) {
            this.promise = promise;
        }

        @Override
        protected String doInBackground(String... params) {
            try {
                // Simulate long-running task (3 seconds)
                Thread.sleep(3000);
                
                // Process input (Example: simple reversal)
                String input = params[0];
                return new StringBuilder(input).reverse().toString();
            } catch (Exception e) {
                exception = e;
                return null;
            }
        }

        @Override
        protected void onPostExecute(String result) {
            if (exception != null) {
                promise.reject("ASYNC_ERROR", exception.getMessage());
            } else {
                promise.resolve(result);
            }
        }
    }
}
package com.yourproject;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import java.util.Collections;
import java.util.List;

public class CustomPackage implements ReactPackage {
    @NonNull
    @Override
    public List<NativeModule> createNativeModules(
        @NonNull ReactApplicationContext reactContext) {
        return Collections.singletonList(new AndroidAsyncModule(reactContext));
    }

    @NonNull
    @Override
    public List<ViewManager> createViewManagers(
        @NonNull ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
@Override
protected List<ReactPackage> getPackages() {
    return Arrays.asList(
        new MainReactPackage(),
        new CustomPackage()  // Add this line
    );
}
@ReactMethod
fun performAsyncTask(input: String, promise: Promise) {
    CoroutineScope(Dispatchers.IO).launch {
        try {
            val result = processData(input)
            promise.resolve(result)
        } catch (e: Exception) {
            promise.reject("ASYNC_ERROR", e.message)
        }
    }
}

private suspend fun processData(input: String): String {
    delay(3000) // Simulate long operation
    return input.reversed()
}
