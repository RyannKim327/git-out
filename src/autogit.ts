// ts: src/main.ts
interface AndroidBridge {
  connectAsync(): Promise<string>;
}

declare const window: Window & {
  androidBridge?: AndroidBridge;
};

/**
 * Helper that wraps the native bridge into a Promise.
 * The native side must call `window.onConnectResult(id, result)` when finished.
 */
function connectToAndroid(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const id = `${Date.now()}_${Math.random()}`;
    (window as any)[`onConnectResult_${id}`] = (success: boolean, payload: string) => {
      success ? resolve(payload) : reject(new Error(payload));
    };

    if (!window.androidBridge) {
      reject(new Error("Android bridge not available"));
      return;
    }
    // invoke the native method; pass the callback id so Android can route the answer
    (window.androidBridge as any).connectAsync(id);
  });
}

// ---- usage ----
connectToAndroid()
  .then(msg => console.log("Async result:", msg))
  .catch(err => console.error("Async error:", err));
// Kotlin: com.example.myapp.WebViewBridge.kt
class WebViewBridge(private val webView: WebView) {

    @JavascriptInterface
    fun connectAsync(callbackId: String) {
        // launch a coroutine on the IO thread (network, DB, whatever)
        CoroutineScope(Dispatchers.IO).launch {
            val result = doHeavyWork()          // <-- your async task
            val js = """window.onConnectResult_${callbackId}(true, "$result");"""
            withContext(Dispatchers.Main) {
                webView.evaluateJavascript(js, null)
            }
        }
    }

    private suspend fun doHeavyWork(): String {
        delay(1500) // simulate network delay
        return "Hello from Android coroutine"
    }
}
// Kotlin: com.example.myapp.MainActivity.kt
val webView: WebView = findViewById(R.id.webview)
WebView.setWebContentsDebuggingEnabled(true)
webView.settings.javaScriptEnabled = true
webView.addJavascriptInterface(WebViewBridge(webView), "androidBridge")
webView.loadUrl("file:///android_asset/index.html") // or your local dev server
