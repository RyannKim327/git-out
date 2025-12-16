import axios, { AxiosResponse, AxiosError } from 'axios';

// Interface for user data
interface User {
  id: number;
  name: string;
  email: string;
  website: string;
}

// Interface for post data
interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

// Custom axios instance with default configuration
const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Generic function to handle API calls
async function apiCall<T>(url: string): Promise<T> {
  try {
    const response: AxiosResponse<T> = await apiClient.get(url);
    console.log(`✅ Success: GET ${url}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(`❌ Error: ${axiosError.message}`);
    throw error;
  }
}

// Random asynchronous functions using axios
class ApiService {
  // Get a random user
  async getRandomUser(): Promise<User> {
    const users = await apiCall<User[]>('/users');
    const randomIndex = Math.floor(Math.random() * users.length);
    return users[randomIndex];
  }

  // Get posts by user ID
  async getPostsByUserId(userId: number): Promise<Post[]> {
    return await apiCall<Post[]>(`/posts?userId=${userId}`);
  }

  // Create a new post
  async createPost(post: Omit<Post, 'id'>): Promise<Post> {
    try {
      const response: AxiosResponse<Post> = await apiClient.post('/posts', post);
      console.log('📝 New post created successfully');
      return response.data;
    } catch (error) {
      console.error('Failed to create post:', error);
      throw error;
    }
  }

  // Get user with their posts
  async getUserWithPosts(userId: number): Promise<{ user: User; posts: Post[] }> {
    try {
      const [userResponse, postsResponse] = await Promise.all([
        apiClient.get<User>(`/users/${userId}`),
        apiClient.get<Post[]>(`/posts?userId=${userId}`)
      ]);

      return {
        user: userResponse.data,
        posts: postsResponse.data
      };
    } catch (error) {
      console.error('Failed to fetch user with posts:', error);
      throw error;
    }
  }
}

// Example usage
async function main() {
  const apiService = new ApiService();

  try {
    // Get a random user
    console.log('🎲 Fetching random user...');
    const randomUser = await apiService.getRandomUser();
    console.log('Random User:', randomUser.name, `(${randomUser.email})`);

    // Get posts by the random user
    console.log(`📚 Fetching posts by user ${randomUser.id}...`);
    const userPosts = await apiService.getPostsByUserId(randomUser.id);
    console.log(`Found ${userPosts.length} posts`);

    // Show first post title
    if (userPosts.length > 0) {
      console.log('First post title:', userPosts[0].title);
    }

    // Create a new post
    console.log('✍️ Creating a new post...');
    const newPost = await apiService.createPost({
      userId: randomUser.id,
      title: 'My Random TypeScript Post',
      body: 'This post was created using axios in TypeScript!'
    });
    console.log('New post ID:', newPost.id);

    // Get user with posts using Promise.all
    console.log('👥 Fetching user with posts...');
    const userWithPosts = await apiService.getUserWithPosts(1);
    console.log(`User ${userWithPosts.user.name} has ${userWithPosts.posts.length} posts`);

  } catch (error) {
    console.error('Main function error:', error);
  }
}

// Batch processing example
async function batchProcessUsers() {
  console.log('\n🔄 Batch processing users...');
  
  try {
    const users = await apiCall<User[]>('/users');
    
    // Process users in batches of 2
    const batchSize = 2;
    for (let i = 0; i < users.length; i += batchSize) {
      const batch = users.slice(i, i + batchSize);
      console.log(`Processing batch ${i / batchSize + 1}`);
      
      const batchPromises = batch.map(user => 
        apiService.getPostsByUserId(user.id)
      );
      
      const batchResults = await Promise.all(batchPromises);
      
      batchResults.forEach((posts, index) => {
        console.log(`${batch[index].name}: ${posts.length} posts`);
      });
    }
  } catch (error) {
    console.error('Batch processing failed:', error);
  }
}

// Run the examples
main()
  .then(() => batchProcessUsers())
  .catch(error => console.error('Application error:', error));

// Utility function to make multiple parallel requests
async function fetchMultipleResources(): Promise<void> {
  const endpoints = ['/users', '/posts', '/comments'];
  
  try {
    const requests = endpoints.map(endpoint => apiClient.get(endpoint));
    const responses = await Promise.all(requests);
    
    console.log('\n📊 Multiple resources fetched:');
    responses.forEach((response, index) => {
      console.log(`${endpoints[index]}: ${response.data.length} items`);
    });
  } catch (error) {
    console.error('Failed to fetch multiple resources:', error);
  }
}

// Call the utility function
fetchMultipleResources();
