import * as readline from 'readline';

// Create interface for reading input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Generate random number between 1-100
const secretNumber: number = Math.floor(Math.random() * 100) + 1;
let attempts: number = 0;

console.log("Guess the number between 1 and 100!");

function askGuess(): void {
  rl.question('Enter your guess: ', (input: string) => {
    attempts++;
    
    // Convert input to number and validate
    const guess: number = parseInt(input.trim());

    if (isNaN(guess)) {
      console.log('Please enter a valid number!');
      askGuess();
      return;
    }

    // Game logic
    if (guess === secretNumber) {
      console.log(`Correct! You guessed it in ${attempts} attempts.`);
      rl.close();
    } else if (guess < secretNumber) {
      console.log('Too low! Try again.');
      askGuess();
    } else {
      console.log('Too high! Try again.');
      askGuess();
    }
  });
}

// Start the game
askGuess();
npm install @types/node
tsc guessing-game.ts
node guessing-game.js
Guess the number between 1 and 100!
Enter your guess: 50
Too high! Try again.
Enter your guess: 25
Too low! Try again.
Enter your guess: 37
Correct! You guessed it in 3 attempts.
