// src/services/catFactService.ts
import axios, { AxiosResponse } from 'axios';

interface CatFact {
  fact: string;
  length: number;
}

/**
 * Fetches a random cat fact from the public API.
 * @returns Promise<string> – the fact text.
 * @throws {Error} if the request fails.
 */
export async function getRandomCatFact(): Promise<string> {
  try {
    const response: AxiosResponse<CatFact> = await axios.get(
      'https://catfact.ninja/fact',
      { timeout: 5000 }
    );
    return response.data.fact;
  } catch (err: any) {
    // Normalize any error into something consumer code can expect
    throw new Error(
      err.response?.data?.message || err.message || 'Failed to fetch cat fact'
    );
  }
}

/* ------------------------------------------------------------------ */
/* Example usage (uncomment to run)                                   */
/* ------------------------------------------------------------------ */
// (async () => {
//   try {
//     const fact = await getRandomCatFact();
//     console.log('🐱  Random cat fact:', fact);
//   } catch (e) {
//     console.error('💥  Error:', (e as Error).message);
//   }
// })();
