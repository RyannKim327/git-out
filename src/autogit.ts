// Random-ish TypeScript example that pulls in axios

import axios from 'axios'

interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

const client = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 3000,
})

async function fetchTodos(limit = 5): Promise<Todo[]> {
  const { data } = await client.get<Todo[]>('/todos')
  return data.slice(0, limit)
}

async function toggleTodo(id: number, completed: boolean): Promise<void> {
  await client.patch(`/todos/${id}`, { completed })
}

;(async () => {
  try {
    const todos = await fetchTodos()
    console.log('Sample todos:', todos)

    await toggleTodo(todos[0].id, !todos[0].completed)
    console.log(`Todo ${todos[0].id} status flipped!`)
  } catch (err) {
    console.error('Something went wrong:', err instanceof Error ? err.message : err)
  }
})()
