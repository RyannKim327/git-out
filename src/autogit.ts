// async-demo.ts
import { Plugins } from '@capacitor/core';
const { AsyncDemo } = Plugins;

/**
 * Fire-and-forget example
 */
(async () => {
  try {
    const { hash, size } = await AsyncDemo.doSomethingRandom({
      url: 'https://httpbin.org/json',
      algorithm: 'SHA-256'
    });
    console.log('Native async task finished!');
    console.log('SHA-256 =', hash);
    console.log('Payload size =', size, 'bytes');
  } catch (e) {
    console.error('Async task failed', e);
  }
})();
// definitions.ts
declare module '@capacitor/core' {
  interface PluginRegistry {
    AsyncDemo: {
      doSomethingRandom(options: {
        url: string;
        algorithm: 'SHA-1' | 'SHA-256' | 'MD5';
      }): Promise<{ hash: string; size: number }>;
    };
  }
}
package com.yourpackage.asyncdemo

import android.os.AsyncTask
import com.getcapacitor.*
import java.net.URL
import java.security.MessageDigest
import javax.xml.bind.DatatypeConverter

@CapacitorPlugin(name = "AsyncDemo")
class AsyncDemoPlugin : Plugin() {

    @PluginMethod(returnType = PluginMethod.RETURN_PROMISE)
    fun doSomethingRandom(call: PluginCall) {
        val url = call.getString("url") ?: return call.reject("URL required")
        val algo = call.getString("algorithm") ?: "SHA-256"

        // AsyncTask is deprecated but still works; swap for coroutines if you wish
        object : AsyncTask<Void, Void, Result>() {
            override fun doInBackground(vararg params: Void?): Result? {
                return try {
                    val bytes = URL(url).readBytes()
                    val digest = MessageDigest.getInstance(algo).digest(bytes)
                    val hash = DatatypeConverter.printHexBinary(digest).lowercase()
                    Result(hash, bytes.size)
                } catch (t: Throwable) {
                    null
                }
            }

            override fun onPostExecute(result: Result?) {
                result
                    ?.let {
                        val ret = JSObject()
                        ret.put("hash", it.hash)
                        ret.put("size", it.size)
                        call.resolve(ret)
                    }
                    ?: call.reject("Async task failed")
            }
        }.execute()
    }

    private data class Result(val hash: String, val size: Int)
}
import com.yourpackage.asyncdemo.AsyncDemoPlugin;
// ...
add(AsyncDemoPlugin.class);
npm install
npx cap sync android
npm run build
npx cap run android
