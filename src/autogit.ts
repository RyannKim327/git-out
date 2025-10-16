// weatherApi.ts
interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: {
    main: string;
    description: string;
  }[];
}

class WeatherApiClient {
  private readonly baseUrl: string = 'https://api.openweathermap.org/data/2.5';
  private readonly apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getWeatherByCity(city: string): Promise<WeatherData> {
    const url = `${this.baseUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric`;
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: WeatherData = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch weather data: ${error.message}`);
    }
  }

  async getWeatherByCoordinates(lat: number, lon: number): Promise<WeatherData> {
    const url = `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
    
    const response = await fetch(url);
    return await response.json();
  }
}

// Usage example
async function displayWeather() {
  // Replace with your actual API key from https://openweathermap.org/
  const apiKey = 'your_api_key_here';
  const weatherClient = new WeatherApiClient(apiKey);

  try {
    const weatherData = await weatherClient.getWeatherByCity('London');
    
    console.log(`Weather in ${weatherData.name}:`);
    console.log(`Temperature: ${weatherData.main.temp}°C`);
    console.log(`Feels like: ${weatherData.main.feels_like}°C`);
    console.log(`Humidity: ${weatherData.main.humidity}%`);
    console.log(`Conditions: ${weatherData.weather[0].description}`);
  } catch (error) {
    console.error('Error fetching weather:', error.message);
  }
}

// Alternative usage with coordinates
async function displayWeatherByLocation() {
  const weatherClient = new WeatherApiClient('your_api_key_here');
  
  try {
    const weatherData = await weatherClient.getWeatherByCoordinates(51.5074, -0.1278);
    console.log(`Weather in ${weatherData.name}: ${weatherData.main.temp}°C`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run the example
displayWeather();
npm install typescript @types/node
Weather in London:
Temperature: 15°C
Feels like: 14°C
Humidity: 75%
Conditions: light rain
