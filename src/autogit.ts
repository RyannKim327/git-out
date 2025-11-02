import axios, { AxiosResponse, AxiosError } from 'axios';

// Define interfaces for our data types
interface User {
  id: number;
  name: string;
  email: string;
  website?: string;
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

class ApiService {
  private baseURL: string = 'https://jsonplaceholder.typicode.com';

  // Fetch a user by ID
  async getUser(id: number): Promise<User> {
    try {
      const response: AxiosResponse<User> = await axios.get(
        `${this.baseURL}/users/${id}`
      );
      console.log(`User ${id}:`, response.data);
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }

  // Fetch all users
  async getAllUsers(): Promise<User[]> {
    try {
      const response: AxiosResponse<User[]> = await axios.get(
        `${this.baseURL}/users`
      );
      console.log(`Found ${response.data.length} users`);
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }

  // Fetch posts for a specific user
  async getUserPosts(userId: number): Promise<Post[]> {
    try {
      const response: AxiosResponse<Post[]> = await axios.get(
        `${this.baseURL}/posts`,
        {
          params: { userId }
        }
      );
      console.log(`Found ${response.data.length} posts for user ${userId}`);
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }

  // Create a new post
  async createPost(postData: Omit<Post, 'id'>): Promise<Post> {
    try {
      const response: AxiosResponse<Post> = await axios.post(
        `${this.baseURL}/posts`,
        postData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Post created:', response.data);
      return response.data;
    } catch (error) {
      this.handleError(error as AxiosError);
      throw error;
    }
  }

  // Error handler
  private handleError(error: AxiosError): void {
    if (error.response) {
      // Server responded with an error status
      console.error('Server Error:', {
        status: error.response.status,
        data: error.response.data
      });
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network Error:', error.message);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
  }
}

// Usage example
async function demonstrateApiCalls() {
  const apiService = new ApiService();

  try {
    // Get a specific user
    const user = await apiService.getUser(1);
    
    // Get all users
    const allUsers = await apiService.getAllUsers();
    
    // Get posts for user 1
    const userPosts = await apiService.getUserPosts(1);
    
    // Create a new post
    const newPost = await apiService.createPost({
      userId: 1,
      title: 'My New Post',
      body: 'This is the content of my new post.'
    });

  } catch (error) {
    console.error('Demo failed:', error);
  }
}

// Alternative: Using axios with custom configuration
const customAxios = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add interceptors for request/response handling
customAxios.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

customAxios.interceptors.response.use(
  (response) => {
    console.log(`Received response with status ${response.status}`);
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Export for use in other modules
export { ApiService, User, Post };
export default customAxios;
npm install axios typescript @types/node
{
  "dependencies": {
    "axios": "^1.0.0",
    "typescript": "^4.0.0"
  },
  "devDependencies": {
    "@types/node": "^18.0.0"
  }
}
