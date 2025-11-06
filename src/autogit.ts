// User interface representing the expected data structure
interface User {
  id: number;
  name: string;
  email: string;
  website?: string; // Optional property
}

// Function to fetch users from JSONPlaceholder API
async function fetchUsers(): Promise<User[]> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    
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

// Function to display users in the console
function displayUsers(users: User[]): void {
  users.forEach(user => {
    console.log(`ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`);
  });
}

// Main execution
async function main() {
  try {
    console.log('Fetching users...');
    const users = await fetchUsers();
    console.log(`Retrieved ${users.length} users:`);
    displayUsers(users);
  } catch (error) {
    console.error('Failed to fetch users:', error.message);
  }
}

// Run the program
main();

// Example of a more specific fetch with POST method
async function createPost(title: string, body: string, userId: number): Promise<void> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        body,
        userId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create post: ${response.status}`);
    }

    const newPost = await response.json();
    console.log('Created new post:', newPost);
  } catch (error) {
    console.error('Error creating post:', error);
  }
}

// Example usage of POST function
createPost('My New Post', 'This is the body content', 1);
