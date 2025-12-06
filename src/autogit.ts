// index.ts
import { NativeModules, NativeEventEmitter } from 'react-native';

interface RandomAsyncModule {
  /**
   * Resolves with a random int [0, 1000) after `delayMs`.
   * Android side is implemented with Kotlin coroutines.
   */
  getRandomAsync(delayMs: number): Promise<number>;
}

const { RandomAsyncModule } = NativeModules as { RandomAsyncModule: RandomAsyncModule };
export default RandomAsyncModule;
// android/app/src/main/java/com/yourpackage/RandomAsyncModule.kt
package com.yourpackage

import com.facebook.react.bridge.*
import com.facebook.react.module.annotations.ReactModule
import kotlinx.coroutines.*

@ReactModule(name = RandomAsyncModule.MODULE_NAME)
class RandomAsyncModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    companion object {
        const val MODULE_NAME = "RandomAsyncModule"
    }

    override fun getName() = MODULE_NAME

    private val scope = CoroutineScope(Dispatchers.IO + SupervisorJob())

    @ReactMethod
    fun getRandomAsync(delayMs: Int, promise: Promise) {
        scope.launch {
            delay(delayMs.toLong())
            val value = (0 until 1000).random()
            promise.resolve(value)
        }
    }

    override fun invalidate() {
        super.invalidate()
        scope.cancel("Activity destroyed")
    }
}
// android/app/src/main/java/com/yourpackage/MyPackage.kt
package com.yourpackage

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class MyPackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> =
        listOf(RandomAsyncModule(reactContext))

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> =
        emptyList()
}
override fun getPackages(): List<ReactPackage> =
    PackageList(this).packages.apply {
        add(MyPackage())   // <-- add this line
    }
import RandomAsyncModule from './index';

async function run() {
  const value = await RandomAsyncModule.getRandomAsync(1500);
  console.log('Android gave us', value);
}
run();
