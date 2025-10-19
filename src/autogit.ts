interface ApiResponse {
  id: number;
  status: string;
  data?: any;
  error?: string;
}

interface ConnectionConfig {
  timeout: number;
  retryAttempts: number;
  baseUrl: string;
}

class AndroidConnector {
  private config: ConnectionConfig;
  private isConnected: boolean = false;

  constructor(config: Partial<ConnectionConfig> = {}) {
    this.config = {
      timeout: 10000,
      retryAttempts: 3,
      baseUrl: 'http://localhost:8080/api',
      ...config
    };
  }

  /**
   * Establishes connection to Android service with retry logic
   */
  public async connectAsync(): Promise<ApiResponse> {
    console.log('🔄 Initiating Android connection...');
    
    try {
      // Simulate initial connection setup
      await this.performInitialHandshake();
      
      // Main connection task with retry mechanism
      const connectionResult = await this.attemptConnectionWithRetry();
      
      if (connectionResult.success) {
        this.isConnected = true;
        console.log('✅ Successfully connected to Android service');
        return {
          id: Date.now(),
          status: 'connected',
          data: connectionResult.data
        };
      } else {
        throw new Error(connectionResult.error || 'Connection failed after all retries');
      }
      
    } catch (error) {
      console.error('❌ Connection error:', error);
      this.isConnected = false;
      
      return {
        id: Date.now(),
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown connection error'
      };
    }
  }

  /**
   * Performs initial handshake with Android service
   */
  private async performInitialHandshake(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Simulate network delay
      setTimeout(() => {
        const success = Math.random() > 0.1; // 90% success rate
        if (success) {
          console.log('🤝 Handshake completed');
          resolve();
        } else {
          reject(new Error('Handshake failed - Android service unavailable'));
        }
      }, 500);
    });
  }

  /**
   * Attempts connection with exponential backoff retry
   */
  private async attemptConnectionWithRetry(
    attempt: number = 1
  ): Promise<{ success: boolean; data?: any; error?: string }> {
    const maxAttempts = this.config.retryAttempts;
    
    try {
      console.log(`⚡ Connection attempt ${attempt}/${maxAttempts}`);
      
      // Simulate actual Android service connection
      const result = await this.executeAndroidServiceCall(attempt);
      
      if (result.success) {
        return { success: true, data: result.data };
      }
      
      // If not last attempt, wait and retry
      if (attempt < maxAttempts) {
        const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
        console.log(`⏳ Retrying in ${delay}ms...`);
        
        await this.sleep(delay);
        return this.attemptConnectionWithRetry(attempt + 1);
      }
      
      return { success: false, error: 'Max retries exceeded' };
      
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Retry attempt failed' 
      };
    }
  }

  /**
   * Simulates actual call to Android service
   */
  private async executeAndroidServiceCall(attempt: number): Promise<{ success: boolean; data?: any }> {
    return new Promise((resolve) => {
      // Simulate variable response time and occasional failures
      const responseTime = 800 + Math.random() * 1200;
      const successChance = 0.85 - (attempt * 0.05); // Slightly lower success on retries
      
      setTimeout(() => {
        if (Math.random() < successChance) {
          // Simulate successful Android service response
          const mockData = {
            deviceId: `android_${Math.random().toString(36).substr(2, 9)}`,
            batteryLevel: Math.floor(Math.random() * 100),
            connectionType: 'wifi',
            timestamp: new Date().toISOString(),
            appVersion: '2.1.3'
          };
          
          console.log('📱 Android service response:', mockData);
          resolve({ success: true, data: mockData });
        } else {
          // Simulate specific Android errors
          const errors = [
            'Device is sleeping',
            'Network connectivity lost',
            'Service temporarily unavailable',
            'Permission denied',
            'Battery optimization blocking'
          ];
          
          const error = errors[Math.floor(Math.random() * errors.length)];
          console.log(`📱 Android error: ${error}`);
          resolve({ success: false });
        }
      }, responseTime);
    });
  }

  /**
   * Gracefully disconnect from Android service
   */
  public async disconnectAsync(): Promise<ApiResponse> {
    if (!this.isConnected) {
      return {
        id: Date.now(),
        status: 'already_disconnected'
      };
    }

    try {
      console.log('🔌 Disconnecting from Android service...');
      
      // Simulate cleanup
      await this.sleep(300);
      
      this.isConnected = false;
      console.log('✅ Disconnected successfully');
      
      return {
        id: Date.now(),
        status: 'disconnected'
      };
      
    } catch (error) {
      console.error('❌ Disconnect error:', error);
      return {
        id: Date.now(),
        status: 'disconnect_error',
        error: error instanceof Error ? error.message : 'Disconnect failed'
      };
    }
  }

  /**
   * Utility method for delays
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Check current connection status
   */
  public getConnectionStatus(): boolean {
    return this.isConnected;
  }

  /**
   * Send a test command to connected Android device
   */
  public async sendTestCommand(command: string): Promise<ApiResponse> {
    if (!this.isConnected) {
      return {
        id: Date.now(),
        status: 'not_connected',
        error: 'No active connection to Android service'
      };
    }

    try {
      console.log(`📤 Sending test command: ${command}`);
      
      const result = await this.executeCommand(command);
      
      return {
        id: Date.now(),
        status: 'command_sent',
        data: result
      };
      
    } catch (error) {
      return {
        id: Date.now(),
        status: 'command_error',
        error: error instanceof Error ? error.message : 'Command execution failed'
      };
    }
  }

  private async executeCommand(command: string): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate command execution with random success
        if (Math.random() > 0.2) {
          resolve({
            command,
            executed: true,
            result: `Command "${command}" executed successfully on Android device`,
            timestamp: new Date().toISOString()
          });
        } else {
          throw new Error(`Command "${command}" failed - device response timeout`);
        }
      }, 600 + Math.random() * 400);
    });
  }
}

// Usage example
async function demoAndroidConnection() {
  const connector = new AndroidConnector({
    timeout: 15000,
    retryAttempts: 4,
    baseUrl: 'http://192.168.1.100:8080/api' // Example Android device IP
  });

  try {
    // Connect to Android service
    const connectResult = await connector.connectAsync();
    console.log('Connection result:', connectResult);

    if (connectResult.status === 'connected') {
      // Send a test command
      const commandResult = await connector.sendTestCommand('vibrate');
      console.log('Command result:', commandResult);

      // Wait a bit, then disconnect
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const disconnectResult = await connector.disconnectAsync();
      console.log('Disconnect result:', disconnectResult);
    }

  } catch (error) {
    console.error('Demo failed:', error);
  }
}

// Run the demo
// demoAndroidConnection();

// Alternative: Promise-based wrapper for older code
function connectToAndroidService(
  config?: Partial<ConnectionConfig>
): Promise<ApiResponse> {
  const connector = new AndroidConnector(config);
  return connector.connectAsync();
}

// Export for use in other modules
export { AndroidConnector, connectToAndroidService, ApiResponse, ConnectionConfig };
export default AndroidConnector;
