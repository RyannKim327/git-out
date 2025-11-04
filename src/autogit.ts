// Simulated API service with async operations
class ApiService {
  // Simulate network request with timeout
  async connectToServer(url: string, timeout: number = 5000): Promise<string> {
    return new Promise((resolve, reject) => {
      console.log(`Attempting to connect to: ${url}`);
      
      // Simulate network latency
      const latency = Math.random() * 2000;
      
      setTimeout(() => {
        if (Math.random() > 0.2) { // 80% success rate
          resolve(`Connected successfully to ${url} (${latency}ms latency)`);
        } else {
          reject(new Error(`Connection failed to ${url}`));
        }
      }, latency);

      // Handle timeout
      setTimeout(() => {
        reject(new Error(`Connection timeout after ${timeout}ms`));
      }, timeout);
    });
  }

  // Example authenticated connection
  async connectWithAuth(
    url: string, 
    credentials: { username: string; password: string }
  ): Promise<string> {
    try {
      // Simulate auth token request
      const authResponse = await this.authenticate(credentials);
      
      // Connect with token
      const connectionResult = await this.connectToServer(
        `${url}?token=${authResponse.token}`
      );
      
      return `Authenticated connection: ${connectionResult}`;
    } catch (error) {
      throw new Error(`Auth connection failed: ${error.message}`);
    }
  }

  private async authenticate(
    credentials: { username: string; password: string }
  ): Promise<{ token: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ token: 'mock-jwt-token-' + Math.random().toString(36).substr(2) });
      }, 1000);
    });
  }
}

// Android-like connection manager
class AndroidConnectionManager {
  private apiService: ApiService;
  private isConnected: boolean = false;

  constructor() {
    this.apiService = new ApiService();
  }

  async establishConnection(): Promise<void> {
    try {
      console.log('Starting connection process...');
      
      const result = await this.apiService.connectToServer(
        'https://api.example.com/android-service'
      );
      
      this.isConnected = true;
      console.log('Connection established:', result);
      
    } catch (error) {
      this.isConnected = false;
      console.error('Connection error:', error.message);
      throw error;
    }
  }

  async connectWithRetry(
    maxAttempts: number = 3,
    delay: number = 1000
  ): Promise<void> {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        console.log(`Connection attempt ${attempt}/${maxAttempts}`);
        await this.establishConnection();
        return;
      } catch (error) {
        if (attempt === maxAttempts) throw error;
        
        console.log(`Retrying in ${delay}ms...`);
        await this.delay(delay);
      }
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getConnectionStatus(): { connected: boolean; timestamp: Date } {
    return {
      connected: this.isConnected,
      timestamp: new Date()
    };
  }
}

// Usage example
async function main() {
  const connectionManager = new AndroidConnectionManager();

  try {
    // Single connection attempt
    // await connectionManager.establishConnection();

    // With retry mechanism
    await connectionManager.connectWithRetry();
    
    // Check status
    const status = connectionManager.getConnectionStatus();
    console.log('Final status:', status);
    
  } catch (error) {
    console.error('Final connection failure:', error.message);
  }
}

// Android-style event emitter (optional)
class ConnectionEventEmitter {
  private listeners: Array<(event: string, data?: any) => void> = [];

  addListener(callback: (event: string, data?: any) => void): void {
    this.listeners.push(callback);
  }

  emit(event: string, data?: any): void {
    this.listeners.forEach(listener => listener(event, data));
  }
}

// Run the example
main().catch(console.error);

// Export for use in modules
export { ApiService, AndroidConnectionManager, ConnectionEventEmitter };
