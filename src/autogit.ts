// random-joke.ts
import fetch from 'node-fetch';          // npm i node-fetch@2
import { Console } from 'console';

interface Joke {
  id: number;
  type: string;
  setup: string;
  punchline: string;
}

async function fetchRandomJoke(): Promise<Joke> {
  const res = await fetch('https://official-joke-api.appspot.com/random_joke');

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} – failed to fetch joke`);
  }

  const data: Joke = await res.json();

  return data;
}

async function run() {
  try {
    const joke = await fetchRandomJoke();

    console.log('😂 Here’s something to make you smile!');
    console.log(`  ${joke.setup}`);
    console.log(`   – ${joke.punchline}`);
  } catch (err: any) {
    console.error('Oops! Something went wrong:');
    console.error(err.message ?? err);
  }
}

run();
