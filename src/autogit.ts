// random-joke.ts
import axios from "axios";

/**
 * The shape of the JSON that the Joke API gives us.
 */
interface Joke {
  id: number;
  type: string;
  setup: string;
  punchline: string;
}

/**
 * Fetch a single random joke.
 */
const fetchRandomJoke = async (): Promise<Joke> => {
  // The API returns an array of jokes even though we only ask for one – happy accidents.
  const url = "https://official-joke-api.appspot.com/jokes/random";
  const response = await axios.get<Joke>(url);
  return response.data;
};

/**
 * Pretty‑print a joke to the console.
 */
const printJoke = (joke: Joke) => {
  console.log(`💡 ${joke.type.toUpperCase()}`);
  console.log(`   ${joke.setup}`);
  setTimeout(() => console.log(`   👉  ${joke.punchline}\n`), 1500);
};

/**
 * Simple wrapper that ties everything together.
 */
const main = async () => {
  try {
    const joke = await fetchRandomJoke();
    printJoke(joke);
  } catch (err) {
    // Axios errors contain a `response` field with the server reply.
    // If you’re debugging, you can inspect `err.response?.data` for the text.
    console.error("🔴 Something went wrong retrieving a joke:", err);
  }
};

// Run the little demo when the file is executed.
main();
