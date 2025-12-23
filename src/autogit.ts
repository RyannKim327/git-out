import { CapacitorHttp } from '@capacitor/core';

// Interface for API response
interface ApiResponse<T> {
  data: T;
  status: number;
  headers: Record<string, string>;
}

// Sample data model
interface User {
  id: number;
  name: string;
  email: string;
}

class AndroidAsyncService {
  
  // Method to simulate async data fetching with timeout
  async fetchUserDataWithDelay(userId: number): Promise<User> {
    return new Promise((resolve, reject) => {
      // Simulate network delay
      setTimeout(async () => {
        try {
          const user = await this.fetchUserData(userId);
          resolve(user);
        } catch (error) {
          reject(error);
        }
      }, 2000); // 2 second delay
    });
  }

  // Actual API call using Capacitor's HTTP plugin
  async fetchUserData(userId: number): Promise<User> {
    try {
      const response: ApiResponse<User> = await CapacitorHttp.get({
        url: `https://jsonplaceholder.typicode.com/users/${userId}`,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        throw new Error(`HTTP Error: ${response.status}`);
      }
    } catch (error) {
      console.error('API call failed:', error);
      throw new Error('Failed to fetch user data');
    }
  }

  // Method to handle multiple async operations
  async fetchMultipleUsers(userIds: number[]): Promise<User[]> {
    try {
      // Create array of promises
      const userPromises = userIds.map(id => this.fetchUserData(id));
      
      // Execute all promises concurrently
      const users = await Promise.all(userPromises);
      return users;
    } catch (error) {
      console.error('Failed to fetch multiple users:', error);
      throw error;
    }
  }

  // Method with error handling and retry logic
  async fetchWithRetry(
    url: string, 
    maxRetries: number = 3, 
    retryDelay: number = 1000
  ): Promise<any> {
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await CapacitorHttp.get({ url });
        return response.data;
      } catch (error) {
        lastError = error as Error;
        console.warn(`Attempt ${attempt} failed:`, error);
        
        if (attempt < maxRetries) {
          await this.delay(retryDelay * attempt); // Exponential backoff
        }
      }
    }
    
    throw lastError || new Error('All retry attempts failed');
  }

  // Utility method for delay
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Usage example
async function demonstrateAsyncTasks() {
  const service = new AndroidAsyncService();

  try {
    // Single async call
    console.log('Fetching user data...');
    const user = await service.fetchUserDataWithDelay(1);
    console.log('User fetched:', user);

    // Multiple concurrent async calls
    console.log('Fetching multiple users...');
    const users = await service.fetchMultipleUsers([2, 3, 4]);
    console.log('Multiple users fetched:', users);

    // With retry logic
    const data = await service.fetchWithRetry(
      'https://api.example.com/data',
      3,
      1000
    );
    console.log('Data with retry:', data);

  } catch (error) {
    console.error('Async operation failed:', error);
    // Handle error in Android context (show toast, update UI, etc.)
  }
}

// Export for use in Android WebView or Capacitor app
export { AndroidAsyncService, demonstrateAsyncTasks };
npm install @capacitor/core @capacitor/android
npx cap add android
<uses-permission android:name="android.permission.INTERNET" />
// In your Android Activity or Fragment
webView.evaluateJavascript("demonstrateAsyncTasks()") { result ->
    // Handle JavaScript result
}
