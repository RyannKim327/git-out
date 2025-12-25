/**
 * This file is compiled to JavaScript (app.js) and placed in
 *   src/main/assets/www/   (or any folder you load into the WebView)
 *
 * It demonstrates:
 *   • An async function that fetches JSON from a public API.
 *   • A tiny helper that calls the Android bridge once the data is ready.
 */

interface GithubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

/**
 * Calls the Android bridge (if it exists) with a JSON string.
 * The bridge is injected by the Android WebView as `window.AndroidBridge`.
 */
function sendResultToAndroid(result: unknown): void {
  const payload = JSON.stringify(result);
  // Guard against the bridge not being present (e.g., when you run the page in a desktop browser)
  if (window && (window as any).AndroidBridge && typeof (window as any).AndroidBridge.onResult === 'function') {
    (window as any).AndroidBridge.onResult(payload);
  } else {
    console.warn('AndroidBridge not available – result:', payload);
  }
}

/**
 * Example async task: fetch a random GitHub user.
 */
async function fetchRandomGithubUser(): Promise<GithubUser> {
  // GitHub provides a "random" user endpoint via the public events stream.
  const response = await fetch('https://api.github.com/users/octocat');
  if (!response.ok) {
    throw new Error(`Network error: ${response.status}`);
  }
  const data = (await response.json()) as GithubUser;
  return data;
}

/**
 * Entry point – called from Android once the WebView finishes loading,
 * or you can call it directly from HTML (`<body onload="run()">`).
 */
async function run(): Promise<void> {
  try {
    const user = await fetchRandomGithubUser();
    console.log('Fetched user:', user);
    sendResultToAndroid(user);
  } catch (e) {
    console.error('Failed to fetch user', e);
    sendResultToAndroid({ error: (e as Error).message });
  }
}

/* Export for potential external use (e.g., unit tests) */
export { run, fetchRandomGithubUser, sendResultToAndroid };
# Install TypeScript locally (if you haven’t already)
npm install -g typescript

# Compile to a single JS file that the WebView can load
tsc app.ts --target ES2017 --module none --outFile app.js
// MainActivity.kt
package com.example.tsandroidbridge

import android.annotation.SuppressLint
import android.os.Bundle
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import org.json.JSONObject

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView

    @SuppressLint("SetJavaScriptEnabled") // We need JS for the bridge
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Simple layout – just a full‑screen WebView
        webView = WebView(this).apply {
            settings.javaScriptEnabled = true
            // Optional: enable debugging on Android 4.4+
            WebView.setWebContentsDebuggingEnabled(true)

            // Bridge object that the TS code can call
            addJavascriptInterface(AndroidBridge(), "AndroidBridge")

            // Nice debugging console output
            webChromeClient = WebChromeClient()
            webViewClient = WebViewClient()
        }

        setContentView(webView)

        // Load the HTML page that includes app.js
        webView.loadUrl("file:///android_asset/www/index.html")
    }

    /**
     * This class is exposed to JavaScript as `window.AndroidBridge`.
     * All public methods annotated with @JavascriptInterface can be called from JS.
     */
    inner class AndroidBridge {

        /**
         * Called from TypeScript when the async fetch finishes.
         *
         * @param jsonPayload A JSON string (the user object or an error wrapper)
         */
        @JavascriptInterface
        fun onResult(jsonPayload: String) {
            // Switch to a background thread for any heavy work.
            lifecycleScope.launch {
                // Parse the JSON safely
                val result = withContext(Dispatchers.Default) {
                    try {
                        JSONObject(jsonPayload)
                    } catch (e: Exception) {
                        JSONObject().put("parseError", e.message)
                    }
                }

                // Simulate an "async task" on Android – e.g., store in DB, call another API, etc.
                // Here we just log it and show a toast.
                handleResultOnAndroid(result)
            }
        }

        private suspend fun handleResultOnAndroid(json: JSONObject) {
            // Example of a coroutine‑based async operation (replaces AsyncTask)
            withContext(Dispatchers.IO) {
                // Pretend we write to a local DB or do network I/O
                // For demo purposes we just sleep a bit
                Thread.sleep(500) // NOT recommended in real code – use proper suspend functions
            }

            // Back on the main thread – UI work
            runOnUiThread {
                // Show a quick toast
                val message = if (json.has("error")) {
                    "Error from TS: ${json.getString("error")}"
                } else {
                    "GitHub user: ${json.getString("login")} (ID ${json.getInt("id")})"
                }
                android.widget.Toast.makeText(this@MainActivity, message, android.widget.Toast.LENGTH_LONG).show()
            }
        }
    }
}
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>TS ↔ Android Bridge Demo</title>
  <script src="app.js"></script>
</head>
<body>
  <h1>TypeScript ↔ Android Bridge</h1>
  <button onclick="run()">Fetch Random GitHub User</button>

  <!-- Optional: show the raw result in the page -->
  <pre id="output"></pre>

  <script>
    // Hook the TS `run` function to the button (already exported)
    // If you prefer auto‑run on load, just call run() here.
    function run() {
      // Clear previous output
      document.getElementById('output').textContent = 'Fetching...';
      // Call the TS async entry point
      window.run().then(() => {
        // Nothing to do – the TS code will call AndroidBridge.onResult()
      });
    }

    // For debugging in a desktop browser, expose a mock bridge:
    if (!window.AndroidBridge) {
      window.AndroidBridge = {
        onResult: (payload) => {
          document.getElementById('output').textContent = payload;
          console.log('Mock AndroidBridge received:', payload);
        }
      };
    }
  </script>
</body>
</html>
