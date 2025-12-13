import axios, { AxiosResponse, AxiosError } from 'axios';

// Define interfaces for our data models
interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface CreateUserRequest {
  name: string;
  email: string;
  username: string;
}

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

class ApiService {
  // GET request with typed response
  async getUsers(): Promise<User[]> {
    try {
      const response: AxiosResponse<User[]> = await apiClient.get('/users');
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }

  // GET request with query parameters
  async getUserPosts(userId: number): Promise<Post[]> {
    try {
      const response: AxiosResponse<Post[]> = await apiClient.get('/posts', {
        params: { userId }
      });
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }

  // POST request with typed request body
  async createUser(userData: CreateUserRequest): Promise<User> {
    try {
      const response: AxiosResponse<User> = await apiClient.post('/users', userData);
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }

  // PUT request example
  async updateUser(userId: number, userData: Partial<User>): Promise<User> {
    try {
      const response: AxiosResponse<User> = await apiClient.put(`/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }

  // DELETE request example
  async deleteUser(userId: number): Promise<void> {
    try {
      await apiClient.delete(`/users/${userId}`);
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }

  // Error handling utility
  private handleError(error: AxiosError): void {
    if (error.response) {
      // Server responded with error status
      console.error('Response error:', {
        status: error.response.status,
        data: error.response.data,
      });
    } else if (error.request) {
      // Request was made but no response received
      console.error('Request error:', error.request);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
  }
}

// Usage example
async function demonstrateApiUsage() {
  const apiService = new ApiService();

  try {
    // Get all users
    const users = await apiService.getUsers();
    console.log('Users:', users.slice(0, 3)); // Show first 3 users

    // Get posts for first user
    if (users.length > 0) {
      const posts = await apiService.getUserPosts(users[0].id);
      console.log(`Posts for user ${users[0].name}:`, posts.slice(0, 2));
    }

    // Create a new user
    const newUser = await apiService.createUser({
      name: 'John Doe',
      email: 'john.doe@example.com',
      username: 'johndoe',
    });
    console.log('Created user:', newUser);

  } catch (error) {
    console.error('API demonstration failed:', error);
  }
}

// Run the demonstration
demonstrateApiUsage().catch(console.error);

// Example of using axios directly with interceptors
apiClient.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    // You could add auth tokens here
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    console.log(`Received response with status: ${response.status}`);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
npm install axios
npm install -D typescript @types/node ts-node
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
