import * as readline from 'readline';

// Create interface for reading input from console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Ask the user for their name
rl.question('Enter your name: ', (name: string) => {
  // Ask the user for their age
  rl.question('Enter your age: ', (ageInput: string) => {
    const age = parseInt(ageInput, 10);
    if (isNaN(age)) {
      console.log('That does not seem to be a valid age.');
    } else {
      console.log(`Hello, ${name}! You are ${age} years old.`);
    }
    rl.close();
  });
});
