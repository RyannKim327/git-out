interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function fetchPosts(): Promise<Post[]> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Post[] = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch posts:', error instanceof Error ? error.message : error);
    return [];
  }
}

// Execute and process the fetched data
(async () => {
  const posts = await fetchPosts();
  
  if (posts.length > 0) {
    console.log(`Successfully fetched ${posts.length} posts`);
    console.log('First post:', {
      id: posts[0].id,
      title: posts[0].title,
      body: posts[0].body.slice(0, 20) + '...' // Truncate long text
    });
  } else {
    console.log('No posts retrieved');
  }
})();
