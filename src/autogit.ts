// random.ts  (run with:  ts-node random.ts)
// A tiny “guess-the-number” game that actually asks the user for input.

import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const secret = Math.floor(Math.random() * 100) + 1;

console.log('🎲  I have chosen a number between 1 and 100.  Can you guess it?');

function ask(): void {
  rl.question('Your guess: ', (answer) => {
    const guess = Number(answer.trim());
    if (isNaN(guess)) {
      console.log('❌  That is not a valid number.');
      return ask();
    }
    if (guess < secret) {
      console.log('📈  Too low!');
      return ask();
    }
    if (guess > secret) {
      console.log('📉  Too high!');
      return ask();
    }
    console.log('🎉  Correct!  Thanks for playing.');
    rl.close();
  });
}

ask();
