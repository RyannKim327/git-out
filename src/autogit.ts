// types.ts - Type definitions for our API responses
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    city: string;
    zipcode: string;
  };
  phone: string;
  website: string;
  company: {
    name: string;
  };
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// api-client.ts - HTTP client with error handling
export class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = 'https://jsonplaceholder.typicode.com') {
    this.baseURL = baseURL;
  }

  async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw new Error(`Failed to fetch data from ${endpoint}`);
    }
  }

  // Specific API methods
  async getUsers(): Promise<User[]> {
    return this.request<User[]>('/users');
  }

  async getUserById(id: number): Promise<User> {
    return this.request<User>(`/users/${id}`);
  }

  async getUserPosts(userId: number): Promise<Post[]> {
    return this.request<Post[]>(`/posts?userId=${userId}`);
  }

  async createPost(post: Omit<Post, 'id'>): Promise<Post> {
    return this.request<Post>('/posts', {
      method: 'POST',
      body: JSON.stringify(post),
    });
  }
}

// user-service.ts - Business logic layer
export class UserService {
  private apiClient: ApiClient;

  constructor(apiClient?: ApiClient) {
    this.apiClient = apiClient || new ApiClient();
  }

  async getUsersWithPosts(): Promise<(User & { posts: Post[] })[]> {
    const users = await this.apiClient.getUsers();
    
    const usersWithPosts = await Promise.all(
      users.map(async (user) => {
        const posts = await this.apiClient.getUserPosts(user.id);
        return { ...user, posts };
      })
    );

    return usersWithPosts;
  }

  async getUserProfile(id: number): Promise<User & { posts: Post[] }> {
    const [user, posts] = await Promise.all([
      this.apiClient.getUserById(id),
      this.apiClient.getUserPosts(id),
    ]);

    return { ...user, posts };
  }
}

// main.ts - Usage example
async function main() {
  const apiClient = new ApiClient();
  const userService = new UserService(apiClient);

  try {
    console.log('Fetching all users with their posts...');
    const usersWithPosts = await userService.getUsersWithPosts();
    
    console.log(`Found ${usersWithPosts.length} users`);
    
    usersWithPosts.forEach(user => {
      console.log(`\nUser: ${user.name} (${user.email})`);
      console.log(`Posts: ${user.posts.length}`);
      console.log(`Company: ${user.company.name}`);
      console.log('---');
    });

    // Get specific user profile
    console.log('\nFetching specific user profile...');
    const userProfile = await userService.getUserProfile(1);
    console.log(`User ${userProfile.name} has ${userProfile.posts.length} posts`);
    
    // Create a new post
    console.log('\nCreating a new post...');
    const newPost = await apiClient.createPost({
      userId: 1,
      title: 'TypeScript API Example',
      body: 'This post was created using TypeScript and fetch API!',
    });
    console.log(`Created post with ID: ${newPost.id}`);

  } catch (error) {
    console.error('Error in main execution:', error);
  }
}

// Run the example
main().catch(console.error);

// Alternative: Using axios (uncomment if you prefer axios)
/*
import axios from 'axios';

export class AxiosApiClient {
  private client;

  constructor(baseURL: string = 'https://jsonplaceholder.typicode.com') {
    this.client = axios.create({
      baseURL,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await this.client.get<T>(endpoint);
    return response.data;
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await this.client.post<T>(endpoint, data);
    return response.data;
  }
}
*/

// package.json dependencies needed:
/*
{
  "dependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0"
  },
  "devDependencies": {
    "ts-node": "^10.9.0"
  }
}
*/

// tsconfig.json recommended settings:
/*
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
*/
