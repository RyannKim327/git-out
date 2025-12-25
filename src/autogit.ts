// Define interfaces for TypeScript type safety
interface User {
  id: number;
  name: string;
  email: string;
  website?: string;
}

interface ApiResponse {
  users: User[];
}

// Function to fetch users from the JSONPlaceholder API
async function fetchUsers(): Promise<User[]> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: ApiResponse = await response.json();
    return data.users || data as any; // JSONPlaceholder returns array directly
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

// Function to fetch a specific user by ID
async function fetchUserById(id: number): Promise<User> {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const user: User = await response.json();
    return user;
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    throw error;
  }
}

// Function to create a new user (POST request)
async function createUser(userData: Omit<User, 'id'>): Promise<User> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const newUser: User = await response.json();
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Example usage
async function main() {
  try {
    // Fetch all users
    console.log('Fetching all users...');
    const users = await fetchUsers();
    console.log('Users:', users.slice(0, 3)); // Show first 3 users
    
    // Fetch a specific user
    console.log('\nFetching user with ID 1...');
    const user = await fetchUserById(1);
    console.log('User 1:', user);
    
    // Create a new user
    console.log('\nCreating new user...');
    const newUser = await createUser({
      name: 'John Doe',
      email: 'john.doe@example.com',
      website: 'https://johndoe.com'
    });
    console.log('Created user:', newUser);
    
  } catch (error) {
    console.error('Error in main function:', error);
  }
}

// Run the example
main();

// Alternative: Using fetch with typed response and error handling
async function fetchWithType<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json() as Promise<T>;
}

// Usage of the generic fetch function
async function fetchUsersGeneric(): Promise<User[]> {
  return fetchWithType<User[]>('https://jsonplaceholder.typicode.com/users');
}
