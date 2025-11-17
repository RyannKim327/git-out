import axios from 'axios';

interface JokeResponse {
  id: string;
  joke: string;
}

async function getRandomJoke(): Promise<void> {
  try {
    const response = await axios.get<JokeResponse>('https://icanhazdadjoke.com/', {
      headers: {
        Accept: 'application/json'
      }
    });

    console.log(`Here's a joke for you: ${response.data.joke}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Failed to fetch joke:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

getRandomJoke();
