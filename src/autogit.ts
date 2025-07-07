import * as readline from 'readline';

// Create an interface for reading input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Ask the user for their name
rl.question('What is your name? ', (name: string) => {
  // Greet the user
  console.log(`Hello, ${name}!`);

  // Ask the user for their age
  rl.question('How old are you? ', (ageInput: string) => {
    const age: number = parseInt(ageInput, 10);
    
    if (isNaN(age)) {
      console.log('That does not seem to be a valid number.');
    } else {
      console.log(`You are ${age} years old.`);
    }

    // Close the input stream
    rl.close();
  });
});
