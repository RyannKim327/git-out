// Define interface for the Post object
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Function to fetch posts from API
async function fetchPosts(): Promise<Post[]> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Post[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

// Use the API function
fetchPosts()
  .then(posts => {
    console.log('Fetched posts:');
    posts.slice(0, 5).forEach((post, index) => { // Display first 5 posts
      console.log(`\nPost ${index + 1}:`);
      console.log(`Title: ${post.title}`);
      console.log(`${post.body.substring(0, 50)}...`);
    });
  })
  .catch(error => console.error('Error:', error));
npm install node-fetch@2
npm install @types/node-fetch --save-dev
{
  "compilerOptions": {
    "target": "ES2017",
    "module": "CommonJS",
    "esModuleInterop": true
  }
}
