// 1. Define an interface for the expected data structure
// We're fetching 'posts' from JSONPlaceholder, which have these fields.
interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

// 2. Define API constants for better maintainability
const API_BASE_URL: string = 'https://jsonplaceholder.typicode.com';

/**
 * Fetches a list of all posts from the API.
 * @returns A promise that resolves to an array of Post objects.
 * @throws An error if the network request fails or the response is not OK.
 */
async function fetchAllPosts(): Promise<Post[]> {
    try {
        console.log(`Fetching all posts from: ${API_BASE_URL}/posts`);
        const response = await fetch(`${API_BASE_URL}/posts`);

        // Check if the request was successful (status code 200-299)
        if (!response.ok) {
            const errorText = await response.text(); // Get more details if available
            throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorText}`);
        }

        // Parse the JSON response into an array of Post objects
        const posts: Post[] = await response.json();
        return posts;
    } catch (error) {
        console.error("Error fetching all posts:", (error as Error).message);
        throw error; // Re-throw to allow calling code to handle it
    }
}

/**
 * Fetches a single post by its ID from the API.
 * @param id The ID of the post to fetch.
 * @returns A promise that resolves to a single Post object, or null if not found.
 * @throws An error if the network request fails or the response is not OK.
 */
async function fetchPostById(id: number): Promise<Post | null> {
    try {
        console.log(`Fetching post with ID ${id} from: ${API_BASE_URL}/posts/${id}`);
        const response = await fetch(`${API_BASE_URL}/posts/${id}`);

        if (!response.ok) {
            // If the post is not found (e.g., status 404), return null
            if (response.status === 404) {
                console.warn(`Post with ID ${id} not found.`);
                return null;
            }
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorText}`);
        }

        const post: Post = await response.json();
        return post;
    } catch (error) {
        console.error(`Error fetching post with ID ${id}:`, (error as Error).message);
        throw error;
    }
}

// 3. Main execution block (using an IIFE - Immediately Invoked Function Expression)
// to allow top-level await if running in an environment that supports it,
// or just to organize the async calls.
(async () => {
    console.log("--- Starting API Data Fetch Example ---");

    // --- Example 1: Fetching all posts ---
    try {
        const allPosts = await fetchAllPosts();
        if (allPosts.length > 0) {
            console.log(`\nSuccessfully fetched ${allPosts.length} posts.`);
            console.log("First 3 posts:");
            allPosts.slice(0, 3).forEach(post => {
                console.log(`  ID: ${post.id}, Title: "${post.title.substring(0, 50)}..."`);
            });
        } else {
            console.log("\nNo posts found.");
        }
    } catch (error) {
        console.error("\nFailed to process all posts:", (error as Error).message);
    }

    console.log("\n-------------------------------------");

    // --- Example 2: Fetching a single post by ID ---
    const postIdToFetch = 5;
    try {
        const singlePost = await fetchPostById(postIdToFetch);
        if (singlePost) {
            console.log(`\nSuccessfully fetched post with ID ${postIdToFetch}:`);
            console.log(`  Title: "${singlePost.title}"`);
            console.log(`  Body: "${singlePost.body.substring(0, 100)}..."`);
        } else {
            console.log(`\nPost with ID ${postIdToFetch} was not found.`);
        }
    } catch (error) {
        console.error(`\nFailed to process post with ID ${postIdToFetch}:`, (error as Error).message);
    }

    console.log("\n-------------------------------------");

    // --- Example 3: Fetching a non-existent post ---
    const nonExistentPostId = 99999;
    try {
        console.log(`\nAttempting to fetch non-existent post with ID ${nonExistentPostId}...`);
        const nonExistentPost = await fetchPostById(nonExistentPostId);
        if (nonExistentPost) {
            console.log(`Unexpectedly found post with ID ${nonExistentPostId}.`);
        } else {
            console.log(`As expected, post with ID ${nonExistentPostId} was not found.`);
        }
    } catch (error) {
        console.error(`\nFailed to process non-existent post with ID ${nonExistentPostId}:`, (error as Error).message);
    }

    console.log("\n--- API Data Fetch Example Finished ---");
})();

