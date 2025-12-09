class MainActivity : AppCompatActivity() {
    private lateinit var webView: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        webView = WebView(this)
        setContentView(webView)
        webView.settings.javaScriptEnabled = true

        // Add JS interface so TypeScript can call Android
        webView.addJavascriptInterface(AndroidBridge(), "AndroidBridge")

        // Load your local TypeScript-compiled JS
        webView.loadUrl("file:///android_asset/index.html")
    }

    inner class AndroidBridge {
        @JavascriptInterface
        fun fetchData(request: String) {
            AsyncTask.execute {
                val result = "Fetched data for: $request" // Simulate fetching
                runOnUiThread {
                    webView.evaluateJavascript("window.onAndroidResult('$result');", null)
                }
            }
        }
    }
}
// Assume this code is compiled to JS and included in index.html

// Ask Android to do an async task
function requestDataFromAndroid(request: string) {
    // "AndroidBridge" is the name we used above
    // This will call the Kotlin method
    (window as any).AndroidBridge.fetchData(request);
}

// Callback for Android to send back result
(window as any).onAndroidResult = (result: string) => {
    console.log("Received from Android:", result);
    // Handle the result however you want
}

// Fire off a request
requestDataFromAndroid("example query");
