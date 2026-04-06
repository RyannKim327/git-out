/**
 * Fetches a random dog picture and logs the URL.
 * Works in Node (with node-fetch polyfill) and in browsers.
 */

const DOG_API = 'https://dog.ceo/api/breeds/image/random';

interface DogApiResponse {
  message: string;  // the image URL
  status: string;   // should be 'success'
}

/**
 * Makes the HTTP request, parses the JSON, and logs the image URL.
 */
async function showRandomDog(): Promise<void> {
  try {
    // `fetch` may need a polyfill in Node, e.g. `node-fetch`
    const response = await fetch(DOG_API);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data: DogApiResponse = await response.json();

    if (data.status !== 'success') {
      throw new Error(`API reported failure: ${data.status}`);
    }

    console.log('Random dog image URL:', data.message);
  } catch (err) {
    console.error('Failed to fetch dog image:', err);
  }
}

showRandomDog();
npm install node-fetch
import fetch from 'node-fetch';
