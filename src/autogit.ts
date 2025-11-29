import { Capacitor } from '@capacitor/core';
import { AndroidAsyncTask } from './android-async-task'; // Custom interface

// Interface for the async task result
interface AsyncTaskResult {
  success: boolean;
  data?: any;
  error?: string;
}

// Custom interface for AndroidAsyncTask
export interface AndroidAsyncTask {
  executeAsyncOperation(
    params: any
  ): Promise<AsyncTaskResult>;
}

// Main service class that handles async operations
class AndroidAsyncService {
  private isAndroid: boolean;

  constructor() {
    this.isAndroid = Capacitor.getPlatform() === 'android';
  }

  /**
   * Simulates an async network operation
   */
  async fetchDataFromServer(url: string, timeoutMs: number = 5000): Promise<AsyncTaskResult> {
    if (!this.isAndroid) {
      return this.simulateAsyncOperation(url, timeoutMs);
    }

    try {
      // This would typically call a Capacitor plugin that handles Android AsyncTask
      const result = await (Capacitor as any).plugins.AndroidAsyncTask.execute({
        url,
        timeout: timeoutMs,
        operation: 'fetch'
      });

      return {
        success: true,
        data: result
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Simulates a background computation task
   */
  async performBackgroundComputation(
    data: any, 
    computationType: string
  ): Promise<AsyncTaskResult> {
    if (!this.isAndroid) {
      return this.simulateComputation(data, computationType);
    }

    try {
      const result = await (Capacitor as any).plugins.AndroidAsyncTask.execute({
        inputData: data,
        operation: computationType
      });

      return {
        success: true,
        data: result
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Fallback for non-Android platforms
   */
  private async simulateAsyncOperation(url: string, timeoutMs: number): Promise<AsyncTaskResult> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: { message: 'Simulated response from ' + url }
        });
      }, 2000); // Simulated delay
    });
  }

  private async simulateComputation(data: any, computationType: string): Promise<AsyncTaskResult> {
    return new Promise((resolve) => {
      // Simulate computation time
      setTimeout(() => {
        resolve({
          success: true,
          data: { 
            result: `Computed ${computationType} with data: ${JSON.stringify(data)}`,
            timestamp: Date.now()
          }
        });
      }, 1500);
    });
  }
}

// Usage example
export async function useAsyncTaskExample() {
  const asyncService = new AndroidAsyncService();

  try {
    // Example 1: Network request
    const networkResult = await asyncService.fetchDataFromServer(
      'https://api.example.com/data',
      8000
    );

    if (networkResult.success) {
      console.log('Network success:', networkResult.data);
    } else {
      console.error('Network error:', networkResult.error);
    }

    // Example 2: Background computation
    const computationResult = await asyncService.performBackgroundComputation(
      { numbers: [1, 2, 3, 4, 5] },
      'sum'
    );

    if (computationResult.success) {
      console.log('Computation result:', computationResult.data);
    } else {
      console.error('Computation error:', computationResult.error);
    }

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

// Utility function with error handling and retry mechanism
export async function executeWithRetry(
  asyncFunction: () => Promise<AsyncTaskResult>,
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<AsyncTaskResult> {
  let attempts = 0;

  while (attempts < maxRetries) {
    try {
      const result = await asyncFunction();
      
      if (result.success) {
        return result;
      }

      attempts++;
      if (attempts < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    } catch (error) {
      attempts++;
      if (attempts >= maxRetries) {
        return {
          success: false,
          error: `Failed after ${attempts} attempts: ${error.message}`
        };
      }
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }

  return {
    success: false,
    error: `All ${maxRetries} retry attempts failed`
  };
}

// Example of using the retry mechanism
export async function robustAsyncOperation() {
  const asyncService = new AndroidAsyncService();
  
  const result = await executeWithRetry(
    () => asyncService.fetchDataFromServer('https://api.example.com/data'),
    3,
    2000
  );

  return result;
}
npm install @capacitor/core @capacitor/cli
npx cap add android
// plugins/android-async-task/src/definitions.ts
export interface AndroidAsyncTaskPlugin {
  execute(options: { 
    url?: string;
    timeout?: number;
    operation: string;
    inputData?: any;
  }): Promise<any>;
}
// In your component or service
import { useAsyncTaskExample, robustAsyncOperation } from './android-async-service';

// Simple usage
useAsyncTaskExample();

// With retry mechanism
robustAsyncOperation().then(result => {
  console.log('Final result:', result);
});
