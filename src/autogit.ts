import { CapacitorHttp } from '@capacitor/core';

interface ApiResponse {
  data: any;
  status: number;
}

class AndroidAsyncService {
  private baseUrl: string = 'https://jsonplaceholder.typicode.com';

  // Method to simulate async data fetching
  async fetchUserData(userId: number): Promise<ApiResponse> {
    try {
      const options = {
        url: `${this.baseUrl}/users/${userId}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        connectTimeout: 10000, // 10 seconds
        readTimeout: 10000,
      };

      // Using Capacitor's HTTP plugin for native Android async calls
      const response = await CapacitorHttp.request(options);

      return {
        data: response.data,
        status: response.status
      };
    } catch (error: any) {
      console.error('Async task failed:', error);
      throw new Error(`Network request failed: ${error.message}`);
    }
  }

  // Method to post data asynchronously
  async postUserData(userData: any): Promise<ApiResponse> {
    try {
      const options = {
        url: `${this.baseUrl}/users`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(userData),
        connectTimeout: 15000,
      };

      const response = await CapacitorHttp.request(options);

      return {
        data: response.data,
        status: response.status
      };
    } catch (error: any) {
      console.error('Async POST task failed:', error);
      throw new Error(`POST request failed: ${error.message}`);
    }
  }
}

// Usage example
const androidService = new AndroidAsyncService();

// Example of using the async method
const fetchData = async (): Promise<void> => {
  try {
    console.log('Starting async task...');
    
    // Simulate async operation with delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userData = await androidService.fetchUserData(1);
    console.log('Async task completed:', userData);
    
    // Process the data
    processResponse(userData.data);
  } catch (error) {
    console.error('Error in async task:', error);
  }
};

const processResponse = (data: any): void => {
  console.log('Processing response:', {
    id: data.id,
    name: data.name,
    email: data.email
  });
};

// Execute with error handling
fetchData().catch(console.error);

// Alternative usage with Promise chaining
androidService.fetchUserData(2)
  .then(response => {
    console.log('User 2 data:', response.data);
  })
  .catch(error => {
    console.error('Failed to fetch user 2:', error);
  });

// Example of parallel async tasks
const fetchMultipleUsers = async (userIds: number[]): Promise<void> => {
  try {
    const promises = userIds.map(id => 
      androidService.fetchUserData(id)
    );
    
    const results = await Promise.all(promises);
    console.log('Parallel async tasks completed:', results);
  } catch (error) {
    console.error('Parallel tasks failed:', error);
  }
};

// Execute parallel requests
fetchMultipleUsers([3, 4, 5]);
npm install @capacitor/core @capacitor/android
npx cap add android
npm install @capacitor/http
npx cap sync
<uses-permission android:name="android.permission.INTERNET" />
