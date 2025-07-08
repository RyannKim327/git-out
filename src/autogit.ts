npm install axios
import axios from 'axios';

// Define an interface for the expected response data
interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

// Function to fetch posts
async function fetchPosts(): Promise<Post[]> {
    try {
        const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error fetching posts:', error.message);
        } else {
            console.error('Unexpected error:', error);
        }
        throw error; // Rethrow the error for further handling if necessary
    }
}

// Main function to execute code
async function main() {
    try {
        const posts = await fetchPosts();
        console.log('Fetched posts:', posts);
    } catch (error) {
        console.error('Failed to fetch posts:', error);
    }
}

// Execute the main function
main();
tsc yourFileName.ts
node yourFileName.js
