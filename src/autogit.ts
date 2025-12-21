interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

class UserService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  async getUser(id: number): Promise<ApiResponse<User>> {
    try {
      const response = await fetch(`${this.baseUrl}/users/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const user: User = await response.json();
      
      return {
        data: user,
        status: response.status
      };
    } catch (error) {
      throw new Error(`Failed to fetch user: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getAllUsers(): Promise<ApiResponse<User[]>> {
    try {
      const response = await fetch(`${this.baseUrl}/users`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const users: User[] = await response.json();
      
      return {
        data: users,
        status: response.status
      };
    } catch (error) {
      throw new Error(`Failed to fetch users: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async createUser(userData: Omit<User, 'id'>): Promise<ApiResponse<User>> {
    try {
      const response = await fetch(`${this.baseUrl}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      const newUser: User = await response.json();
      
      return {
        data: newUser,
        status: response.status,
        message: 'User created successfully'
      };
    } catch (error) {
      throw new Error(`Failed to create user: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Usage example
async function demoUsersAPI() {
  const userService = new UserService();
  
  try {
    // Get all users
    const usersResponse = await userService.getAllUsers();
    console.log('All users:', usersResponse.data);
    
    // Get single user
    const userResponse = await userService.getUser(1);
    console.log('User 1:', userResponse.data);
    
    // Create new user
    const newUserResponse = await userService.createUser({
      name: 'John Doe',
      email: 'john@example.com',
      username: 'johndoe'
    });
    console.log('New user:', newUserResponse.data);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

demoUsersAPI();
import axios, { AxiosResponse } from 'axios';

interface WeatherData {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
  };
}

class WeatherService {
  private apiKey: string;
  private baseUrl = 'http://api.weatherapi.com/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getCurrentWeather(city: string): Promise<WeatherData> {
    try {
      const response: AxiosResponse<WeatherData> = await axios.get(
        `${this.baseUrl}/current.json`,
        {
          params: {
            key: this.apiKey,
            q: city,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Weather API error: ${error.response?.data?.error?.message || error.message}`);
      }
      throw error;
    }
  }
}

// Usage example
async function demoWeatherAPI() {
  // Note: You'd need a real API key from weatherapi.com
  const weatherService = new WeatherService('your-api-key-here');
  
  try {
    const weather = await weatherService.getCurrentWeather('London');
    console.log(`Weather in ${weather.location.name}:`);
    console.log(`Temperature: ${weather.current.temp_c}°C`);
    console.log(`Condition: ${weather.current.condition.text}`);
    console.log(`Humidity: ${weather.current.humidity}%`);
  } catch (error) {
    console.error('Weather API error:', error);
  }
}

// demoWeatherAPI();
interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
  }>;
}

interface Post {
  id: string;
  title: string;
  body: string;
  author: {
    name: string;
    email: string;
  };
}

class GraphQLClient {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async query<T>(query: string, variables?: Record<string, any>): Promise<GraphQLResponse<T>> {
    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      return await response.json();
    } catch (error) {
      throw new Error(`GraphQL query failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Usage example with a hypothetical GraphQL API
async function demoGraphQL() {
  const client = new GraphQLClient('https://example.com/graphql');
  
  const GET_POSTS = `
    query GetPosts($limit: Int!) {
      posts(limit: $limit) {
        id
        title
        body
        author {
          name
          email
        }
      }
    }
  `;

  try {
    const result = await client.query<{ posts: Post[] }>(GET_POSTS, { limit: 5 });
    
    if (result.errors) {
      console.error('GraphQL errors:', result.errors);
      return;
    }
    
    if (result.data) {
      console.log('Posts:', result.data.posts);
    }
  } catch (error) {
    console.error('GraphQL error:', error);
  }
}

// demoGraphQL();
class HttpClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }
}

// Usage
interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
}

async function demoHttpClient() {
  const client = new HttpClient('https://fakestoreapi.com');
  
  try {
    const products = await client.get<Product[]>('/products');
    console.log('Products:', products);
    
    const newProduct = await client.post<Product>('/products', {
      title: 'New Product',
      price: 99.99,
      category: 'electronics'
    });
    console.log('New product:', newProduct);
  } catch (error) {
    console.error('HTTP client error:', error);
  }
}

demoHttpClient();
