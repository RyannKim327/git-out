class JsBridge(private val ctx: Context) {

    @JavascriptInterface
    fun runAsyncTask(payload: String): String {
        // payload is whatever you want to pass (JSON, plain text, …)
        return runBlocking {
            // simulate heavy work
            delay(1500)
            "Done: $payload"
        }
    }
}

// In Activity / Fragment
webView.addJavascriptInterface(JsBridge(this), "AndroidBridge")
webView.settings.javaScriptEnabled = true
webView.loadUrl("file:///android_asset/index.html")
// Strongly typed view of the native object
interface AndroidBridge {
  runAsyncTask(p: string): string;   // ← blocks the JS thread, but is actually suspending on Kotlin
}

declare global {
  interface Window {
    AndroidBridge?: AndroidBridge;
  }
}

/**
 * Async wrapper around the blocking native call.
 * We spawn a Promise so the UI thread is never frozen.
 */
function nativeAsyncTask(payload: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!window.AndroidBridge) {
      reject(new Error("AndroidBridge not found – are you running in the WebView?"));
      return;
    }
    try {
      // The Kotlin method is marked @JavascriptInterface, so it’s exposed
      const result = window.AndroidBridge.runAsyncTask(payload);
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
}

/* ---------- demo ---------- */
(async () => {
  try {
    console.log("Starting async task…");
    const msg = await nativeAsyncTask("TypeScript<->Android");
    console.log("Native answered:", msg);
  } catch (err) {
    console.error("Native task failed:", err);
  }
})();
npm i -g typescript
tsc index.ts --lib es2017,dom --outDir assets
