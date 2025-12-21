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
  phone: string;
  website: string;
  company: {
    name: string;
  };
}

class UserFetcher {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  // Method to fetch all users
  async fetchUsers(): Promise<User[]> {
    try {
      const response = await fetch(this.apiUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const users: User[] = await response.json();
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  // Method to fetch a single user by ID
  async fetchUserById(id: number): Promise<User> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`);
      
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

  // Method to display user information
  displayUserInfo(user: User): void {
    console.log(`
      User Information:
      ID: ${user.id}
      Name: ${user.name}
      Username: ${user.username}
      Email: ${user.email}
      Address: ${user.address.street}, ${user.address.city}, ${user.address.zipcode}
      Phone: ${user.phone}
      Website: ${user.website}
      Company: ${user.company.name}
    `);
  }

  // Method to run the example
  async runExample(): Promise<void> {
    try {
      console.log('Fetching all users...');
      const users = await this.fetchUsers();
      console.log(`Found ${users.length} users`);

      // Display first user
      if (users.length > 0) {
        console.log('\nFirst user details:');
        this.displayUserInfo(users[0]);
      }

      // Fetch a specific user
      console.log('\nFetching user with ID 3...');
      const specificUser = await this.fetchUserById(3);
      this.displayUserInfo(specificUser);

    } catch (error) {
      console.error('Example failed:', error);
    }
  }
}

// Alternative fetch with more options
async function fetchWithOptions(): Promise<void> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      cache: 'no-cache',
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log(`Fetched ${data.length} posts`);
    
  } catch (error) {
    console.error('Fetch with options failed:', error);
  }
}

// Usage example
async function main() {
  const userFetcher = new UserFetcher();
  
  // Run the main example
  await userFetcher.runExample();
  
  // Run alternative fetch
  console.log('\n--- Alternative fetch example ---');
  await fetchWithOptions();
}

// Execute the main function
main().catch(console.error);

// Error handling wrapper
async function safeFetch<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Fetch error for ${url}:`, error);
    throw error;
  }
}

// Example using the safeFetch wrapper
async function fetchUserSafe(id: number): Promise<void> {
  try {
    const user = await safeFetch<User>(`https://jsonplaceholder.typicode.com/users/${id}`);
    console.log(`Safe fetch successful for user: ${user.name}`);
  } catch (error) {
    console.log('Safe fetch caught the error gracefully');
  }
}

// Run safe fetch example
fetchUserSafe(999).catch(console.error); // This will fail gracefully
npm install typescript @types/node node-fetch
