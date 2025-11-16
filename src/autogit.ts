// --- 1. Define TypeScript Interfaces for our data ---

/**
 * Represents a Post object from the JSONPlaceholder API.
 */
interface Post {
    userId: number;
    id?: number; // 'id' is optional because it's assigned by the API on creation
    title: string;
    body: string;
}

// --- 2. Configuration ---

const BASE_URL = 'https://jsonplaceholder.typicode.com';

// --- 3. API Service Functions ---

/**
 * Fetches all posts from the API.
 * @returns A promise that resolves to an array of Post objects, or null if an error occurs.
 */
async function fetchAllPosts(): Promise<Post[] | null> {
    try {
        console.log("Fetching all posts...");
        const response = await fetch(`${BASE_URL}/posts`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const posts: Post[] = await response.json();
        console.log(`Successfully fetched ${posts.length} posts.`);
        return posts;
    } catch (error) {
        console.error("Failed to fetch posts:", error);
        return null;
    }
}

/**
 * Fetches a single post by ID.
 * @param id The ID of the post to fetch.
 * @returns A promise that resolves to a Post object, or null if an error occurs.
 */
async function fetchPostById(id: number): Promise<Post | null> {
    try {
        console.log(`Fetching post with ID: ${id}...`);
        const response = await fetch(`${BASE_URL}/posts/${id}`);

        if (!response.ok) {
            if (response.status === 404) {
                console.warn(`Post with ID ${id} not found.`);
                return null;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const post: Post = await response.json();
        console.log(`Successfully fetched post ${post.id}: "${post.title.substring(0, 30)}..."`);
        return post;
    } catch (error) {
        console.error(`Failed to fetch post by ID ${id}:`, error);
        return null;
    }
}

/**
 * Creates a new post.
 * @param newPostData The data for the new post (without an ID).
 * @returns A promise that resolves to the created Post object (with ID), or null if an error occurs.
 */
async function createPost(newPostData: Omit<Post, 'id'>): Promise<Post | null> {
    try {
        console.log("Creating a new post...");
        const response = await fetch(`${BASE_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPostData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const createdPost: Post = await response.json();
        console.log(`Successfully created post with ID: ${createdPost.id}`);
        return createdPost;
    } catch (error) {
        console.error("Failed to create post:", error);
        return null;
    }
}

/**
 * Updates an existing post.
 * @param postId The ID of the post to update.
 * @param updatedPostData The data to update the post with.
 * @returns A promise that resolves to the updated Post object, or null if an error occurs.
 */
async function updatePost(postId: number, updatedPostData: Partial<Post>): Promise<Post | null> {
    try {
        console.log(`Updating post with ID: ${postId}...`);
        const response = await fetch(`${BASE_URL}/posts/${postId}`, {
            method: 'PUT', // Or PATCH for partial updates
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPostData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const updatedPost: Post = await response.json();
        console.log(`Successfully updated post with ID: ${updatedPost.id}`);
        return updatedPost;
    } catch (error) {
        console.error(`Failed to update post ${postId}:`, error);
        return null;
    }
}

/**
 * Deletes a post by ID.
 * @param postId The ID of the post to delete.
 * @returns A promise that resolves to true if deletion was successful, false otherwise.
 */
async function deletePost(postId: number): Promise<boolean> {
    try {
        console.log(`Deleting post with ID: ${postId}...`);
        const response = await fetch(`${BASE_URL}/posts/${postId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log(`Successfully deleted post with ID: ${postId}`);
        return true;
    } catch (error) {
        console.error(`Failed to delete post ${postId}:`, error);
        return false;
    }
}

// --- 4. Main Execution Flow (Demonstration) ---

async function runApiDemo() {
    console.log("--- Starting API Demo ---");

    // 1. Fetch all posts
    const allPosts = await fetchAllPosts();
    if (allPosts && allPosts.length > 0) {
        console.log("First 3 posts:");
        allPosts.slice(0, 3).forEach(p => console.log(`  [${p.id}] ${p.title.substring(0, 50)}...`));
    }

    console.log("\n--- Creating a new post ---");
    const newPostData = {
        userId: 1,
        title: "My Brand New TypeScript Post",
        body: "This is the body of my awesome new post, created via a TypeScript API call!",
    };
    const createdPost = await createPost(newPostData);
    if (createdPost) {
        console.log("New Post Details:", createdPost);

        console.log("\n--- Updating the newly created post ---");
        const updatedTitle = "Updated Title from TypeScript!";
        const updatedPost = await updatePost(createdPost.id!, { title: updatedTitle }); // Use ! because we expect id to be present now
        if (updatedPost) {
            console.log("Updated Post Details:", updatedPost);
        }

        console.log("\n--- Deleting the newly created post ---");
        const deleteSuccess = await deletePost(createdPost.id!);
        if (deleteSuccess) {
            console.log("Post deleted successfully.");
            // Try to fetch it to confirm it's gone (JSONPlaceholder will still return it, but conceptually it's deleted)
            await fetchPostById(createdPost.id!);
        }
    }

    console.log("\n--- Fetching a specific post ---");
    const specificPost = await fetchPostById(5); // A known existing post
    if (specificPost) {
        console.log("Specific Post Details:", specificPost);
    }

    console.log("\n--- Attempting to fetch a non-existent post (expected 404) ---");
    await fetchPostById(99999);

    console.log("\n--- API Demo Finished ---");
}

// Call the main demo function
runApiDemo();
