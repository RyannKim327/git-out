import { Capacitor } from '@capacitor/core';
import { Network } from '@capacitor/network';

// Interface for API response
interface ApiResponse {
  data: any;
  status: number;
  message: string;
}

// Interface for user data
interface User {
  id: number;
  name: string;
  email: string;
}

class AndroidAsyncConnector {
  private baseUrl: string = 'https://jsonplaceholder.typicode.com';

  // Method to simulate async network connection
  async connectToApi(endpoint: string): Promise<ApiResponse> {
    try {
      console.log('Starting async connection...');
      
      // Check if running on Android
      if (Capacitor.getPlatform() === 'android') {
        console.log('Running on Android platform');
      }

      // Get network status
      const status = await Network.getStatus();
      console.log('Network status:', status);

      if (!status.connected) {
        throw new Error('No network connection available');
      }

      // Simulate network delay
      await this.simulateDelay(2000);

      // Make API call
      const response = await fetch(`${this.baseUrl}${endpoint}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return {
        data,
        status: response.status,
        message: 'Connection successful'
      };

    } catch (error) {
      console.error('Async connection failed:', error);
      throw error;
    }
  }

  // Async method to fetch users
  async fetchUsers(): Promise<User[]> {
    try {
      const response = await this.connectToApi('/users');
      return response.data as User[];
    } catch (error) {
      console.error('Failed to fetch users:', error);
      return [];
    }
  }

  // Async method to fetch specific user
  async fetchUserById(id: number): Promise<User | null> {
    try {
      const response = await this.connectToApi(`/users/${id}`);
      return response.data as User;
    } catch (error) {
      console.error(`Failed to fetch user ${id}:`, error);
      return null;
    }
  }

  // Utility method to simulate delay
  private simulateDelay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Method to handle multiple async operations
  async performMultipleOperations(): Promise<void> {
    try {
      console.log('Starting multiple async operations...');

      // Execute multiple async operations concurrently
      const [users, networkStatus] = await Promise.all([
        this.fetchUsers(),
        Network.getStatus()
      ]);

      console.log(`Fetched ${users.length} users`);
      console.log('Current network status:', networkStatus);

      // Process users sequentially
      for (const user of users.slice(0, 3)) {
        const userDetails = await this.fetchUserById(user.id);
        console.log(`User ${user.id}:`, userDetails?.name);
      }

    } catch (error) {
      console.error('Multiple operations failed:', error);
    }
  }
}

// Usage example
async function demonstrateAsyncConnector() {
  const connector = new AndroidAsyncConnector();

  try {
    // Single async operation
    const users = await connector.fetchUsers();
    console.log('Total users:', users.length);

    // Multiple async operations
    await connector.performMultipleOperations();

    // Error handling example
    await connector.connectToApi('/nonexistent-endpoint');
    
  } catch (error) {
    console.error('Demo failed:', error);
  }
}

// Alternative with RxJS for more advanced async handling
import { from, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

class ReactiveAndroidConnector {
  fetchUsersObservable(): Observable<User[]> {
    return from(fetch('https://jsonplaceholder.typicode.com/users')).pipe(
      map(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      }),
      catchError(error => {
        console.error('RxJS error:', error);
        return [];
      })
    );
  }
}

// Export for use in other files
export { AndroidAsyncConnector, ReactiveAndroidConnector, User, ApiResponse };
export default demonstrateAsyncConnector;
{
  "dependencies": {
    "@capacitor/core": "^5.0.0",
    "@capacitor/network": "^5.0.0",
    "rxjs": "^7.0.0"
  }
}
