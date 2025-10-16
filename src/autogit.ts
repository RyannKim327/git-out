// User interface defining the expected API response structure
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
}

// Error interface for API error responses
interface ApiError {
  message: string;
  status: number;
}

// API response wrapper for better type safety
interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
  loading: boolean;
}

class UserApiService {
  private baseUrl: string = 'https://jsonplaceholder.typicode.com';

  // Generic fetch wrapper with error handling
  private async fetchData<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response: ApiResponse<T> = {
      data: null,
      error: null,
      loading: true
    };

    try {
      const apiResponse = await fetch(`${this.baseUrl}${endpoint}`);
      
      if (!apiResponse.ok) {
        throw new Error(`HTTP error! status: ${apiResponse.status}`);
      }
      
      const data = await apiResponse.json() as T;
      response.data = data;
    } catch (error) {
      response.error = {
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        status: error instanceof Response ? error.status : 500
      };
    } finally {
      response.loading = false;
    }

    return response;
  }

  // Get all users
  async getUsers(): Promise<ApiResponse<User[]>> {
    return this.fetchData<User[]>('/users');
  }

  // Get single user by ID
  async getUserById(id: number): Promise<ApiResponse<User>> {
    return this.fetchData<User>(`/users/${id}`);
  }

  // Create new user (POST example)
  async createUser(userData: Omit<User, 'id'>): Promise<ApiResponse<User>> {
    const response: ApiResponse<User> = {
      data: null,
      error: null,
      loading: true
    };

    try {
      const apiResponse = await fetch(`${this.baseUrl}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!apiResponse.ok) {
        throw new Error(`HTTP error! status: ${apiResponse.status}`);
      }

      const data = await apiResponse.json() as User;
      response.data = data;
    } catch (error) {
      response.error = {
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        status: error instanceof Response ? error.status : 500
      };
    } finally {
      response.loading = false;
    }

    return response;
  }
}

// Usage example
async function demonstrateApiUsage() {
  const userService = new UserApiService();

  console.log('🔍 Fetching all users...');
  const allUsers = await userService.getUsers();
  
  if (allUsers.error) {
    console.error('❌ Error fetching users:', allUsers.error);
  } else if (allUsers.data) {
    console.log('✅ Users fetched successfully:', allUsers.data.length, 'users found');
    console.log('First user:', allUsers.data[0]);
  }

  console.log('\n🔍 Fetching user with ID 1...');
  const singleUser = await userService.getUserById(1);
  
  if (singleUser.error) {
    console.error('❌ Error fetching user:', singleUser.error);
  } else if (singleUser.data) {
    console.log('✅ User fetched successfully:', singleUser.data.name);
  }

  console.log('\n📝 Creating new user...');
  const newUser = await userService.createUser({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    website: 'johndoe.com'
  });

  if (newUser.error) {
    console.error('❌ Error creating user:', newUser.error);
  } else if (newUser.data) {
    console.log('✅ User created successfully with ID:', newUser.data.id);
  }
}

// Advanced example with React-like state management
class ApiStateManager {
  private users: User[] = [];
  private loading: boolean = false;
  private error: string | null = null;

  constructor(private userService: UserApiService) {}

  async loadUsers(): Promise<void> {
    this.loading = true;
    this.error = null;

    const response = await this.userService.getUsers();

    if (response.error) {
      this.error = response.error.message;
    } else if (response.data) {
      this.users = response.data;
    }

    this.loading = false;
    this.logState();
  }

  private logState(): void {
    console.log('\n📊 Current State:');
    console.log('Loading:', this.loading);
    console.log('Error:', this.error);
    console.log('Users count:', this.users.length);
  }
}

// Run the examples
demonstrateApiUsage().catch(console.error);

// Additional example with state manager
setTimeout(async () => {
  console.log('\n\n🎯 Advanced Example with State Manager:');
  const stateManager = new ApiStateManager(new UserApiService());
  await stateManager.loadUsers();
}, 1000);
