// NativeModule.ts
import { NativeModules } from 'react-native';

// 1. Describe the shape of the native module so TypeScript is happy
interface HeavyWorkModule {
  doHeavyWork(): Promise<string>;   // <-- returns a native Promise
}

// 2. Pull the module out of the bridge
const { HeavyWorkModule } = NativeModules as {
  HeavyWorkModule: HeavyWorkModule;
};

// 3. A random async utility that wraps the native call
export async function performHeavyTask(retries = 3): Promise<string> {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await HeavyWorkModule.doHeavyWork(); // <-- native async task
      return result;                                    // success path
    } catch (err) {
      if (i === retries - 1) throw err;                 // give up after N tries
    }
  }
  throw new Error('Unreachable');
}

// 4. Example usage somewhere in your UI
(async () => {
  try {
    const msg = await performHeavyTask();
    console.log('Native says:', msg);
  } catch (e) {
    console.error('Native task failed', e);
  }
})();
@ReactMethod
fun doHeavyWork(promise: Promise) {
  Thread {
    try {
      // Simulate 2-second heavy work
      Thread.sleep(2000)
      promise.resolve("Hello from Android ${Build.VERSION.RELEASE}")
    } catch (e: Exception) {
      promise.reject("HEAVY_WORK_ERR", e)
    }
  }.start()
}
