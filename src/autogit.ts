interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface ApiResponse {
  posts: Post[];
  error?: string;
}

async function fetchPosts(): Promise<ApiResponse> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const posts: Post[] = await response.json();
    
    return {
      posts,
      error: undefined
    };
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    
    return {
      posts: [],
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Usage example
async function displayPosts() {
  const result = await fetchPosts();
  
  if (result.error) {
    console.log('Error:', result.error);
    return;
  }
  
  console.log('Fetched posts:');
  result.posts.forEach(post => {
    console.log(`${post.id}. ${post.title}`);
    console.log(`   ${post.body.substring(0, 50)}...`);
    console.log('');
  });
}

// Call the function
displayPosts();
