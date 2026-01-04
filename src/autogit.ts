// src/services/catFactService.ts
import axios, { AxiosResponse } from 'axios';

interface CatFact {
  fact: string;
  length: number;
}

/**
 * Fetches a random cat fact from the CatFact API.
 * @returns Promise<CatFact> A promise that resolves to a cat fact object.
 * @throws {Error} Throws an error if the request fails.
 */
export async function getRandomCatFact(): Promise<CatFact> {
  try {
    const response: AxiosResponse<CatFact> = await axios.get(
      'https://catfact.ninja/fact',
      {
        timeout: 5000, // 5 seconds timeout
        headers: {
          Accept: 'application/json',
          'User-Agent': 'axios-typescript-example/1.0',
        },
      }
    );
    return response.data;
  } catch (error: any) {
    // Enhance the error message before re-throwing
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(`CatFact API responded with status ${error.response.status}`);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response received from CatFact API');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(`Error setting up request: ${error.message}`);
    }
  }
}

// Example usage (can be in another file, e.g., src/index.ts)
// Un-comment the lines below to run directly with `ts-node src/catFactService.ts`
// (Don't forget to install axios: `npm install axios`)
// import { getRandomCatFact } from './catFactService';
//
// async function displayCatFact() {
//   try {
//     console.log('Fetching a random cat fact...');
//     const catFact = await getRandomCatFact();
//     console.log(`Cat Fact (${catFact.length} chars): ${catFact.fact}`);
//   } catch (error) {
//     console.error('Failed to fetch cat fact:', (error as Error).message);
//   }
// }
//
// displayCatFact();
