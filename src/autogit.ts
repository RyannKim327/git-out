import axios, { AxiosResponse } from 'axios';

// Interface for the expected API response
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
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
        }
      }
    );
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}

// Function to display users in a formatted way
function displayUsers(users: User[]): void {
  console.log('\n=== User List ===');
  users.forEach((user, index) => {
    console.log(`${index + 1}. ${user.name} (@${user.username})`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Phone: ${user.phone}`);
    console.log(`   Website: ${user.website}`);
    console.log('---');
  });
}

// Function to find a user by ID
function findUserById(users: User[], id: number): User | undefined {
  return users.find(user => user.id === id);
}

// Main function to run the example
async function main(): Promise<void> {
  console.log('Fetching users from API...');
  
  try {
    const users = await fetchUsers();
    console.log(`Successfully fetched ${users.length} users`);
    
    displayUsers(users);
    
    // Find and display a specific user
    const targetUserId = 3;
    const targetUser = findUserById(users, targetUserId);
    
    if (targetUser) {
      console.log(`\nDetails for user ID ${targetUserId}:`);
      console.log(JSON.stringify(targetUser, null, 2));
    } else {
      console.log(`\nUser with ID ${targetUserId} not found`);
    }
    
  } catch (error) {
    console.error('Failed to fetch users:', error);
  }
}

// Run the main function
main();

// Alternative: Using axios with promises instead of async/await
function fetchUsersWithPromises(): Promise<User[]> {
  return axios.get<User[]>('https://jsonplaceholder.typicode.com/users')
    .then((response: AxiosResponse<User[]>) => response.data)
    .catch((error) => {
      console.error('Promise error:', error.message);
      throw error;
    });
}

// Example of POST request
async function createUser(newUser: Partial<User>): Promise<User> {
  try {
    const response = await axios.post<User>(
      'https://jsonplaceholder.typicode.com/users',
      newUser,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to create user:', error);
    throw error;
  }
}

// Example usage of POST
async function examplePost(): Promise<void> {
  try {
    const createdUser = await createUser({
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '555-1234'
    });
    console.log('Created user:', createdUser);
  } catch (error) {
    console.error('Post example failed:', error);
  }
}
npm install axios
npm install -D typescript @types/node ts-node
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
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
