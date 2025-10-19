// install with: npm install axios
import axios from 'axios';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function getRandomPost() {
  try {
    const postId = Math.floor(Math.random() * 100) + 1; // random id between 1 and 100
    const response = await axios.get<Post>(`https://jsonplaceholder.typicode.com/posts/${postId}`);

    const post = response.data;
    console.log(`Random Post #${post.id}`);
    console.log(`Title: ${post.title.toUpperCase()}`);
    console.log(`Body length: ${post.body.length} characters`);
  } catch (error) {
    console.error('Oops, something broke:', error);
  }
}

getRandomPost();
