// File: src/services/AndroidConnectionService.ts
import { Plugins } from '@capacitor/core';

const { Network } = Plugins;

export interface ConnectionResult {
  success: boolean;
  data?: any;
  error?: string;
  connectionType?: string;
}

export class AndroidConnectionService {
  
  // Simulate async API call with timeout
  async connectToApi(endpoint: string, timeoutMs: number = 5000): Promise<ConnectionResult> {
    try {
      // Check network status first
      const networkStatus = await Network.getStatus();
      
      if (!networkStatus.connected) {
        return {
          success: false,
          error: 'No network connection available'
        };
      }

      // Simulate API call with timeout
      const response = await this.executeWithTimeout(
        this.mockApiCall(endpoint),
        timeoutMs
      );

      return {
        success: true,
        data: response,
        connectionType: networkStatus.connectionType
      };

    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Connection failed'
      };
    }
  }

  private async mockApiCall(endpoint: string): Promise<any> {
    // Simulate network latency
    await this.delay(1000 + Math.random() * 2000);
    
    // Mock successful response
    return {
      endpoint,
      timestamp: Date.now(),
      data: { message: "Connected successfully", status: 200 }
    };
  }

  private async executeWithTimeout<T>(
    promise: Promise<T>,
    timeoutMs: number
  ): Promise<T> {
    return new Promise(async (resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error('Connection timeout'));
      }, timeoutMs);

      try {
        const result = await promise;
        clearTimeout(timeoutId);
        resolve(result);
      } catch (error) {
        clearTimeout(timeoutId);
        reject(error);
      }
    });
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Additional method for continuous connection monitoring
  async monitorConnection(): Promise<void> {
    Network.addListener('networkStatusChange', (status) => {
      console.log('Network status changed:', status);
      this.onConnectionChange(status.connected);
    });
  }

  private onConnectionChange(connected: boolean): void {
    console.log(`Connection status: ${connected ? 'Connected' : 'Disconnected'}`);
    // Handle connection state changes here
  }
}

// Usage example
export const useAndroidConnection = () => {
  const connectionService = new AndroidConnectionService();

  const performConnection = async (url: string) => {
    console.log('Attempting connection to:', url);
    
    const result = await connectionService.connectToApi(url);
    
    if (result.success) {
      console.log('Connection successful:', result.data);
      // Handle successful connection
    } else {
      console.error('Connection failed:', result.error);
      // Handle connection failure
    }
    
    return result;
  };

  return {
    performConnection,
    monitorConnection: connectionService.monitorConnection
  };
};

// Example component usage
import { useAndroidConnection } from './AndroidConnectionService';

const ConnectionExample = () => {
  const { performConnection, monitorConnection } = useAndroidConnection();

  const handleConnect = async () => {
    const result = await performConnection('https://api.example.com/data');
    
    // Update UI based on result
    if (result.success) {
      // Show success message
    } else {
      // Show error message
    }
  };

  // Start monitoring when component mounts
  React.useEffect(() => {
    monitorConnection();
  }, []);

  return (
    <button onClick={handleConnect}>
      Connect to Android Service
    </button>
  );
};
npm install @capacitor/core @capacitor/network
npx cap add android
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.INTERNET" />
npm run build
npx cap sync android
npx cap open android
