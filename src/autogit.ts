interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  name: string;
}

async function getWeather(city: string): Promise<WeatherData> {
  const apiKey = 'your-api-key-here';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: WeatherData = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

// Usage
async function displayWeather() {
  try {
    const weather = await getWeather('London');
    console.log(`Weather in ${weather.name}:`);
    console.log(`Temperature: ${weather.main.temp}°C`);
    console.log(`Condition: ${weather.weather[0].description}`);
  } catch (error) {
    console.error('Failed to display weather');
  }
}

displayWeather();
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

class ApiClient {
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  async fetchUsers(): Promise<User[]> {
    const response = await fetch(`${this.baseUrl}/users`);
    return response.json();
  }

  async fetchUserPosts(userId: number): Promise<Post[]> {
    const response = await fetch(`${this.baseUrl}/posts?userId=${userId}`);
    return response.json();
  }

  async createPost(post: Omit<Post, 'id'>): Promise<Post> {
    const response = await fetch(`${this.baseUrl}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    return response.json();
  }
}

// Usage
async function demoApiUsage() {
  const api = new ApiClient();
  
  try {
    // Get all users
    const users = await api.fetchUsers();
    console.log('Users:', users);
    
    // Get posts for first user
    if (users.length > 0) {
      const posts = await api.fetchUserPosts(users[0].id);
      console.log('Posts:', posts);
      
      // Create a new post
      const newPost = await api.createPost({
        title: 'Test Post',
        body: 'This is a test post',
        userId: users[0].id,
      });
      console.log('New post created:', newPost);
    }
  } catch (error) {
    console.error('API error:', error);
  }
}

demoApiUsage();
interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  public_repos: number;
}

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
}

// Type guard for error responses
function isGitHubError(response: any): response is { message: string } {
  return typeof response.message === 'string';
}

class GitHubService {
  async getUser(username: string): Promise<GitHubUser> {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    
    if (!response.ok || isGitHubError(data)) {
      throw new Error(isGitHubError(data) ? data.message : 'User not found');
    }
    
    return data as GitHubUser;
  }

  async getUserRepos(username: string): Promise<GitHubRepo[]> {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const data = await response.json();
    
    if (!response.ok || isGitHubError(data)) {
      throw new Error(isGitHubError(data) ? data.message : 'Failed to fetch repos');
    }
    
    return data as GitHubRepo[];
  }
}

// Usage with error handling
async function displayGitHubProfile(username: string) {
  const github = new GitHubService();
  
  try {
    const [user, repos] = await Promise.all([
      github.getUser(username),
      github.getUserRepos(username)
    ]);
    
    console.log(`GitHub User: ${user.login}`);
    console.log(`Public Repos: ${user.public_repos}`);
    console.log(`Top 3 Repos by Stars:`);
    
    repos
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 3)
      .forEach(repo => {
        console.log(`- ${repo.name}: ${repo.stargazers_count} stars`);
      });
      
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error('Unknown error occurred');
    }
  }
}

displayGitHubProfile('microsoft');
import axios, { AxiosResponse } from 'axios';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

class TodoService {
  private client = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 5000,
  });

  async getTodos(): Promise<Todo[]> {
    const response: AxiosResponse<Todo[]> = await this.client.get('/todos');
    return response.data;
  }

  async getTodo(id: number): Promise<Todo> {
    const response: AxiosResponse<Todo> = await this.client.get(`/todos/${id}`);
    return response.data;
  }

  async createTodo(todo: Omit<Todo, 'id'>): Promise<Todo> {
    const response: AxiosResponse<Todo> = await this.client.post('/todos', todo);
    return response.data;
  }
}

// Usage
async function manageTodos() {
  const todoService = new TodoService();
  
  try {
    // Get all todos
    const todos = await todoService.getTodos();
    console.log(`Total todos: ${todos.length}`);
    
    // Get a specific todo
    const todo = await todoService.getTodo(1);
    console.log('First todo:', todo.title);
    
    // Create new todo
    const newTodo = await todoService.createTodo({
      userId: 1,
      title: 'Learn TypeScript',
      completed: false,
    });
    console.log('Created todo:', newTodo);
    
  } catch (error) {
    console.error('Todo service error:', error);
  }
}

manageTodos();
