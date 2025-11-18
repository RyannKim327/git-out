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

    return await response.json() as Post[];
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

// Using the fetch function
fetchPosts()
  .then(posts => {
    console.log('Fetched posts:');
    posts.slice(0, 3).forEach(post => {
      console.log(`\nTitle: ${post.title}`);
      console.log(`Body: ${post.body.substr(0, 50)}...`);
    });
  })
  .catch(error => console.error('Error:', error.message));
Fetched posts:

Title: sunt aut facere repellat provident occaati excepturi optio reprehenderit
Body: quia et suscipit\nsuscipit recusandae consequuntur expedi...

Title: qui est esse
Body: est rerum tempore vitae\nsequi sint nihil reprehenderit do...

Title: ea molestias quasi exercitationem repellat qui ipsa sit aut
Body: et iusto sed quo iure\nvoluptatem occaecati omnis eligend...
