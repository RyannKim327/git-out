// Define interface for the user data structure
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

// Async function to fetch user data
async function fetchUser(userId: number): Promise<User> {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

    // Check if response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse JSON response with type assertion
    const userData: User = await response.json() as User;
    return userData;
    
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
    throw new Error('Unknown error occurred');
  }
}

// Usage example
(async () => {
  try {
    const user = await fetchUser(1);
    console.log('User Data:');
    console.log(`Name: ${user.name}`);
    console.log(`Email: ${user.email}`);
    console.log(`Company: ${user.company.name}`);
    console.log(`Phone: ${user.phone}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
})();
