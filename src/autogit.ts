// src/fetchPosts.ts
import axios from 'axios';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

/* Fetches all posts and returns a typed array */
async function getPosts(): Promise<Post[]> {
  const { data } = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts', {
    timeout: 5000,               // optional timeout
    headers: { Accept: 'application/json' },
  });
  return data;
}

/* Quick demo – logs the first post */
getPosts()
  .then(posts => {
    console.log('First post:', posts[0]);
  })
  .catch(err => {
    console.error('Error fetching posts:', err.message);
  });

export { getPosts, Post };
