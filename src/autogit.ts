interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

async function fetchRandomPost(): Promise<void> {
  try {
    // Generate random post ID between 1-100
    const randomId = Math.floor(Math.random() * 100) + 1;
    
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${randomId}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Post = await response.json();
    
    console.log(`Random Post #${randomId}:`);
    console.log(`Title: ${data.title}`);
    console.log(`Body: ${data.body.substr(0, 50)}...`);
    console.log(`Author ID: ${data.userId}`);

  } catch (error) {
    console.error('Fetch error:', error instanceof Error ? error.message : 'Unknown error');
  }
}

// Fetch and display a random post
fetchRandomPost();
Random Post #42:
Title: commodi ullam sint et excepturi error explicabo praesentium voluptas
Body: odio nam explicabo officiis nostrum...
Author ID: 5
