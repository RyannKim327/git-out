interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = 'https://jsonplaceholder.typicode.com') {
    this.baseUrl = baseUrl;
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      data,
      status: response.status,
      statusText: response.statusText
    };
  }

  async getUsers(): Promise<User[]> {
    try {
      const response = await fetch(`${this.baseUrl}/users`);
      const result = await this.handleResponse<User[]>(response);
      return result.data;
    } catch (error) {
      console.error('Failed to fetch users:', error);
      throw error;
    }
  }

  async getUserById(id: number): Promise<User> {
    try {
      const response = await fetch(`${this.baseUrl}/users/${id}`);
      const result = await this.handleResponse<User>(response);
      return result.data;
    } catch (error) {
      console.error(`Failed to fetch user ${id}:`, error);
      throw error;
    }
  }

  async createUser(userData: Partial<User>): Promise<User> {
    try {
      const response = await fetch(`${this.baseUrl}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await this.handleResponse<User>(response);
      return result.data;
    } catch (error) {
      console.error('Failed to create user:', error);
      throw error;
    }
  }
}

// Example usage
async function main() {
  const apiClient = new ApiClient();

  try {
    // Get all users
    const users = await apiClient.getUsers();
    console.log('All users:', users);

    // Get a specific user
    const user = await apiClient.getUserById(1);
    console.log('User 1:', user);

    // Create a new user
    const newUser = await apiClient.createUser({
      name: 'John Doe',
      email: 'john.doe@example.com',
      username: 'johndoe'
    });
    console.log('Created user:', newUser);
    
  } catch (error) {
    console.error('API operation failed:', error);
  }
}

// Run the example
main();
