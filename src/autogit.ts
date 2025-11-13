// random-axios.ts
import axios, { AxiosResponse } from 'axios';

interface Joke {
  id: string;
  joke: string;
  status: number;
}

async function getRandomJoke(): Promise<string> {
  try {
    const response: AxiosResponse<Joke> = await axios.get(
      'https://icanhazdadjoke.com/',
      { headers: { Accept: 'application/json' } }
    );
    return response.data.joke;
  } catch (error) {
    console.error('Error fetching joke:', error);
    return 'No joke for you 😢';
  }
}

(async () => {
  const joke = await getRandomJoke();
  console.log('Random joke:', joke);
})();
