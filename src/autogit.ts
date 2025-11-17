import { Capacitor } from '@capacitor/core';
import { AndroidService } from '@capacitor/android';

// Define interface for the Android service response
interface AndroidResponse {
  success: boolean;
  data?: any;
  error?: string;
}

// Async function to connect to Android service
async function connectToAndroidService(): Promise<AndroidResponse> {
  try {
    // Check if running on Android
    if (Capacitor.getPlatform() !== 'android') {
      throw new Error('This feature is only available on Android');
    }

    // Execute Android-specific async task
    const result = await AndroidService.executeAsyncTask({
      action: 'CONNECT_TO_SERVICE',
      parameters: {
        serviceName: 'MyBackgroundService',
        timeout: 5000
      }
    });

    return {
      success: true,
      data: result
    };
  } catch (error) {
    console.error('Android service connection failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Example usage with error handling
async function performAndroidOperation() {
  const response = await connectToAndroidService();
  
  if (response.success) {
    console.log('Android service connected successfully:', response.data);
    // Proceed with Android-specific operations
  } else {
    console.error('Failed to connect:', response.error);
    // Fallback to web implementation
  }
}

// Additional utility functions
class AndroidConnector {
  private isConnected = false;

  async initialize(): Promise<void> {
    try {
      const result = await connectToAndroidService();
      this.isConnected = result.success;
      
      if (this.isConnected) {
        this.setupListeners();
      }
    } catch (error) {
      this.isConnected = false;
    }
  }

  private setupListeners(): void {
    // Setup Android event listeners
    AndroidService.addListener('serviceEvent', (data: any) => {
      console.log('Received event from Android service:', data);
    });
  }

  async sendDataToAndroid(payload: any): Promise<void> {
    if (!this.isConnected) {
      throw new Error('Not connected to Android service');
    }

    await AndroidService.sendData({
      payload: JSON.stringify(payload)
    });
  }
}

// Create and use the connector
const androidConnector = new AndroidConnector();

// Initialize connection
androidConnector.initialize().then(() => {
  console.log('Android connector initialized');
});

// Example data sending
async function sendUserData(userData: { id: string; name: string }) {
  try {
    await androidConnector.sendDataToAndroid(userData);
    console.log('Data sent successfully to Android');
  } catch (error) {
    console.error('Failed to send data:', error);
  }
}

// Mock Android service for development/testing
const mockAndroidService = {
  executeAsyncTask: async (options: any): Promise<any> => {
    // Simulate async delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      status: 'SUCCESS',
      message: 'Connected to mock Android service',
      timestamp: Date.now()
    };
  }
};

// Export for use in other modules
export {
  connectToAndroidService,
  AndroidConnector,
  sendUserData,
  mockAndroidService
};
