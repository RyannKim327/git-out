interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

async function fetchRandomUser(): Promise<User> {
  const API_URL = 'https://jsonplaceholder.typicode.com/users/';
  const randomId = Math.floor(Math.random() * 10) + 1;

  try {
    const response = await fetch(`${API_URL}${randomId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const userData: User = await response.json();
    
    console.log('Fetched user:', userData);
    return userData;

  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch random user');
  }
}

// Example usage with error handling
async function displayRandomUser(): Promise<void> {
  try {
    const user = await fetchRandomUser();
    console.log(`Random User: ${user.name} (${user.email})`);
  } catch (error) {
    console.error('Error displaying user:', error.message);
  }
}

// Additional utility function to fetch multiple users
async function fetchMultipleUsers(ids: number[]): Promise<User[]> {
  const requests = ids.map(id => 
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(response => {
        if (!response.ok) throw new Error(`User ${id} not found`);
        return response.json();
      })
  );

  return Promise.all(requests);
}

// Example with abort controller for timeout
async function fetchWithTimeout(url: string, timeoutMs = 5000): Promise<User> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timed out');
    }
    throw error;
  }
}

// Execute the example
displayRandomUser();

// Fetch multiple users example
fetchMultipleUsers([1, 2, 3])
  .then(users => {
    console.log('Multiple users:', users.map(u => u.name));
  })
  .catch(error => {
    console.error('Failed to fetch multiple users:', error);
  });
{
  "compilerOptions": {
    "lib": ["DOM", "ES6"]
  }
}
