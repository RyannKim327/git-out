YourAndroidProject/
├── app/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/example/tsandroidasync/
│   │   │   │   ├── MainActivity.kt
│   │   │   │   └── AndroidBridge.kt
│   │   │   ├── res/
│   │   │   │   └── layout/activity_main.xml
│   │   │   └── assets/
│   │   │       ├── index.html
│   │   │       └── app.js  <-- Compiled TypeScript will go here
│   │   └── AndroidManifest.xml
│   └── build.gradle (app level)
├── ts_src/
│   ├── app.ts        <-- Your TypeScript source
│   └── tsconfig.json
└── package.json
// ... other dependencies
dependencies {
    implementation 'androidx.core:core-ktx:1.10.1'
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.9.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'

    // Kotlin Coroutines
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.1'
    implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.1' // For Android-specific dispatchers

    // For WebView
    implementation 'androidx.webkit:webkit:1.6.1' // Optional, but good for WebView-related utils

    testImplementation 'junit:junit:4.13.2'
    androidTestImplementation 'androidx.test.ext:junit:1.1.5'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.5.1'
}
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <!-- If you plan to load external URLs in WebView, you'll need this -->
    <!-- <uses-permission android:name="android.permission.INTERNET" /> -->

    <application
        android:allowBackup="true"
        android:dataExtractionRules="@xml/data_extraction_rules"
        android:fullBackupContent="@xml/backup_rules"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.TsAndroidAsync"
        tools:targetApi="31">
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <WebView
        android:id="@+id/webView"
        android:layout_width="0dp"
        android:layout_height="0dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
package com.example.tsandroidasync

import android.webkit.JavascriptInterface
import android.webkit.WebView
import kotlinx.coroutines.*
import java.util.concurrent.TimeUnit

class AndroidBridge(private val webView: WebView) {

    // Using a CoroutineScope tied to the lifecycle of this Bridge object
    private val bridgeScope = CoroutineScope(Dispatchers.Main + Job())

    /**
     * This method will be exposed to JavaScript.
     * @param dataFromJs Data passed from TypeScript.
     * @param jsCallbackFunctionName The name of the JavaScript function to call back with the result.
     */
    @JavascriptInterface
    fun performNativeAsyncTask(dataFromJs: String, jsCallbackFunctionName: String) {
        println("AndroidBridge: Received call from JS. Data: '$dataFromJs', Callback: '$jsCallbackFunctionName'")

        bridgeScope.launch(Dispatchers.IO) { // Run heavy work on a background thread (IO dispatcher)
            println("AndroidBridge: Starting native background task...")
            val startTime = System.currentTimeMillis()

            // Simulate a long-running operation
            delay(TimeUnit.SECONDS.toMillis(3)) // Wait for 3 seconds
            val processedData = dataFromJs.uppercase()
            val endTime = System.currentTimeMillis()
            val duration = (endTime - startTime) / 1000.0

            val result = "Hello from Android! " +
                         "I processed '$processedData' in ${duration}s. " +
                         "Timestamp: ${System.currentTimeMillis()}"

            println("AndroidBridge: Native task finished. Result: '$result'")

            withContext(Dispatchers.Main) { // Switch back to the Main thread to interact with WebView
                // Call back to the JavaScript function in the WebView
                val jsCode = "${jsCallbackFunctionName}('$result')"
                println("AndroidBridge: Evaluating JS: '$jsCode'")
                webView.evaluateJavascript(jsCode, null)
            }
        }
    }

    // You can add more methods here
    @JavascriptInterface
    fun getAndroidVersion(): String {
        return "Android ${android.os.Build.VERSION.RELEASE} (API ${android.os.Build.VERSION.SDK_INT})"
    }

    // Cleanup scope when the bridge is no longer needed (e.g., in onDestroy of MainActivity)
    fun destroy() {
        bridgeScope.cancel()
        println("AndroidBridge: Coroutine scope cancelled.")
    }
}
package com.example.tsandroidasync

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient

class MainActivity : AppCompatActivity() {
    private lateinit var webView: WebView
    private lateinit var androidBridge: AndroidBridge

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        webView = findViewById(R.id.webView)
        androidBridge = AndroidBridge(webView) // Initialize the bridge

        setupWebView()
    }

    private fun setupWebView() {
        // Enable JavaScript
        webView.settings.javaScriptEnabled = true
        // Enable DOM storage (e.g., localStorage)
        webView.settings.domStorageEnabled = true
        // Set WebViewClient to handle page navigation within the WebView itself
        webView.webViewClient = WebViewClient()

        // IMPORTANT: Add the JavaScript interface.
        // The first argument is the Kotlin object instance.
        // The second argument is the name by which JavaScript will refer to this object (e.g., window.AndroidBridge)
        webView.addJavascriptInterface(androidBridge, "AndroidBridge")

        // For debugging WebView content in Chrome DevTools (enable on debug builds only)
        WebView.setWebContentsDebuggingEnabled(true)


        // Load your local HTML file from the 'assets' folder
        // Make sure your compiled app.js is also in the assets folder
        webView.loadUrl("file:///android_asset/index.html")
    }

    override fun onDestroy() {
        super.onDestroy()
        // Cancel any ongoing coroutines in the bridge when the activity is destroyed
        androidBridge.destroy()
        // Best practice: destroy the WebView to free up memory and resources
        webView.destroy()
    }
}
{
  "compilerOptions": {
    "target": "ES2017",            // Compile to ES2017 JavaScript
    "module": "CommonJS",          // Or "ESNext" depending on your module loader
    "outDir": "../app/src/main/assets", // Output compiled JS to Android assets folder
    "rootDir": "./",               // Source files are in the current directory
    "strict": true,                // Enable all strict type-checking options
    "esModuleInterop": true,       // Enable interoperability between CommonJS and ES Modules
    "skipLibCheck": true,          // Skip type checking of declaration files
    "forceConsistentCasingInFileNames": true // Ensure file names have consistent casing
  },
  "include": [
    "app.ts"
  ]
}
// Define a global interface for the AndroidBridge object injected by Android
// This helps TypeScript provide type safety when calling native methods.
declare global {
    interface Window {
        AndroidBridge: {
            // The method exposed from Kotlin: name and parameter types must match
            performNativeAsyncTask: (data: string, jsCallbackFunctionName: string) => void;
            getAndroidVersion: () => string;
        };
        // Also declare the global callback function that Android will call
        handleAndroidResult: (result: string) => void;
    }
}

const callButton = document.getElementById('callAndroidButton');
const resultDiv = document.getElementById('result');
const loadingDiv = document.getElementById('loading');
const androidVersionDiv = document.getElementById('androidVersion');

// This function will be called by the Android Native code when its async task finishes.
window.handleAndroidResult = (result: string) => {
    console.log("[JS] Received result from Android:", result);
    if (resultDiv) {
        resultDiv.textContent = `[JS Received] ${result}`;
        resultDiv.style.color = 'green';
    }
    if (loadingDiv) {
        loadingDiv.style.display = 'none';
    }
    if (callButton) {
        callButton.removeAttribute('disabled');
        callButton.textContent = 'Call Android Async Task Again';
    }
};

callButton?.addEventListener('click', () => {
    if (resultDiv) {
        resultDiv.textContent = 'Calling Android Native Async Task...';
        resultDiv.style.color = 'orange';
    }
    if (loadingDiv) {
        loadingDiv.style.display = 'block';
    }
    if (callButton) {
        callButton.setAttribute('disabled', 'true');
        callButton.textContent = 'Calling...';
    }

    const dataToSend = `Data from TypeScript @ ${new Date().toLocaleTimeString()}`;

    // Check if the AndroidBridge object exists and the method is available.
    // This is crucial for when your HTML might be viewed outside an Android WebView.
    if (window.AndroidBridge && typeof window.AndroidBridge.performNativeAsyncTask === 'function') {
        console.log("[JS] Calling AndroidBridge.performNativeAsyncTask...");
        // Call the native method, passing data and the name of the JS callback function.
        // Android will execute its background task and then call `window.handleAndroidResult`
        // with the processed string.
        window.AndroidBridge.performNativeAsyncTask(dataToSend, 'handleAndroidResult');
    } else {
        const errorMessage = "AndroidBridge object or performNativeAsyncTask method not found. Are you running this in an Android WebView?";
        console.error("[JS Error]", errorMessage);
        if (resultDiv) {
            resultDiv.textContent = `[JS Error] ${errorMessage}`;
            resultDiv.style.color = 'red';
        }
        if (loadingDiv) {
            loadingDiv.style.display = 'none';
        }
        if (callButton) {
            callButton.removeAttribute('disabled');
            callButton.textContent = 'Call Android Async Task (Error)';
        }
    }
});

// Example of calling another simple synchronous method
if (androidVersionDiv && window.AndroidBridge && typeof window.AndroidBridge.getAndroidVersion === 'function') {
    androidVersionDiv.textContent = `Running on: ${window.AndroidBridge.getAndroidVersion()}`;
} else if (androidVersionDiv) {
    androidVersionDiv.textContent = "Running in browser (not Android WebView)";
}


console.log("[JS] TypeScript app loaded in WebView.");

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TypeScript Android Async Task</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 20px;
            background-color: #f0f2f5;
            color: #333;
            text-align: center;
        }
        h1 {
            color: #007bff;
            margin-bottom: 10px;
        }
        p {
            margin-bottom: 25px;
            font-size: 0.95em;
        }
        button {
            background-color: #28a745;
            color: white;
            padding: 12px 25px;
            border: none;
            border-radius: 5px;
            font-size: 17px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        button:hover:enabled {
            background-color: #218838;
        }
        button:disabled {
            background-color: #a0a0a0;
            cursor: not-allowed;
        }
        #loading {
            margin-top: 20px;
            font-style: italic;
            color: #6c757d;
            display: none; /* Hidden by default */
        }
        #result {
            margin-top: 30px;
            padding: 20px;
            border: 1px solid #ced4da;
            background-color: #e9ecef;
            border-radius: 8px;
            min-height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.1em;
            color: #495057;
            font-weight: bold;
            word-break: break-word;
        }
        #androidVersion {
            margin-top: 40px;
            font-size: 0.85em;
            color: #888;
        }
    </style>
</head>
<body>
    <h1>TypeScript to Android Async Demo</h1>
    <p>This WebView runs TypeScript code that calls a native Android background task.</p>

    <button id="callAndroidButton">Call Android Async Task</button>

    <div id="loading">Performing native task... please wait.</div>

    <div id="result">
        Click the button to send data to Android and get a result back!
    </div>

    <div id="androidVersion">
        Checking Android version...
    </div>

    <!-- Your compiled TypeScript code will be loaded here -->
    <!-- Make sure `app.js` is placed in `app/src/main/assets/` -->
    <script src="app.js"></script>
</body>
</html>
