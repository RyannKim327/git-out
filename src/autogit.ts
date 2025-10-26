import axios, { AxiosResponse } from 'axios';

// Define interface for the API response
interface User {
  id: number;
  name: string;
  email: string;
  website: string;
}

// Function to fetch users from JSONPlaceholder API
async function fetchUsers(): Promise<User[]> {
  try {
    const response: AxiosResponse<User[]> = await axios.get<User[]>(
      'https://jsonplaceholder.typicode.com/users',
      {
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Status:', response.status);
    console.log('Headers:', response.headers);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
      if (error.response) {
        console.error('Response status:', error.response.status);
      }
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}

// Function to create a new user
async function createUser(userData: Partial<User>): Promise<User> {
  try {
    const response: AxiosResponse<User> = await axios.post<User>(
      'https://jsonplaceholder.typicode.com/users',
      userData,
      {
        timeout: 3000,
      }
    );

    console.log('Created user with ID:', response.data.id);
    return response.data;
  } catch (error) {
    console.error('Failed to create user:', error);
    throw error;
  }
}

// Main execution
async function main() {
  try {
    // Fetch users
    const users = await fetchUsers();
    console.log('Fetched users:', users.slice(0, 2)); // Show first 2 users

    // Create a new user
    const newUser = await createUser({
      name: 'John Doe',
      email: 'john.doe@example.com',
      website: 'https://johndoe.com',
    });
    
    console.log('New user created:', newUser);

  } catch (error) {
    console.error('Main execution failed:', error);
  }
}

// Run the program
main();

// Alternative: Using axios with then/catch syntax
axios.get<User[]>('https://jsonplaceholder.typicode.com/users')
  .then((response: AxiosResponse<User[]>) => {
    console.log('Total users:', response.data.length);
  })
  .catch((error) => {
    console.error('Request failed:', error);
  });
npm install axios
npm install -D typescript @types/node ts-node
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
