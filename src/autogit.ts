// Define an interface for the data we expect from the API
interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

// Function to fetch posts from the API
async function fetchPosts(): Promise<Post[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    
    // Check if the response is ok (status code 200-299)
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    // Parse the JSON response
    const posts: Post[] = await response.json();
    return posts;
}

// Function to display posts in the console
function displayPosts(posts: Post[]): void {
    posts.forEach(post => {
        console.log(`Post ID: ${post.id}`);
        console.log(`Title: ${post.title}`);
        console.log(`Body: ${post.body}`);
        console.log('-------------------------');
    });
}

// Main function to execute the fetch and display
async function main() {
    try {
        const posts = await fetchPosts();
        displayPosts(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

// Run the main function
main();
