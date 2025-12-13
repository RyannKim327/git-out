// AndroidNetworkService.ts
import { Capacitor } from '@capacitor/core';
import { Network } from '@capacitor/network';

interface ApiResponse {
  data: any;
  status: number;
  message: string;
}

class AndroidAsyncService {
  private baseUrl: string = 'https://jsonplaceholder.typicode.com';
  private isAndroid: boolean;

  constructor() {
    this.isAndroid = Capacitor.getPlatform() === 'android';
  }

  // Async task to fetch data with network status check
  async fetchDataWithRetry(endpoint: string, retries: number = 3): Promise<ApiResponse> {
    try {
      // Check network connectivity first
      const networkStatus = await Network.getStatus();
      
      if (!networkStatus.connected) {
        throw new Error('No network connection available');
      }

      console.log(`📱 Running on ${this.isAndroid ? 'Android' : 'Other platform'}`);
      
      // Simulate async API call
      const response = await this.executeAsyncApiCall(endpoint, retries);
      
      return {
        data: response,
        status: 200,
        message: 'Success'
      };
    } catch (error) {
      console.error('Async task failed:', error);
      throw error;
    }
  }

  private async executeAsyncApiCall(endpoint: string, retries: number): Promise<any> {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        console.log(`🔄 Attempt ${attempt} to fetch from ${endpoint}`);
        
        const response = await fetch(`${this.baseUrl}${endpoint}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
      } catch (error) {
        if (attempt === retries) {
          throw new Error(`Failed after ${retries} attempts: ${error}`);
        }
        
        // Wait before retry (exponential backoff)
        await this.delay(Math.pow(2, attempt) * 1000);
      }
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Async task for background processing
  async processDataInBackground(data: any[]): Promise<any[]> {
    return new Promise((resolve) => {
      // Simulate background processing
      setTimeout(() => {
        const processedData = data.map(item => ({
          ...item,
          processed: true,
          timestamp: new Date().toISOString(),
          platform: this.isAndroid ? 'android' : 'other'
        }));
        
        console.log('✅ Background processing completed');
        resolve(processedData);
      }, 2000);
    });
  }

  // Android-specific async storage example
  async saveToAndroidStorage(key: string, value: any): Promise<void> {
    if (this.isAndroid) {
      // Using Capacitor Preferences for Android storage
      const { Preferences } = await import('@capacitor/preferences');
      await Preferences.set({
        key: key,
        value: JSON.stringify(value)
      });
      console.log(`💾 Saved data to Android storage with key: ${key}`);
    }
  }
}

// Usage example
async function demonstrateAsyncTasks() {
  const androidService = new AndroidAsyncService();

  try {
    // Example 1: Async API call with retry
    console.log('🚀 Starting async API call...');
    const apiResult = await androidService.fetchDataWithRetry('/posts/1');
    console.log('API Result:', apiResult);

    // Example 2: Background processing
    console.log('🔄 Starting background processing...');
    const sampleData = [{ id: 1, name: 'Test' }, { id: 2, name: 'Example' }];
    const processedData = await androidService.processDataInBackground(sampleData);
    console.log('Processed Data:', processedData);

    // Example 3: Android storage
    console.log('💾 Saving to Android storage...');
    await androidService.saveToAndroidStorage('userData', processedData);

  } catch (error) {
    console.error('❌ Async tasks failed:', error);
  }
}

// Export for use in Android app
export { AndroidAsyncService, demonstrateAsyncTasks };
// AsyncAndroidComponent.tsx
import React, { useState, useEffect } from 'react';
import { AndroidAsyncService } from './AndroidNetworkService';

const AsyncAndroidComponent: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const androidService = new AndroidAsyncService();

  const loadDataAsync = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await androidService.fetchDataWithRetry('/todos/1');
      setData(result.data);
      
      // Process data in background
      const processed = await androidService.processDataInBackground([result.data]);
      setData(processed[0]);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDataAsync();
  }, []);

  if (loading) return <div>🔃 Loading async data from Android...</div>;
  if (error) return <div>❌ Error: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>📱 Android Async Task Demo</h2>
      <button onClick={loadDataAsync} disabled={loading}>
        {loading ? 'Loading...' : 'Refresh Data'}
      </button>
      
      {data && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <h3>Async Task Result:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default AsyncAndroidComponent;
