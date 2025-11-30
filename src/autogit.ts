// src/typescript/dataFetcher.ts

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

/**
 * Simulates an asynchronous data fetch operation.
 * It uses the 'fetch' API which is standard in web environments.
 * This function is designed to be called from the Android WebView.
 *
 * @param apiUrl The URL to fetch data from.
 */
async function fetchDataFromApi(apiUrl: string): Promise<void> {
    console.log(`[TypeScript] Starting data fetch from: ${apiUrl}`);

    try {
        // Simulate network delay (optional, but good for testing async behavior)
        await new Promise(resolve => setTimeout(resolve, 1500));

        const response = await fetch(apiUrl);

        if (!response.ok) {
            // Throw an error if the HTTP status is not 2xx
            throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
        }

        const data: Post[] = await response.json();
        console.log(`[TypeScript] Data fetched successfully. Received ${data.length} items.`);

        // Call the Android native interface to report success
        // 'Android' is the name we'll give to our JavaScript interface in Kotlin
        if (window.Android && typeof window.Android.onTypeScriptSuccess === 'function') {
            window.Android.onTypeScriptSuccess(JSON.stringify(data));
        } else {
            console.warn("[TypeScript] 'Android.onTypeScriptSuccess' not available. Data not passed to native.");
        }

    } catch (error: any) {
        console.error(`[TypeScript] Error fetching data:`, error);
        // Call the Android native interface to report error
        if (window.Android && typeof window.Android.onTypeScriptError === 'function') {
            window.Android.onTypeScriptError(error.message || 'Unknown error during fetch');
        } else {
            console.warn("[TypeScript] 'Android.onTypeScriptError' not available. Error not passed to native.");
        }
    } finally {
        console.log(`[TypeScript] Data fetch process finished.`);
    }
}

// Extend Window interface to include our Android JavaScript interface for TypeScript compilation
declare global {
    interface Window {
        Android: {
            onTypeScriptSuccess(jsonResult: string): void;
            onTypeScriptError(errorMessage: string): void;
        };
        fetchDataFromApi(apiUrl: string): Promise<void>; // Make it globally accessible
    }
}

// Exporting it if you're using modules, but for WebView, making it global is often easier
// export { fetchDataFromApi };
// src/main/java/com/example/yourapp/MainActivity.kt
package com.example.yourapp

import android.annotation.SuppressLint
import android.content.Context
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView
    private lateinit var statusTextView: TextView
    private lateinit var fetchButton: Button

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        webView = findViewById(R.id.webView)
        statusTextView = findViewById(R.id.statusTextView)
        fetchButton = findViewById(R.id.fetchButton)

        // Essential: Enable JavaScript
        webView.settings.javaScriptEnabled = true
        // Allow DOM storage for some JS apps (optional, but good practice)
        webView.settings.domStorageEnabled = true

        // Add a JavaScript interface for TypeScript to call Kotlin functions
        // "Android" is the name by which JavaScript will access this interface
        webView.addJavascriptInterface(
            WebAppInterface(this, webView),
            "Android"
        )

        // Set WebViewClient to handle page navigation and loading
        webView.webViewClient = object : WebViewClient() {
            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                updateStatus("WebView page loaded. Ready to execute TypeScript.")
                fetchButton.isEnabled = true // Enable button once page is ready
            }
        }

        // Set WebChromeClient for console.log messages to appear in Logcat
        webView.webChromeClient = WebChromeClient()

        // Load the HTML file that includes your compiled TypeScript
        // This file should be placed in src/main/assets/
        webView.loadUrl("file:///android_asset/index.html")

        fetchButton.setOnClickListener {
            // Call the TypeScript function from Kotlin
            callTypeScriptFunction()
        }
    }

    private fun callTypeScriptFunction() {
        updateStatus("Calling TypeScript's fetchDataFromApi...")
        fetchButton.isEnabled = false // Disable button during fetch

        // The URL for the dummy API
        val apiUrl = "https://jsonplaceholder.typicode.com/posts?_limit=3"

        // Execute the TypeScript function.
        // The .then() and .catch() are handled directly within the TypeScript code
        // by calling the Android interface methods.
        webView.evaluateJavascript("fetchDataFromApi('$apiUrl');") { result ->
            // This 'result' here is the return value of the evaluated JS,
            // which for an async void function like fetchDataFromApi is undefined/null usually.
            // The actual data/error is passed via the Android JS interface callbacks.
            android.util.Log.d("MainActivity", "JavaScript evaluation finished (result: $result). " +
                                                "Waiting for Android.onTypeScriptSuccess/Error callback.")
        }
    }

    private fun updateStatus(message: String) {
        Handler(Looper.getMainLooper()).post {
            statusTextView.text = message
        }
    }

    /**
     * JavaScript Interface class to allow TypeScript to communicate with Android.
     */
    inner class WebAppInterface(private val mContext: Context, private val webView: WebView) {

        @JavascriptInterface
        fun onTypeScriptSuccess(jsonResult: String) {
            android.util.Log.d("WebAppInterface", "TypeScript Success! Data: $jsonResult")
            // Always update UI on the main thread
            Handler(Looper.getMainLooper()).post {
                updateStatus("TypeScript Success! Data received. (Check Logcat)")
                Toast.makeText(mContext, "Data fetched from TypeScript!", Toast.LENGTH_SHORT).show()
                fetchButton.isEnabled = true
                // You can parse jsonResult here and update native UI elements
                // Example: parseJsonAndDisplay(jsonResult)
            }
        }

        @JavascriptInterface
        fun onTypeScriptError(errorMessage: String) {
            android.util.Log.e("WebAppInterface", "TypeScript Error! Message: $errorMessage")
            // Always update UI on the main thread
            Handler(Looper.getMainLooper()).post {
                updateStatus("TypeScript Error: $errorMessage")
                Toast.makeText(mContext, "TS Error: $errorMessage", Toast.LENGTH_LONG).show()
                fetchButton.isEnabled = true
            }
        }
    }
}
<!-- src/main/assets/index.html -->
<!DOCTYPE html>
<html>
<head>
    <title>TypeScript Async Demo</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <style>
        body { font-family: sans-serif; margin: 20px; text-align: center; }
        h1 { color: #333; }
        p { color: #666; }
    </style>
</head>
<body>
    <h1>TypeScript Async Demo</h1>
    <p>This page loads TypeScript (compiled JS) that performs an async fetch.</p>
    <p>Android native code triggers the fetch and receives the result via a JavaScript Interface.</p>

    <!-- Load your compiled JavaScript file -->
    <!-- After compilation, dataFetcher.ts becomes dataFetcher.js -->
    <script src="dataFetcher.js"></script>

    <script>
        // You can also call the function directly from here if needed
        // For this example, Android triggers it.
        console.log("[HTML] dataFetcher.js loaded.");
    </script>
</body>
</html>
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="vertical"
    android:padding="16dp"
    tools:context=".MainActivity">

    <TextView
        android:id="@+id/statusTextView"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Waiting for WebView to load..."
        android:textSize="16sp"
        android:paddingBottom="8dp"/>

    <Button
        android:id="@+id/fetchButton"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Fetch Data with TypeScript"
        android:enabled="false"
        android:layout_marginBottom="16dp"/>

    <WebView
        android:id="@+id/webView"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

</LinearLayout>
// tsconfig.json
{
  "compilerOptions": {
    "target": "es5",               /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', 'ES2021', or 'ESNext'. */
    "module": "es2015",             /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */
    "lib": ["dom", "es2017"],      /* Specify library files to be included in the compilation. "dom" for browser APIs, "es2017" for async/await. */
    "allowJs": true,               /* Allow javascript files to be compiled. */
    "outDir": "./assets",          /* Redirect output structure to the directory. Make sure this matches your Android assets folder. */
    "rootDir": "./src/typescript", /* Specify the root directory of input files. */
    "strict": true,                /* Enable all strict type-checking options. */
    "esModuleInterop": true,       /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
    "skipLibCheck": true,          /* Skip type checking of declaration files. */
    "forceConsistentCasingInFileNames": true /* Disallow inconsistently-cased references to the same file. */
  },
  "include": [
    "./src/typescript/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
<!-- AndroidManifest.xml -->
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.yourapp">

    <uses-permission android:name="android.permission.INTERNET" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.YourApp">
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
