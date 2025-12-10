// random.ts
// A tiny CLI that asks for your name and prints a random emoji greeting.

import * as readline from 'readline';

const emojis = ['🦄', '🐉', '🎲', '🌈', '🚀', '🔮', '🧩', '🎯'];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What is your name? ', (name: string) => {
  const pick = emojis[Math.floor(Math.random() * emojis.length)];
  console.log(`\n${pick}  Hello, ${name.trim()}! Your lucky emoji is ${pick}`);
  rl.close();
});
npx ts-node random.ts
