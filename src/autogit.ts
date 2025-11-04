// random.ts  –  a tiny “guess-the-number” game
// run:  npx ts-node random.ts

import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const secret = Math.floor(Math.random() * 100) + 1;
let tries = 0;

console.log('I have chosen a number between 1 and 100. Can you guess it?');

function ask(): void {
  rl.question('Your guess: ', (answer) => {
    tries++;
    const guess = Number(answer);

    if (isNaN(guess)) {
      console.log('That is not a valid number.');
      return ask();
    }

    if (guess === secret) {
      console.log(`🎉  Correct! You needed ${tries} tries.`);
      rl.close();
    } else {
      console.log(guess < secret ? 'Too low!' : 'Too high!');
      ask();
    }
  });
}

ask();
