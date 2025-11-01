interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

async function fetchUsers(): Promise<void> {
  try {
    console.log('Fetching users...');
    
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const users: User[] = await response.json();
    
    console.log(`Fetched ${users.length} users:`);
    users.forEach(user => {
      console.log(`${user.name} - ${user.email}`);
    });
    
    // Example: Find a specific user
    const johnDoe = users.find(user => user.name.includes('John'));
    if (johnDoe) {
      console.log(`\nFound John Doe: ${johnDoe.phone}`);
    }
    
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

// Usage
fetchUsers();

// Alternative: Fetch a single user with error handling
async function fetchSingleUser(userId: number): Promise<User | null> {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        console.log(`User with ID ${userId} not found`);
        return null;
      }
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }
    
    const user: User = await response.json();
    return user;
    
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error);
    return null;
  }
}

// Example usage
fetchSingleUser(1).then(user => {
  if (user) {
    console.log('Single user:', user.name);
  }
});
