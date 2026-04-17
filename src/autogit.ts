// randomGreeting.ts
//
// 1️⃣  Read one line of text from stdin
// 2️⃣  Pick a random greeting style
// 3️⃣  Print a personalised message
//

import { stdin, stdout } from 'process';

// A tiny helper that turns a promise into a line‑by‑line async iterator
async function* readLines(): AsyncGenerator<string> {
  let buffer = '';
  for await (const chunk of stdin) {
    buffer += chunk.toString();
    let *lines* = buffer.split('\n');
    buffer = lines.pop() ?? '';      // keep the unfinished part
    for (const line of lines) {
      yield line.trim();           // remove trailing CR / whitespace
    }
  }
  if (buffer) yield buffer.trim();   // last partial line
}

async function main() {
  // Ask for the user’s name
  stdout.write('👋 What is your name? ');
  const lines = readLines();

  // Wait for the first line entered by the user
  const name = (await lines.next()).value?.split(' ')[0] ?? 'there';

  // Some random greeting ideas
  const greetings = [
    `Hey ${name}, hope you’re having a stellar day!`,
    `Yo ${name}! Did you know that typing a byte is like shouting for your keyboard?`,
    `Greetings, ${name}! Keep calm and code on.`,
    `${name}, you’re the reason we write code in TypeScript!`,
    `Howdy ${name}! 🎉`
  ];

  // Pick one at random
  const choice = greetings[Math.floor(Math.random() * greetings.length)];

  stdout.write(`${choice}\n`);
}

main().catch(err => {
  console.error('Something went wrong:', err);
  process.exit(1);
});
$ node randomGreeting.js
👋 What is your name? Alice
Hey Alice, hope you’re having a stellar day!
