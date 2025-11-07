import axios, { AxiosError, AxiosResponse } from 'axios';

// Define interface for our expected response data
interface PostData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function fetchPosts() {
  const url = 'https://jsonplaceholder.typicode.com/posts/1';

  try {
    // Make GET request with TypeScript generics
    const response: AxiosResponse<PostData> = await axios.get<PostData>(url);
    
    // Access typed data
    const post: PostData = response.data;
    
    console.log('Fetched post:');
    console.log(`ID: ${post.id}`);
    console.log(`Title: ${post.title}`);
    console.log(`User ID: ${post.userId}`);
    console.log(`Body: ${post.body.substring(0, 50)}...`); // Show first 50 chars
  } catch (error) {
    // Handle errors with TypeScript type guards
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error(`Axios error:`, {
        status: axiosError.response?.status,
        message: axiosError.message,
      });
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

// Execute the function
fetchPosts();
npm install axios typescript
npm install -D @types/node @types/axios
npx ts-node axios-example.ts
Fetched post:
ID: 1
Title: sunt aut facere repellat provident occaecati excepturi optio reprehenderit
User ID: 1
Body: quia et suscipit\nsuscipit recusandae consequuntur expedita...
