import axios, { AxiosResponse } from 'axios';

// Define interfaces for the data structure
interface User {
  id: number;
  name: string;
  email: string;
  website: string;
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

class ApiService {
  private baseURL: string = 'https://jsonplaceholder.typicode.com';

  // Fetch a single user by ID
  async getUser(id: number): Promise<User> {
    try {
      const response: AxiosResponse<User> = await axios.get(
        `${this.baseURL}/users/${id}`
      );
      console.log(`User ${id}:`, response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.message);
      } else {
        console.error('Unexpected error:', error);
      }
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
      console.error('Error fetching users:', error);
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
      console.log('Created post:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }

  // Update a post
  async updatePost(id: number, updateData: Partial<Post>): Promise<Post> {
    try {
      const response: AxiosResponse<Post> = await axios.patch(
        `${this.baseURL}/posts/${id}`,
        updateData
      );
      console.log('Updated post:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  }

  // Delete a post
  async deletePost(id: number): Promise<void> {
    try {
      await axios.delete(`${this.baseURL}/posts/${id}`);
      console.log(`Post ${id} deleted successfully`);
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  }
}

// Usage example
async function main() {
  const apiService = new ApiService();

  try {
    // Get a user
    const user = await apiService.getUser(1);
    
    // Get all users
    const allUsers = await apiService.getAllUsers();
    
    // Create a new post
    const newPost = await apiService.createPost({
      userId: 1,
      title: 'My New Post',
      body: 'This is the content of my post'
    });
    
    // Update the post
    const updatedPost = await apiService.updatePost(newPost.id, {
      title: 'Updated Post Title'
    });
    
    // Delete the post
    await apiService.deletePost(updatedPost.id);
    
  } catch (error) {
    console.error('Main function error:', error);
  }
}

// Run the example
main();
npm install axios typescript @types/node ts-node
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
