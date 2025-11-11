interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

async function fetchUsers(): Promise<User[]> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: User[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

// Usage example
async function displayUsers() {
  const users = await fetchUsers();
  
  if (users.length > 0) {
    console.log('Fetched users:');
    users.forEach(user => {
      console.log(`- ${user.name} (${user.email})`);
    });
  } else {
    console.log('No users found');
  }
}

displayUsers();
npm install node-fetch @types/node-fetch
import fetch from 'node-fetch';
Fetched users:
- Leanne Graham (Sincere@april.biz)
- Ervin Howell (Shanna@melissa.tv)
- Clementine Bauch (Nathan@yesenia.net)
- ...
