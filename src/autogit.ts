interface User {
  id: number;
  name: string;
  email: string;
  website: string;
}

class UserService {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/users';

  async fetchRandomUser(): Promise<User> {
    try {
      const response = await fetch(this.apiUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const users: User[] = await response.json();
      const randomIndex = Math.floor(Math.random() * users.length);
      
      return users[randomIndex];
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('Unable to retrieve user data');
    }
  }
}

// Usage example
async function displayRandomUser() {
  const userService = new UserService();
  
  try {
    const user = await userService.fetchRandomUser();
    
    console.log('🎉 Random User Profile:');
    console.log('ID:', user.id);
    console.log('Name:', user.name);
    console.log('Email:', user.email);
    console.log('Website:', user.website);
    
    return user;
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}

// Bonus: Function to fetch multiple users concurrently
async function fetchMultipleUsers(count: number): Promise<User[]> {
  const userService = new UserService();
  const promises = Array.from({ length: count }, () => 
    userService.fetchRandomUser().catch(() => null)
  );

  const results = await Promise.all(promises);
  return results.filter((user): user is User => user !== null);
}

// Execute
displayRandomUser().then(user => {
  if (user) {
    console.log(`\n✨ Displayed user: ${user.name}`);
  }
});

// Uncomment to fetch multiple users
// fetchMultipleUsers(3).then(users => {
//   console.log('\n👥 Multiple users:', users.map(u => u.name));
// });
