import axios, { AxiosResponse } from 'axios';

// Define interface for the expected response data
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

async function fetchTodo(): Promise<void> {
  try {
    // Make GET request to JSONPlaceholder API
    const response: AxiosResponse<Todo> = await axios.get<Todo>(
      'https://jsonplaceholder.typicode.com/todos/1'
    );

    // Access response data (automatically typed as Todo)
    const todo: Todo = response.data;
    
    console.log('Fetched Todo:');
    console.log(`Title: ${todo.title}`);
    console.log(`Completed: ${todo.completed ? 'Yes' : 'No'}`);
    console.log(`User ID: ${todo.userId}`);
  } catch (error) {
    console.error('Error fetching todo:');
    if (axios.isAxiosError(error)) {
      // Axios-specific error
      console.error(`Status: ${error.response?.status}`);
      console.error(`Message: ${error.message}`);
    } else {
      // Generic error
      console.error(error);
    }
  }
}

// Execute the function
fetchTodo();
npm install axios
npm install --save-dev typescript @types/node @types/axios
{
  "compilerOptions": {
    "target": "ES2017",
    "module": "CommonJS",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
  }
}
tsc && node dist/your-file-name.js
Fetched Todo:
Title: delectus aut autem
Completed: No
User ID: 1
