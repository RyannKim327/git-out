interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface ApiResponse {
  data: User[];
  total: number;
  page: number;
  limit: number;
}

async function fetchUsers(page: number = 1, limit: number = 10): Promise<ApiResponse | null> {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${limit}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: ApiResponse = await response.json();
    
    // Add some processing to the data
    const processedUsers = data.data.map(user => ({
      ...user,
      fullInfo: `${user.name} - ${user.email}`
    }));
    
    return {
      ...data,
      data: processedUsers
    };
    
  } catch (error) {
    console.error('Error fetching users:', error);
    return null;
  }
}

async function main() {
  console.log('Fetching users...');
  
  const users = await fetchUsers(1, 5);
  
  if (users) {
    console.log(`Found ${users.total} total users`);
    console.log('First few users:');
    
    users.data.forEach(user => {
      console.log(`- ${user.fullInfo}`);
    });
  } else {
    console.log('Failed to fetch users');
  }
}

// Run the function
main().catch(console.error);

// You could also create a more generic fetch utility
async function apiRequest<T>(url: string, options: RequestInit = {}): Promise<T | null> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    return await response.json() as T;
  } catch (error) {
    console.error(`Request to ${url} failed:`, error);
    return null;
  }
}

// Example usage of the generic function
async function fetchPosts() {
  const posts = await apiRequest<{ id: number; title: string; body: string }[]>(
    'https://jsonplaceholder.typicode.com/posts'
  );
  
  if (posts) {
    console.log(`Loaded ${posts.length} posts`);
    posts.slice(0, 3).forEach(post => {
      console.log(`Post #${post.id}: ${post.title}`);
    });
  }
}

fetchPosts();
