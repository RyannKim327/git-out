// TypeScript – runs inside the WebView
async function callNativeAsync(): Promise<string> {
  return new Promise<string>(resolve => {
    // 1. Subscribe for the single-shot response
    const listener = (event: MessageEvent) => {
      if (event.data.type === 'native-result') {
        window.removeEventListener('message', listener);
        resolve(event.data.payload);
      }
    };
    window.addEventListener('message', listener);

    // 2. Ask Android to do the work
    (window as any).androidInterface.postMessage(
      JSON.stringify({ id: 'asyncJob', data: 'hello from ts' })
    );
  });
}

// usage
(async () => {
  const result = await callNativeAsync();
  console.log('Native returned:', result);
})();
class MainActivity : AppCompatActivity() {

    private val handler = Handler(Looper.getMainLooper())

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val webView: WebView = findViewById(R.id.webview)
        webView.settings.javaScriptEnabled = true

        // 1. Expose a single object to JS context
        webView.addJavascriptInterface(NativeBridge(webView), "androidInterface")

        // 2. Load the HTML/JS that contains the TypeScript bundle
        webView.loadUrl("file:///android_asset/index.html")
    }

    inner class NativeBridge(private val webView: WebView) {

        @JavascriptInterface
        fun postMessage(json: String) {
            // Parse the envelope (quick & dirty)
            val msg = JSONObject(json)
            val id = msg.getString("id")

            // 3. Do something long on an IO thread
            lifecycleScope.launch(Dispatchers.IO) {
                val answer = doSlowAsyncThing(msg.getString("data"))

                // 4. Come back to main thread and answer the WebView
                withContext(Dispatchers.Main) {
                    val js = """
                        window.postMessage(
                          { type:'native-result', payload: ${JSONObject.quote(answer)} },
                          '*'
                        );
                    """.trimIndent()
                    webView.evaluateJavascript(js, null)
                }
            }
        }

        private suspend fun doSlowAsyncThing(input: String): String {
            delay(2_000) // simulate network/db
            return "Kotlin processed: $input"
        }
    }
}
dependencies {
    implementation "org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.3"
}
