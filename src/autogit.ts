interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

async function fetchTodo(): Promise<void> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const todo: Todo = await response.json();
    
    console.log('Fetched TODO:');
    console.log(`ID: ${todo.id}`);
    console.log(`Title: ${todo.title}`);
    console.log(`Completed: ${todo.completed ? 'Yes' : 'No'}`);
    
  } catch (error) {
    console.error('Error fetching data:', error instanceof Error ? error.message : 'Unknown error');
  }
}

// Execute the function
fetchTodo();
Fetched TODO:
ID: 1
Title: delectus aut autem
Completed: No
