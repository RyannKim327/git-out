// random-api.ts
// A tiny, self-contained example that hits a public API and does
// something mildly useful: fetch a random fact about cats and
// print it to the console.

import fetch from 'node-fetch'; // `npm i node-fetch` (v3+ needs ESM)

// 1. Type the payload we expect back from the API.
interface CatFact {
  fact: string;
  length: number;
}

// 2. A thin wrapper around the fetch call.
async function getRandomCatFact(): Promise<CatFact> {
  const response = await fetch('https://catfact.ninja/fact');
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return (await response.json()) as CatFact;
}

// 3. Consume the wrapper and add a pinch of randomness.
async function main(): Promise<void> {
  try {
    const { fact } = await getRandomCatFact();
    const coinFlip = Math.random() > 0.5;

    console.log(
      coinFlip
        ? `🐱  Did you know? ${fact}`
        : `📖  Cat fact of the day: ${fact}`
    );
  } catch (error) {
    console.error('Something went wrong:', (error as Error).message);
  }
}

// 4. Run only when the file is executed directly (not imported).
if (require.main === module) {
  main();
}

// 5. Export for unit-testing or reuse elsewhere.
export { getRandomCatFact, CatFact };
