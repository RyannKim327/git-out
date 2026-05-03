// rock-paper-scissors.ts
import * as readline from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
});

async function play() {
  console.log('Rock, Paper, Scissors!');
  const human = (await rl.question('Your move (rock/paper/scissors): ')).trim().toLowerCase();

  const options = ['rock', 'paper', 'scissors'] as const;
  const comp = options[Math.floor(Math.random() * options.length)];

  console.log(`\nComputer chose: ${comp}\n`);

  const result =
    human === comp
      ? "It's a tie."
      : (human === 'rock' && comp === 'scissors') ||
        (human === 'paper' && comp === 'rock') ||
        (human === 'scissors' && comp === 'paper')
      ? 'You win!'
      : 'You lose!';

  console.log(result);
  rl.close();
}

play();
# 1. Install TypeScript locally (if you haven’t already)
npm install -D typescript

# 2. Compile the file
npx tsc rock-paper-scissors.ts --lib es2023,dom

# 3. Execute the compiled JS
node rock-paper-scissors.js
