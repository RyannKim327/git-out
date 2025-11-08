// Interface to define the structure of weather data
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

// Function to fetch weather data
async function fetchWeather(city: string): Promise<WeatherData> {
  const apiKey = 'your-api-key-here'; // Replace with actual API key
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

// Function to display weather information
function displayWeather(weather: WeatherData): void {
  console.log(`Weather in ${weather.name}:`);
  console.log(`Temperature: ${weather.main.temp}°C`);
  console.log(`Humidity: ${weather.main.humidity}%`);
  console.log(`Pressure: ${weather.main.pressure} hPa`);
  console.log(`Condition: ${weather.weather[0].description}`);
}

// Usage example
async function main() {
  try {
    const city = 'London';
    console.log(`Fetching weather for ${city}...`);
    
    const weather = await fetchWeather(city);
    displayWeather(weather);
    
  } catch (error) {
    console.error('Failed to get weather data:', error);
  }
}

// Alternative example with error handling and timeout
async function fetchWithTimeout(url: string, timeout = 5000): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

// Example with POST request
interface User {
  id: number;
  name: string;
  email: string;
}

async function createUser(userData: Omit<User, 'id'>): Promise<User> {
  const response = await fetch('https://jsonplaceholder.typicode.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Failed to create user');
  }

  return await response.json();
}

// Run the main function
main();

// Example of using the POST function
createUser({
  name: 'John Doe',
  email: 'john@example.com'
})
  .then(user => console.log('Created user:', user))
  .catch(error => console.error('Error creating user:', error));
