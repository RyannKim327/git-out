interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  name: string;
}

async function getWeather(city: string): Promise<WeatherData> {
  const API_KEY = 'your_api_key_here';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  
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
    console.log(`Conditions: ${weather.weather[0].description}`);
  } catch (error) {
    console.error('Failed to get weather data');
  }
}

displayWeather();
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

class ApiClient {
  private baseURL: string;
  
  constructor(baseURL: string = 'https://jsonplaceholder.typicode.com') {
    this.baseURL = baseURL;
  }
  
  async getUsers(): Promise<User[]> {
    try {
      const response = await axios.get<User[]>(`${this.baseURL}/users`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }
  
  async createPost(post: Omit<Post, 'id'>): Promise<Post> {
    try {
      const response = await axios.post<Post>(`${this.baseURL}/posts`, post);
      return response.data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }
}

// Usage
async function demoApiClient() {
  const client = new ApiClient();
  
  try {
    // Get users
    const users = await client.getUsers();
    console.log('Users:', users.slice(0, 3)); // First 3 users
    
    // Create a post
    const newPost = await client.createPost({
      title: 'Test Post',
      body: 'This is a test post',
      userId: 1
    });
    console.log('Created post:', newPost);
  } catch (error) {
    console.error('API demo failed:', error);
  }
}

demoApiClient();
interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
}

interface CharactersData {
  characters: {
    results: Character[];
  };
}

async function graphqlRequest<T>(query: string, variables?: any): Promise<GraphQLResponse<T>> {
  const response = await fetch('https://rickandmortyapi.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}

async function getCharacters(): Promise<Character[]> {
  const query = `
    query {
      characters {
        results {
          id
          name
          status
          species
        }
      }
    }
  `;
  
  try {
    const response = await graphqlRequest<CharactersData>(query);
    
    if (response.errors) {
      throw new Error(response.errors[0].message);
    }
    
    return response.data?.characters.results || [];
  } catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
  }
}

// Usage
async function showCharacters() {
  try {
    const characters = await getCharacters();
    console.log('First 5 characters:');
    characters.slice(0, 5).forEach(char => {
      console.log(`${char.name} - ${char.species} (${char.status})`);
    });
  } catch (error) {
    console.error('Failed to get characters');
  }
}

showCharacters();
interface StockPrice {
  symbol: string;
  price: number;
  timestamp: Date;
}

class StockTicker {
  private ws: WebSocket | null = null;
  private subscribers: ((price: StockPrice) => void)[] = [];
  
  connect(symbols: string[]): void {
    this.ws = new WebSocket('wss://ws.finnhub.io?token=your_token_here');
    
    this.ws.onopen = () => {
      console.log('WebSocket connected');
      // Subscribe to symbols
      symbols.forEach(symbol => {
        this.ws?.send(JSON.stringify({ type: 'subscribe', symbol }));
      });
    };
    
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'trade') {
        data.data.forEach((trade: any) => {
          const stockPrice: StockPrice = {
            symbol: trade.s,
            price: trade.p,
            timestamp: new Date(trade.t)
          };
          
          this.notifySubscribers(stockPrice);
        });
      }
    };
    
    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }
  
  subscribe(callback: (price: StockPrice) => void): void {
    this.subscribers.push(callback);
  }
  
  private notifySubscribers(price: StockPrice): void {
    this.subscribers.forEach(callback => callback(price));
  }
  
  disconnect(): void {
    this.ws?.close();
  }
}

// Usage
const ticker = new StockTicker();

ticker.subscribe((price) => {
  console.log(`${price.symbol}: $${price.price} at ${price.timestamp.toLocaleTimeString()}`);
});

ticker.connect(['AAPL', 'GOOGL', 'MSFT']);

// Cleanup after 30 seconds
setTimeout(() => {
  ticker.disconnect();
  console.log('Disconnected from WebSocket');
}, 30000);
