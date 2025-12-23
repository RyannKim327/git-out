import axios, { AxiosResponse } from 'axios';

// Interface for user data structure
interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

// Interface for API response
interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = 'https://jsonplaceholder.typicode.com') {
    this.baseURL = baseURL;
  }

  // GET request example
  async getUsers(): Promise<User[]> {
    try {
      const response: AxiosResponse<User[]> = await axios.get(
        `${this.baseURL}/users`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.message);
        throw new Error(`Failed to fetch users: ${error.message}`);
      }
      throw error;
    }
  }

  // GET request with query parameters
  async getUserById(id: number): Promise<User> {
    try {
      const response: AxiosResponse<User> = await axios.get(
        `${this.baseURL}/users/${id}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error fetching user:', error.message);
        throw new Error(`User with ID ${id} not found`);
      }
      throw error;
    }
  }

  // POST request example
  async createUser(userData: Partial<User>): Promise<User> {
    try {
      const response: AxiosResponse<User> = await axios.post(
        `${this.baseURL}/users`,
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error creating user:', error.message);
        throw new Error('Failed to create user');
      }
      throw error;
    }
  }

  // PUT request example
  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    try {
      const response: AxiosResponse<User> = await axios.put(
        `${this.baseURL}/users/${id}`,
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error updating user:', error.message);
        throw new Error(`Failed to update user with ID ${id}`);
      }
      throw error;
    }
  }

  // DELETE request example
  async deleteUser(id: number): Promise<void> {
    try {
      await axios.delete(`${this.baseURL}/users/${id}`);
      console.log(`User with ID ${id} deleted successfully`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error deleting user:', error.message);
        throw new Error(`Failed to delete user with ID ${id}`);
      }
      throw error;
    }
  }
}

// Usage example
async function demonstrateApiCalls() {
  const apiClient = new ApiClient();

  try {
    // Get all users
    console.log('Fetching all users...');
    const users = await apiClient.getUsers();
    console.log('Users:', users.slice(0, 3)); // Show first 3 users

    // Get specific user
    console.log('\nFetching user with ID 1...');
    const user = await apiClient.getUserById(1);
    console.log('User:', user);

    // Create new user
    console.log('\nCreating new user...');
    const newUser = await apiClient.createUser({
      name: 'John Doe',
      email: 'john.doe@example.com',
      username: 'johndoe',
    });
    console.log('Created user:', newUser);

    // Update user
    console.log('\nUpdating user...');
    const updatedUser = await apiClient.updateUser(1, {
      name: 'Updated Name',
    });
    console.log('Updated user:', updatedUser);

    // Delete user (commented out to avoid actual deletion in example)
    // await apiClient.deleteUser(1);

  } catch (error) {
    console.error('Error in API demonstration:', error);
  }
}

// Run the demonstration
demonstrateApiCalls();

// Additional utility function with different axios configuration
async function fetchWithTimeout(url: string, timeout: number = 5000) {
  try {
    const response = await axios.get(url, {
      timeout,
      headers: {
        'User-Agent': 'TypeScript-Axios-Client/1.0',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout');
      }
      throw new Error(`HTTP error: ${error.response?.status}`);
    }
    throw error;
  }
}

// Example of using the timeout function
fetchWithTimeout('https://jsonplaceholder.typicode.com/posts/1')
  .then(data => console.log('Fetched data with timeout:', data))
  .catch(error => console.error('Timeout error:', error));
npm install axios
npm install -D typescript @types/node ts-node
