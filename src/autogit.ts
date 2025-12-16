// main.ts
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Ask something
rl.question('Give me a comma-separated list of words: ', (answer: string) => {
  const choices = answer
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  if (choices.length === 0) {
    console.log('No words supplied. Bye.');
    rl.close();
    return;
  }

  // Pick one at random
  const randomIndex = Math.floor(Math.random() * choices.length);
  const winner = choices[randomIndex];

  console.log(`🎉 Random choice: ${winner}`);
  rl.close();
});
$ tsc main.ts
$ node main.js
Give me a comma-separated list of words: apple, banana, cherry
🎉 Random choice: banana
