// types.ts
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

// api-service.ts
class ApiService {
  private baseUrl: string = 'https://jsonplaceholder.typicode.com';

  async fetchPosts(): Promise<Post[]> {
    try {
      const response = await fetch(`${this.baseUrl}/posts`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const posts: Post[] = await response.json();
      return posts;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }

  async fetchUser(userId: number): Promise<User> {
    try {
      const response = await fetch(`${this.baseUrl}/users/${userId}`);
      
      if (!response.ok) {
        throw new Error(`User not found! status: ${response.status}`);
      }
      
      const user: User = await response.json();
      return user;
    } catch (error) {
      console.error(`Error fetching user ${userId}:`, error);
      throw error;
    }
  }

  async fetchPostsWithUsers(): Promise<(Post & { userName: string })[]> {
    const posts = await this.fetchPosts();
    const postsWithUsers = await Promise.all(
      posts.map(async (post) => {
        const user = await this.fetchUser(post.userId);
        return {
          ...post,
          userName: user.name
        };
      })
    );
    return postsWithUsers;
  }
}

// main.ts
async function main() {
  const apiService = new ApiService();
  
  try {
    console.log('Fetching posts...');
    const posts = await apiService.fetchPosts();
    
    console.log(`\nFound ${posts.length} posts:`);
    posts.slice(0, 3).forEach(post => {
      console.log(`- ${post.title} (User ID: ${post.userId})`);
    });

    console.log('\nFetching detailed posts with user info...');
    const postsWithUsers = await apiService.fetchPostsWithUsers();
    
    postsWithUsers.slice(0, 3).forEach(post => {
      console.log(`- ${post.title} by ${post.userName}`);
    });

  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
}

// Run the example
main();
