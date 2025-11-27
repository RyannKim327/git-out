import axios, { AxiosResponse } from 'axios';

// Define interface for the expected response data
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// API URL
const API_URL = 'https://jsonplaceholder.typicode.com/todos/1';

// Fetch data using Axios
async function fetchTodo(): Promise<void> {
  try {
    const response: AxiosResponse<Todo> = await axios.get(API_URL);
    
    // Access response data with TypeScript type checking
    const todoData: Todo = response.data;
    
    console.log('Fetched Todo:');
    console.log(`ID: ${todoData.id}`);
    console.log(`Title: ${todoData.title}`);
    console.log(`Completed: ${todoData.completed ? 'Yes' : 'No'}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

// Execute the function
fetchTodo();
npm install axios typescript @types/node
npx tsc your-file-name.ts
node your-file-name.js
Fetched Todo:
ID: 1
Title: delectus aut autem
Completed: No
