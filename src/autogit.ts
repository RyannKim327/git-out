import { NativeModules } from 'react-native';

// Define the interface for Android native module
interface AndroidAsyncTask {
  fetchDataFromAPI(url: string): Promise<string>;
  processDataInBackground(data: any): Promise<any>;
  connectToCustomService(config: ConnectionConfig): Promise<ConnectionResult>;
}

// Define configuration and result types
interface ConnectionConfig {
  host: string;
  port: number;
  timeout?: number;
  credentials?: {
    username: string;
    password: string;
  };
}

interface ConnectionResult {
  success: boolean;
  data?: any;
  error?: string;
  statusCode?: number;
}

// Get the native module
const { AndroidAsyncModule } = NativeModules as {
  AndroidAsyncModule: AndroidAsyncTask;
};

// Async function to connect and process data
class AndroidAsyncConnector {
  
  // Method to fetch data from API
  async fetchData(url: string): Promise<any> {
    try {
      console.log('Starting async data fetch...');
      
      // Call native Android async task
      const result = await AndroidAsyncModule.fetchDataFromAPI(url);
      
      // Parse JSON response
      const parsedData = JSON.parse(result);
      console.log('Data fetched successfully:', parsedData);
      
      return parsedData;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw new Error(`Failed to fetch data: ${error.message}`);
    }
  }

  // Method to process data in background
  async processData(data: any): Promise<any> {
    try {
      console.log('Processing data in background...');
      
      // Call native Android background processing
      const processedData = await AndroidAsyncModule.processDataInBackground(data);
      
      console.log('Data processed successfully');
      return processedData;
    } catch (error) {
      console.error('Error processing data:', error);
      throw new Error(`Processing failed: ${error.message}`);
    }
  }

  // Method to connect to custom service
  async connectToService(config: ConnectionConfig): Promise<ConnectionResult> {
    try {
      console.log('Attempting connection to service...');
      
      // Set default timeout if not provided
      const connectionConfig: ConnectionConfig = {
        ...config,
        timeout: config.timeout || 30000
      };

      // Execute async connection task
      const result = await AndroidAsyncModule.connectToCustomService(connectionConfig);
      
      if (result.success) {
        console.log('Connection successful');
        return result;
      } else {
        throw new Error(result.error || 'Connection failed');
      }
    } catch (error) {
      console.error('Connection error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Example usage with error handling
  async executeNetworkOperation() {
    const config: ConnectionConfig = {
      host: 'api.example.com',
      port: 443,
      timeout: 15000,
      credentials: {
        username: 'user',
        password: 'pass'
      }
    };

    try {
      // Step 1: Connect to service
      const connection = await this.connectToService(config);
      
      if (!connection.success) {
        throw new Error('Service connection failed');
      }

      // Step 2: Fetch data
      const data = await this.fetchData('https://api.example.com/data');
      
      // Step 3: Process data
      const processedData = await this.processData(data);
      
      console.log('Operation completed successfully');
      return processedData;
      
    } catch (error) {
      console.error('Operation failed:', error);
      // Handle error appropriately
      throw error;
    }
  }
}

// Utility function with retry mechanism
async function executeWithRetry<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (attempt === maxRetries) throw error;
      
      console.log(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error('All retry attempts failed');
}

// Example usage
const connector = new AndroidAsyncConnector();

// Execute with retry mechanism
executeWithRetry(() => connector.executeNetworkOperation(), 3, 2000)
  .then(result => {
    console.log('Final result:', result);
  })
  .catch(error => {
    console.error('Final error:', error);
  });

// Export for use in other components
export default AndroidAsyncConnector;
// AndroidAsyncModule.java
package com.yourApp;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableMap;

public class AndroidAsyncModule extends ReactContextBaseJavaModule {
    
    public AndroidAsyncModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "AndroidAsyncModule";
    }

    @ReactMethod
    public void fetchDataFromAPI(String url, Promise promise) {
        new Thread(() -> {
            try {
                // Implement your HTTP request here
                String response = makeHttpRequest(url);
                promise.resolve(response);
            } catch (Exception e) {
                promise.reject("NETWORK_ERROR", e.getMessage());
            }
        }).start();
    }

    @ReactMethod
    public void processDataInBackground(ReadableMap data, Promise promise) {
        new Thread(() -> {
            try {
                // Process data asynchronously
                Object result = processData(data.toHashMap());
                promise.resolve(result);
            } catch (Exception e) {
                promise.reject("PROCESSING_ERROR", e.getMessage());
            }
        }).start();
    }

    @ReactMethod
    public void connectToCustomService(ReadableMap config, Promise promise) {
        new Thread(() -> {
            try {
                // Implement your custom connection logic
                WritableMap result = Arguments.createMap();
                result.putBoolean("success", true);
                result.putString("data", "Connected successfully");
                promise.resolve(result);
            } catch (Exception e) {
                WritableMap errorResult = Arguments.createMap();
                errorResult.putBoolean("success", false);
                errorResult.putString("error", e.getMessage());
                promise.resolve(errorResult);
            }
        }).start();
    }

    private String makeHttpRequest(String url) throws IOException {
        // Implementation of HTTP request
        return "Response data";
    }

    private Object processData(Map<String, Object> data) {
        // Data processing logic
        return processedData;
    }
}
