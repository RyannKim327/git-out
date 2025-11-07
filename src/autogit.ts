import axios, { AxiosResponse, AxiosError } from 'axios';

// Define interface for our post data
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function fetchPosts(): Promise<void> {
  try {
    const response: AxiosResponse<Post[]> = await axios.get<Post[]>(
      'https://jsonplaceholder.typicode.com/posts'
    );

    console.log('API call successful!');
    console.log(`Status Code: ${response.status}`);
    console.log('First 3 posts:');
    
    // Show first 3 posts
    response.data.slice(0, 3).forEach(post => {
      console.log(`\nID: ${post.id}`);
      console.log(`Title: ${post.title}`);
      console.log(`Body: ${post.body.substring(0, 50)}...`);
    });

    // You could return data here if needed:
    // return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    
    if (axiosError.response) {
      // Server responded with a status code outside 2xx range
      console.error('Error response data:', axiosError.response.data);
      console.error('Error status code:', axiosError.response.status);
    } else if (axiosError.request) {
      // Request was made but no response received
      console.error('No response received:', axiosError.request);
    } else {
      // Something happened in setting up the request
      console.error('Error message:', axiosError.message);
    }
  }
}

// Execute the API call
fetchPosts();
npm install axios typescript @types/node
npx tsc index.ts
node index.js
API call successful!
Status Code: 200
First 3 posts:

ID: 1
Title: sunt aut facere repellat provident occaecati excepturi optio reprehenderit
Body: quia et suscipit\nsuscipit recusandae consequuntur expedita...

ID: 2
Title: qui est esse
Body: est rerum tempore vitae\nsequi sint nihil reprehenderit dolor...

ID: 3
Title: ea molestias quasi exercitationem repellat qui ipsa sit aut
Body: et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut...
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["**/*.ts"]
}
