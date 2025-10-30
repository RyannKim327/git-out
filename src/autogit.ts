import axios, { AxiosResponse } from 'axios';

// Define interface for the data structure
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    city: string;
    zipcode: string;
  };
}

// API configuration
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Async function to fetch user data
async function fetchUserData(userId: number): Promise<User> {
  try {
    const response: AxiosResponse<User> = await axios.get(
      `${API_BASE_URL}/users/${userId}`
    );
    
    console.log('Response status:', response.status);
    console.log('User data:', response.data);
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
      console.error('Status code:', error.response?.status);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}

// Function to fetch multiple users concurrently
async function fetchMultipleUsers(userIds: number[]): Promise<User[]> {
  try {
    const requests = userIds.map(id => 
      axios.get<User>(`${API_BASE_URL}/users/${id}`)
    );
    
    const responses = await Promise.all(requests);
    return responses.map(response => response.data);
  } catch (error) {
    console.error('Error fetching multiple users:', error);
    throw error;
  }
}

// Function to create a new user
async function createUser(userData: Partial<User>): Promise<User> {
  try {
    const response: AxiosResponse<User> = await axios.post(
      `${API_BASE_URL}/users`,
      userData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 5000,
      }
    );
    
    console.log('User created with ID:', response.data.id);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Example usage
async function main() {
  try {
    // Fetch single user
    const user = await fetchUserData(1);
    console.log(`Fetched user: ${user.name}`);
    
    // Fetch multiple users
    const users = await fetchMultipleUsers([2, 3, 4]);
    console.log(`Fetched ${users.length} users`);
    
    // Create new user
    const newUser = await createUser({
      name: 'John Doe',
      email: 'john.doe@example.com',
    });
    console.log(`Created user with ID: ${newUser.id}`);
    
  } catch (error) {
    console.error('Main function error:', error);
  }
}

// Run the example
main();
npm install axios
npm install -D typescript @types/node ts-node
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
