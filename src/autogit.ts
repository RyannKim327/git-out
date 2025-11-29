import axios from 'axios';

// Define an interface for the expected response data structure
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// Function to fetch todos from JSONPlaceholder API
async function fetchTodos() {
  try {
    // Make GET request with type parameter
    const response = await axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');

    // Access typed response data
    const todos = response.data;
    console.log(`Successfully fetched ${todos.length} todos`);
    
    // Log the first todo item
    if (todos.length > 0) {
      console.log('First todo:', todos[0].title);
      console.log('Completed status:', todos[0].completed);
    }

    return todos;
  } catch (error) {
    // Handle errors
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
      console.error('Status code:', error.response?.status);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
}

// Execute the function
fetchTodos()
  .then(todos => console.log(`Fetched ${todos.length} todos successfully`))
  .catch(() => console.log('Failed to fetch todos'));
npm install axios typescript @types/node
npx tsc yourfile.ts
node yourfile.js
