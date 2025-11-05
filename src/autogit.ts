import { Capacitor } from '@capacitor/core';
import { Network } from '@capacitor/network';

interface ApiResponse {
  data: any;
  status: number;
}

class AndroidAsyncService {
  private readonly API_BASE_URL = 'https://api.example.com';

  // Method to simulate async network call with Android compatibility
  async fetchDataAsync(endpoint: string): Promise<ApiResponse> {
    try {
      // Check if running on Android
      if (Capacitor.getPlatform() === 'android') {
        console.log('Running on Android - using native compatible async operations');
      }

      // Simulate async network request with timeout
      const response = await Promise.race([
        this.makeApiRequest(endpoint),
        this.timeoutAfter(10000) // 10-second timeout
      ]);

      return response as ApiResponse;
    } catch (error) {
      console.error('Async task failed:', error);
      throw new Error(`Network request failed: ${error.message}`);
    }
  }

  private async makeApiRequest(endpoint: string): Promise<ApiResponse> {
    const url = `${this.API_BASE_URL}/${endpoint}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Platform': Capacitor.getPlatform()
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      data,
      status: response.status
    };
  }

  private timeoutAfter(ms: number): Promise<never> {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Request timed out after ${ms}ms`));
      }, ms);
    });
  }

  // Android-specific network status check
  async checkAndroidNetworkStatus(): Promise<{ connected: boolean; type?: string }> {
    if (Capacitor.getPlatform() === 'android') {
      const status = await Network.getStatus();
      return {
        connected: status.connected,
        type: status.connectionType
      };
    }
    
    return { connected: navigator.onLine };
  }
}

// Usage example
const service = new AndroidAsyncService();

// Execute async task
service.fetchDataAsync('users/123')
  .then(response => {
    console.log('Async task completed:', response.data);
    
    // Update UI or native Android component
    if (Capacitor.isNativePlatform()) {
      this.updateNativeAndroidUI(response.data);
    }
  })
  .catch(error => {
    console.error('Async task error:', error);
    
    // Handle Android-specific error reporting
    if (Capacitor.getPlatform() === 'android') {
      this.reportToAndroidCrashlytics(error);
    }
  });

// Simulated native Android interactions
declare const androidBridge: any;

const updateNativeAndroidUI = (data: any) => {
  if (typeof androidBridge !== 'undefined') {
    androidBridge.updateUI(JSON.stringify(data));
  }
};

const reportToAndroidCrashlytics = (error: Error) => {
  if (typeof androidBridge !== 'undefined') {
    androidBridge.logError(error.message);
  }
};

// Additional utility for background async tasks
class AndroidBackgroundTask {
  static async executeInBackground<T>(
    task: () => Promise<T>,
    onProgress?: (progress: number) => void
  ): Promise<T> {
    if (Capacitor.getPlatform() === 'android') {
      console.log('Executing in Android background context');
    }

    // Simulate progress updates
    onProgress?.(0.3);
    
    const result = await task();
    
    onProgress?.(1.0);
    return result;
  }
}

// Example of background task execution
AndroidBackgroundTask.executeInBackground(
  () => service.fetchDataAsync('heavy-operation'),
  (progress) => {
    console.log(`Progress: ${progress * 100}%`);
    if (Capacitor.isNativePlatform()) {
      // Update Android progress bar
      androidBridge?.updateProgress(progress);
    }
  }
);
