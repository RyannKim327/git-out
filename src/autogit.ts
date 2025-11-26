import axios, { AxiosResponse } from 'axios';

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

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
});

class ApiService {
  // Fetch user by ID
  async getUserById(id: number): Promise<User> {
    try {
      const response: AxiosResponse<User> = await apiClient.get(`/users/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new Error('Failed to fetch user');
    }
  }

  // Fetch posts by user ID
  async getPostsByUserId(userId: number): Promise<Post[]> {
    try {
      const response: AxiosResponse<Post[]> = await apiClient.get(`/posts?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw new Error('Failed to fetch posts');
    }
  }

  // Create a new post
  async createPost(postData: Omit<Post, 'id'>): Promise<Post> {
    try {
      const response: AxiosResponse<Post> = await apiClient.post('/posts', postData);
      return response.data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw new Error('Failed to create post');
    }
  }

  // Update an existing post
  async updatePost(id: number, postData: Partial<Post>): Promise<Post> {
    try {
      const response: AxiosResponse<Post> = await apiClient.patch(`/posts/${id}`, postData);
      return response.data;
    } catch (error) {
      console.error('Error updating post:', error);
      throw new Error('Failed to update post');
    }
  }

  // Delete a post
  async deletePost(id: number): Promise<void> {
    try {
      await apiClient.delete(`/posts/${id}`);
    } catch (error) {
      console.error('Error deleting post:', error);
      throw new Error('Failed to delete post');
    }
  }
}

// Usage example
async function demonstrateApiUsage() {
  const apiService = new ApiService();

  try {
    // Get user data
    const user = await apiService.getUserById(1);
    console.log('User:', user);

    // Get user's posts
    const posts = await apiService.getPostsByUserId(user.id);
    console.log('User posts:', posts);

    // Create a new post
    const newPost = await apiService.createPost({
      userId: user.id,
      title: 'Random TypeScript Post',
      body: 'This post was created using axios in TypeScript!'
    });
    console.log('Created post:', newPost);

    // Update the post
    const updatedPost = await apiService.updatePost(newPost.id, {
      title: 'Updated Random TypeScript Post'
    });
    console.log('Updated post:', updatedPost);

    // Delete the post
    await apiService.deletePost(updatedPost.id);
    console.log('Post deleted successfully');

  } catch (error) {
    console.error('API demonstration failed:', error.message);
  }
}

// Run the demonstration
demonstrateApiUsage();

// Utility function to make multiple requests concurrently
async function fetchMultipleUsers(ids: number[]): Promise<User[]> {
  try {
    const requests = ids.map(id => apiClient.get<User>(`/users/${id}`));
    const responses = await Promise.all(requests);
    return responses.map(response => response.data);
  } catch (error) {
    console.error('Error fetching multiple users:', error);
    throw new Error('Failed to fetch multiple users');
  }
}

// Example of using the utility function
async function fetchUsersDemo() {
  try {
    const users = await fetchMultipleUsers([1, 2, 3]);
    console.log('Multiple users:', users);
  } catch (error) {
    console.error('Failed to fetch multiple users:', error.message);
  }
}

fetchUsersDemo();
npm install axios
npm install -D typescript @types/node ts-node
