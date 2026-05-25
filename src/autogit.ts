// random-input.ts
//
// Compile with: tsc random-input.ts
// Run with:     node random-input.js
//
// It uses Node's built‑in readline module to get input from the terminal.

import { createInterface } from 'node:readline';
import { stdin, stdout } from 'node:process';

const rl = createInterface({
  input: stdin,
  output: stdout
});

function ask(question: string): Promise<string> {
  return new Promise(resolve => {
    rl.question(question, answer => resolve(answer.trim()));
  });
}

async function main() {
  console.log('Hey there! Let’s make a quick, random snippet.');

  const name = await ask('What’s your name? ');
  const color = await ask('What’s your favorite color? ');

  // A silly “joke” that sometimes drops the color out of the greeting
  const fate = Math.random() < 0.3 ? 'blue' : color;
  console.log(
    `Nice to meet you, ${name}. I have a feeling you’re as ${fate} as ever!`
  );

  rl.close();
}

main().catch(e => {
  console.error('Something went wrong:', e);
  rl.close();
});
