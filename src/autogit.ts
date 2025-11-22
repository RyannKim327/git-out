// --- 1. Define Interfaces for Type Safety ---

interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

interface NewPost {
    title: string;
    body: string;
    userId: number;
}

interface CreatedPost extends NewPost {
    id: number; // The API will assign an ID
}

// --- 2. Function to Fetch Data (GET request) ---

async function fetchTodos(): Promise<Todo[]> {
    const url = 'https://jsonplaceholder.typicode.com/todos?_limit=5'; // Get 5 todos

    console.log(`\n--- Fetching Todos from: ${url} ---`);
    try {
        const response = await fetch(url);

        // Check for HTTP errors (e.g., 404, 500)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const todos: Todo[] = await response.json();
        console.log("Successfully fetched todos:");
        todos.forEach(todo => console.log(`  [${todo.id}] ${todo.title} (Completed: ${todo.completed})`));
        return todos;

    } catch (error: unknown) { // Use unknown for safety, then narrow
        if (error instanceof Error) {
            console.error("Error fetching todos:", error.message);
        } else {
            console.error("An unknown error occurred while fetching todos:", error);
        }
        return []; // Return an empty array in case of error
    }
}

// --- 3. Function to Create Data (POST request) ---

async function createNewPost(postData: NewPost): Promise<CreatedPost | null> {
    const url = 'https://jsonplaceholder.typicode.com/posts'; // Endpoint for creating posts

    console.log(`\n--- Creating a New Post to: ${url} ---`);
    try {
        const response = await fetch(url, {
            method: 'POST', // Specify the HTTP method
            headers: {
                'Content-Type': 'application/json', // Tell the server we're sending JSON
            },
            body: JSON.stringify(postData), // Convert the JS object to a JSON string
        });

        // Check for HTTP errors
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const createdPost: CreatedPost = await response.json();
        console.log("Successfully created post:");
        console.log(`  ID: ${createdPost.id}`);
        console.log(`  Title: ${createdPost.title}`);
        console.log(`  Body: ${createdPost.body}`);
        console.log(`  UserID: ${createdPost.userId}`);
        return createdPost;

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error creating post:", error.message);
        } else {
            console.error("An unknown error occurred while creating post:", error);
        }
        return null; // Return null in case of error
    }
}

// --- 4. Main Execution Block ---

async function main() {
    // 1. Fetch some todos
    const todos = await fetchTodos();
    if (todos.length > 0) {
        console.log(`\nTotal todos fetched: ${todos.length}`);
    } else {
        console.log("\nNo todos were fetched due to an error or empty response.");
    }

    // 2. Create a new post
    const myNewPost: NewPost = {
        title: 'My Random TypeScript Post',
        body: 'This is a test post created using TypeScript and fetch API.',
        userId: 1337,
    };
    const createdPost = await createNewPost(myNewPost);
    if (createdPost) {
        console.log(`\nNew post created with ID: ${createdPost.id}`);
    } else {
        console.log("\nFailed to create the new post.");
    }

    // 3. Example of a deliberately bad request URL to show error handling
    console.log("\n--- Demonstrating Error Handling (Bad URL) ---");
    try {
        const badResponse = await fetch('https://this-url-does-not-exist-12345.com/api');
        // This line won't be reached if the URL is truly unreachable
        if (!badResponse.ok) {
            console.error(`Received HTTP error for bad URL: ${badResponse.status}`);
        } else {
            console.log("Surprisingly, the bad URL worked!");
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Caught expected error for bad URL:", error.message);
        } else {
            console.error("Caught unknown error for bad URL:", error);
        }
    }
}

// Run the main function
main();
