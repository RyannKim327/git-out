// fetchPosts.ts

import axios from 'axios';

// Define a Post interface
interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

// Function to fetch posts from JSONPlaceholder API
async function fetchPosts(): Promise<Post[]> {
    try {
        const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
}

// Function to display posts
function displayPosts(posts: Post[]): void {
    posts.forEach(post => {
        console.log(`Post ID: ${post.id}`);
        console.log(`Title: ${post.title}`);
        console.log(`Body: ${post.body}`);
        console.log('-------------------------');
    });
}

// Main function
async function main(): Promise<void> {
    try {
        const posts = await fetchPosts();
        displayPosts(posts);
    } catch (error) {
        console.error('Failed to fetch posts:', error);
    }
}

// Run the main function
main();
npx tsc fetchPosts.ts
node fetchPosts.js
Post ID: 1
Title: sunt aut facere repellat provident occaecati excepturi optio reprehenderit
Body:quia et suscipit\nsuscipit
-------------------------
Post ID: 2
Title: qui est esse
Body: est rerum tempore vitae\nsequi sint nihil...
-------------------------
...
