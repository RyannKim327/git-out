// Define an interface for the expected data structure
interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

// Function to fetch posts
async function fetchPosts(): Promise<void> {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON response
        const posts: Post[] = await response.json();

        // Log the posts to the console
        console.log(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

// Call the function to fetch posts
fetchPosts();
