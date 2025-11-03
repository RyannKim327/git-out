import axios, { AxiosResponse, AxiosError } from 'axios';

// Define interfaces for type safety
interface User {
  id: number;
  name: string;
  email: string;
  website: string;
}

interface ApiResponse {
  data: User[];
  status: number;
}

// Function to fetch users from JSONPlaceholder API
async function fetchUsers(): Promise<void> {
  try {
    // Configure axios request
    const response: AxiosResponse<ApiResponse> = await axios.get('https://jsonplaceholder.typicode.com/users', {
      timeout: 5000, // 5 second timeout
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    const users: User[] = response.data.data;
    
    console.log('✅ Successfully fetched users:');
    users.forEach((user: User) => {
      console.log(`- ${user.name} (${user.email})`);
    });

  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error('❌ Axios Error:', {
        message: axiosError.message,
        status: axiosError.response?.status,
        statusText: axiosError.response?.statusText,
        url: axiosError.config?.url
      });
    } else {
      console.error('❌ Unexpected Error:', error);
    }
  }
}

// Function to post a new user (example with mock data)
async function createUser(newUser: Partial<User>): Promise<void> {
  try {
    const response: AxiosResponse<User> = await axios.post('https://jsonplaceholder.typicode.com/users', newUser, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ User created successfully:', response.data);

  } catch (error) {
    console.error('❌ Error creating user:', error);
  }
}

// Usage examples
async function main(): Promise<void> {
  console.log('🔄 Fetching users...\n');
  await fetchUsers();

  console.log('\n🔄 Creating a new user...\n');
  await createUser({
    name: 'John Doe',
    email: 'john.doe@example.com',
    website: 'johndoe.com'
  });
}

// Run the example
main().catch(console.error);

// Optional: Create an axios instance for reuse
const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Example using the axios instance
async function fetchUsersWithInstance(): Promise<void> {
  try {
    const response = await apiClient.get<User[]>('/users');
    console.log('\n📊 Using axios instance - Total users:', response.data.length);
  } catch (error) {
    console.error('❌ Error with axios instance:', error);
  }
}

// Uncomment to run the instance example
// fetchUsersWithInstance();
npm install axios
npm install --save-dev @types/node typescript
