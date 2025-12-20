// random-input-demo.ts
// ---------------------------------------------------
// A quirky little program that:
//   1️⃣ Reads a line of text from the user.
//   2️⃣ Generates a random “secret code” based on that text.
//   3️⃣ Prints the original text, the secret code, and a fun fact.
// ---------------------------------------------------

import * as readline from 'readline';
import { randomInt } from 'crypto';

// Helper: turn a string into a numeric seed (simple hash)
function stringToSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    // bitwise left‑rotate + char code
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0; // force 32‑bit integer
  }
  return Math.abs(hash);
}

// Helper: produce a “secret code” – a 6‑character alphanumeric string
function generateSecretCode(seed: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  // Use the seed to create a deterministic pseudo‑random sequence
  let rng = seed;
  for (let i = 0; i < 6; i++) {
    // simple linear congruential generator step
    rng = (rng * 1664525 + 1013904223) % 0x100000000;
    const idx = rng % chars.length;
    code += chars[idx];
  }
  return code;
}

// Helper: a tiny “fun fact” generator
function randomFunFact(): string {
  const facts = [
    "Honey never spoils.",
    "A group of flamingos is called a 'flamboyance'.",
    "Octopuses have three hearts.",
    "Bananas are berries, but strawberries aren’t.",
    "There are more stars in the universe than grains of sand on Earth."
  ];
  return facts[randomInt(facts.length)];
}

// ---------------------------------------------------
// Main logic – set up readline interface
// ---------------------------------------------------
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('🖊️  Enter any phrase you like: ', (answer) => {
  const trimmed = answer.trim();

  // 1️⃣ Turn the input into a numeric seed
  const seed = stringToSeed(trimmed);

  // 2️⃣ Generate a deterministic secret code from that seed
  const secret = generateSecretCode(seed);

  // 3️⃣ Pick a random fun fact (unrelated to the seed)
  const fact = randomFunFact();

  console.log('\n=== Your Random Output ===');
  console.log(`🔤  Original text : "${trimmed}"`);
  console.log(`🔐  Secret code   : ${secret}`);
  console.log(`💡  Fun fact      : ${fact}`);
  console.log('==========================\n');

  rl.close();
});
