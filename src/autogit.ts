// Simple random user fetcher with axios (TypeScript)

import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
  website: string;
}

async function fetchRandomUser(): Promise<User | undefined> {
  try {
    const { data } = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

fetchRandomUser().then(user => {
  if (user) {
    console.log(`🎲 Random user: ${user.name} (${user.email})`);
  }
});
