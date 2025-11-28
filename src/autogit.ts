// Define interfaces for the expected data structure
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

// Function to fetch user data
async function fetchUserData(userId: number): Promise<User> {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const userData: User = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

// Function to fetch posts with error handling and retry logic
async function fetchPostsWithRetry(retries = 3): Promise<Post[]> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const posts: Post[] = await response.json();
      return posts;
    } catch (error) {
      console.warn(`Attempt ${attempt} failed:`, error);
      if (attempt === retries) {
        throw new Error(`Failed after ${retries} attempts: ${error.message}`);
      }
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
  throw new Error('Unexpected error in fetchPostsWithRetry');
}

// Function to demonstrate parallel requests
async function fetchUserAndPosts(userId: number) {
  try {
    const [user, posts] = await Promise.all([
      fetchUserData(userId),
      fetchPostsWithRetry()
    ]);

    console.log('User:', user);
    console.log(`Found ${posts.length} posts`);
    
    // Filter posts for this user
    const userPosts = posts.filter(post => post.userId === userId);
    console.log(`User ${user.name} has ${userPosts.length} posts`);
    
    return { user, posts: userPosts };
  } catch (error) {
    console.error('Failed to fetch user and posts:', error);
    throw error;
  }
}

// Example usage
(async () => {
  try {
    const result = await fetchUserAndPosts(1);
    console.log('Final result:', result);
  } catch (error) {
    console.error('Application error:', error);
  }
})();

// Bonus: POST example
async function createNewPost(postData: Partial<Post>) {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const newPost: Post = await response.json();
    console.log('Created post:', newPost);
    return newPost;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

// Example of creating a new post
createNewPost({
  userId: 1,
  title: 'Test Post',
  body: 'This is a test post created with fetch API'
});
