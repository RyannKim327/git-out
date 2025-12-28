// Exposed by the Android object injected into the WebView
declare const AndroidBridge: {
    doAsyncWork(message: string): Promise<string>;
};

async function run(): Promise<void> {
    try {
        const answer = await AndroidBridge.doAsyncWork("hello from TS");
        console.log("Native answered:", answer);
    } catch (e) {
        console.error("Native failed:", e);
    }
}

// Kick it off
run();
package com.example.tsasync

import android.os.Bundle
import android.webkit.JavascriptInterface
import android.webkit.WebView
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val webView = WebView(this).apply {
            settings.javaScriptEnabled = true
            addJavascriptInterface(NativeBridge(), "AndroidBridge")
            loadUrl("file:///android_asset/www/index.html") // compiled TS goes here
        }
        setContentView(webView)
    }

    inner class NativeBridge {
        // Called from JS on the main thread; we bridge into a coroutine
        @JavascriptInterface
        fun doAsyncWork(message: String): String {
            // Build a Promise-like handle that JS can await
            val handle = JsPromiseHandle()
            lifecycleScope.launch {
                val result = heavyIoWork(message) // suspend function
                handle.resolve(result)
            }
            return handle.jsCode() // injects the JS Promise into the page
        }
    }

    private suspend fun heavyIoWork(input: String): String {
        delay(1500) // simulate IO
        return "Kotlin processed: $input"
    }
}
class JsPromiseHandle {
    private val uuid = java.util.UUID.randomUUID().toString()
    fun jsCode(): String = """
        new Promise((resolve, reject) => {
            window["$uuid"] = {resolve, reject};
        })
    """.trimIndent()

    fun resolve(value: String) {
        evaluateJs("window['$uuid'].resolve('$value'); delete window['$uuid'];")
    }

    private fun evaluateJs(js: String) {
        // Run on UI thread; simplified for brevity
        android.os.Handler(android.os.Looper.getMainLooper()).post {
            (this@MainActivity as? AppCompatActivity)
                ?.window?.decorView?.post {
                    // In real code use WebView.evaluateJavascript
                    webView?.evaluateJavascript(js, null)
                }
        }
    }
}
npm install -g typescript
tsc assets/ts/main.ts --outDir assets/www --target ES2017 --module none
Native answered: Kotlin processed: hello from TS
