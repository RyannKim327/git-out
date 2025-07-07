// Define an interface for the data structure you expect from the API
interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}

// Function to fetch users from a public API
async function fetchUsers(): Promise<void> {
    const apiUrl = 'https://jsonplaceholder.typicode.com/users';

    try {
        const response = await fetch(apiUrl);
        
        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON response
        const users: User[] = await response.json();
        
        // Log the users to the console
        console.log(users);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

// Call the function to fetch users
fetchUsers();
