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

// Function to fetch user data with error handling
async function fetchUserData(userId: number): Promise<User> {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const user: User = await response.json();
    return user;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

// Function to fetch posts with query parameters
async function fetchUserPosts(userId: number): Promise<Post[]> {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }
    
    const posts: Post[] = await response.json();
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

// Function to create a new post
async function createNewPost(title: string, body: string, userId: number): Promise<Post> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        body,
        userId,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to create post: ${response.status}`);
    }
    
    const newPost: Post = await response.json();
    return newPost;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

// Main function to demonstrate the usage
async function main() {
  try {
    console.log('Fetching user data...');
    const user = await fetchUserData(1);
    console.log('User:', user);
    
    console.log('\nFetching user posts...');
    const posts = await fetchUserPosts(user.id);
    console.log(`Found ${posts.length} posts`);
    
    if (posts.length > 0) {
      console.log('First post title:', posts[0].title);
    }
    
    console.log('\nCreating a new post...');
    const newPost = await createNewPost(
      'My New Post',
      'This is the body of my new post',
      user.id
    );
    console.log('New post created with ID:', newPost.id);
    
  } catch (error) {
    console.error('Error in main function:', error);
  }
}

// Execute the main function
main();

// Alternative: Using fetch with then/catch syntax
function fetchUserDataAlternative(userId: number): void {
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then((response: Response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((user: User) => {
      console.log('Alternative fetch - User:', user.name);
    })
    .catch((error: Error) => {
      console.error('Alternative fetch error:', error);
    });
}

// Call the alternative version
fetchUserDataAlternative(2);
