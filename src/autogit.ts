import axios, { AxiosResponse } from 'axios';

// Declare the shape of the data we expect from the API
interface Quote {
  id: number;
  quote: string;
  author: string;
}

// A helper that fetches a random quote
async function fetchRandomQuote(): Promise<Quote> {
  try {
    const response: AxiosResponse<Quote> = await axios.get(
      'https://api.quotable.io/random'
    );
    return response.data;
  } catch (err) {
    // If something goes wrong, throw a readable error
    throw new Error(
      `Could not fetch a quote: ${
        err instanceof Error ? err.message : String(err)
      }`
    );
  }
}

// Usage example – print a random quote to the console
fetchRandomQuote()
  .then((quote) => console.log(`${quote.quote} — ${quote.author}`))
  .catch((err) => console.error(err.message));
