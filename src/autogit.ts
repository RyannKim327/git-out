// MainActivity.kt
package com.example.webviewasync

import android.os.Bundle
import android.webkit.JavascriptInterface
import android.webkit.WebView
import androidx.appcompat.app.AppCompatActivity
import kotlinx.coroutines.*

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        webView = WebView(this).apply {
            settings.javaScriptEnabled = true
            addJavascriptInterface(AndroidBridge(this), "AndroidBridge")
            loadUrl("file:///android_asset/index.html")
        }
        setContentView(webView)
    }

    // Object exposed to JS
    inner class AndroidBridge(private val webView: WebView) {

        // Called from JS: androidDoWork("someArg") -> Promise<string>
        @JavascriptInterface
        fun androidDoWork(arg: String, promiseId: String) {
            // Launch a coroutine on IO thread (simulate heavy work)
            CoroutineScope(Dispatchers.IO).launch {
                val result = doAsyncWork(arg)           // <-- your async task
                withContext(Dispatchers.Main) {
                    // Resolve the Promise on the JS side
                    webView.evaluateJavascript(
                        """window.__bridgeResolve("$promiseId", "$result");""", null
                    )
                }
            }
        }

        private suspend fun doAsyncWork(input: String): String {
            delay(1500)                               // simulate network/db
            return "Hello $input from Android coroutine!"
        }
    }
}
<!doctype html>
<html>
  <head>
    <meta charset="utf-8"/>
    <title>TS ↔ Android async</title>
  </head>
  <body>
    <button id="btn">Run Android async task</button>
    <pre id="log"></pre>

    <script type="module">
      // ---------- tiny bridge ----------
      const pending = new Map<string, { resolve: (v: any) => void; reject: (e: any) => void }>();

      (window as any).__bridgeResolve = (id: string, value: string) => {
        pending.get(id)?.resolve(value);
        pending.delete(id);
      };
      (window as any).__bridgeReject = (id: string, reason: string) => {
        pending.get(id)?.reject(new Error(reason));
        pending.delete(id);
      };

      function androidDoWork(arg: string): Promise<string> {
        return new Promise((resolve, reject) => {
          const id = Math.random().toString(36).slice(2);
          pending.set(id, { resolve, reject });
          (window as any).AndroidBridge.androidDoWork(arg, id);
        });
      }
      // ---------- usage ----------
      document.getElementById('btn')!.addEventListener('click', async () => {
        try {
          const msg = await androidDoWork('TypeScript');
          document.getElementById('log')!.textContent = msg;
        } catch (e) {
          document.getElementById('log')!.textContent = 'Error: ' + e;
        }
      });
    </script>
  </body>
</html>
