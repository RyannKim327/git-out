// Define the structure of the expected data
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

// Fetch user data from a placeholder API
async function fetchUser(userId: number): Promise<User | null> {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    if (!response.ok) {
      console.error(`Error fetching user: ${response.statusText}`);
      return null;
    }
    const data: User = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}

// Usage example
fetchUser(1).then(user => {
  if (user) {
    console.log(`User Name: ${user.name}`);
  } else {
    console.log('User not found.');
  }
});
