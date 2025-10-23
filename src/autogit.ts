import axios, { AxiosResponse, AxiosError } from 'axios';

// Define TypeScript interfaces for our data
interface User {
  id: number;
  name: string;
  email: string;
  website: string;
  phone: string;
}

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = 'https://jsonplaceholder.typicode.com') {
    this.baseURL = baseURL;
  }

  // Fetch a user by ID
  async getUserById(id: number): Promise<User> {
    try {
      const response: AxiosResponse<User> = await axios.get(
        `${this.baseURL}/users/${id}`
      );
      console.log(`Fetched user: ${response.data.name}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to fetch user: ${error.message}`);
      }
      throw error;
    }
  }

  // Fetch posts by user ID
  async getPostsByUserId(userId: number): Promise<Post[]> {
    try {
      const response: AxiosResponse<Post[]> = await axios.get(
        `${this.baseURL}/posts?userId=${userId}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to fetch posts: ${error.message}`);
      }
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
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(`Created post with ID: ${response.data.id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to create post: ${error.message}`);
      }
      throw error;
    }
  }
}

// Usage example
async function demonstrateApiUsage() {
  const apiClient = new ApiClient();

  try {
    // Fetch user data
    const user: User = await apiClient.getUserById(1);
    console.log('User:', user);

    // Fetch user's posts
    const posts: Post[] = await apiClient.getPostsByUserId(user.id);
    console.log(`User has ${posts.length} posts`);

    // Create a new post
    const newPost = await apiClient.createPost({
      userId: user.id,
      title: 'My New Post',
      body: 'This is the content of my new post created with axios!',
    });
    
    console.log('New post created:', newPost);

  } catch (error) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
    } else {
      console.error('Unknown error occurred');
    }
  }
}

// Batch requests example using axios.all
async function makeBatchRequests() {
  try {
    const [usersResponse, postsResponse]: [AxiosResponse<User[]>, AxiosResponse<Post[]>] = 
      await axios.all([
        axios.get<User[]>('https://jsonplaceholder.typicode.com/users'),
        axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts?_limit=5')
      ]);

    const users = usersResponse.data;
    const posts = postsResponse.data;

    console.log(`Fetched ${users.length} users and ${posts.length} posts in batch`);

  } catch (error) {
    console.error('Batch request failed:', error);
  }
}

// Run the examples
demonstrateApiUsage();
makeBatchRequests();
npm install axios typescript @types/node
