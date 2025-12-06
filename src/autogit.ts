// random.ts  (run with:  ts-node random.ts  or  deno run random.ts)
// A tiny “guess-the-number” game that asks the user for input.

import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

(async () => {
  const rl = readline.createInterface({ input, output });

  const secret = Math.floor(Math.random() * 100) + 1;
  let guess: number | null = null;
  let tries = 0;

  console.log('🎲  I have chosen a number between 1 and 100. Can you guess it?');

  while (guess !== secret) {
    const raw = await rl.question('Your guess: ');
    guess = parseInt(raw.trim(), 10);
    tries++;

    if (Number.isNaN(guess)) {
      console.log('❌  That is not a valid number.');
      continue;
    }

    if (guess < secret) console.log('📈  Too low!');
    else if (guess > secret) console.log('📉  Too high!');
    else console.log(`🎉  Correct! You needed ${tries} tries.`);
  }

  rl.close();
})();
