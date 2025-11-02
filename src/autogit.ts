import * as readline from 'readline';

// Interface for the user data
interface User {
  name: string;
  age: number;
  email: string;
}

class InputHandler {
  private rl: readline.Interface;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  // Generic function to get input from user
  private async getInput(prompt: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(prompt, (answer) => {
        resolve(answer);
      });
    });
  }

  // Function to get user information
  async getUserInfo(): Promise<User> {
    console.log('=== Please enter your information ===');
    
    const name = await this.getInput('Enter your name: ');
    const ageInput = await this.getInput('Enter your age: ');
    const email = await this.getInput('Enter your email: ');

    const age = parseInt(ageInput);
    
    if (isNaN(age) || age < 0 || age > 150) {
      throw new Error('Invalid age entered');
    }

    if (!this.isValidEmail(email)) {
      throw new Error('Invalid email format');
    }

    return {
      name: name.trim(),
      age: age,
      email: email.trim().toLowerCase()
    };
  }

  // Simple email validation
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Function to handle number guessing game
  async numberGuessingGame(): Promise<void> {
    const secretNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;
    let guessed = false;

    console.log('\n🎮 Welcome to the Number Guessing Game!');
    console.log('I\'m thinking of a number between 1 and 100.');

    while (!guessed && attempts < 10) {
      const guessInput = await this.getInput(`\nAttempt ${attempts + 1}/10 - Enter your guess: `);
      const guess = parseInt(guessInput);

      if (isNaN(guess)) {
        console.log('❌ Please enter a valid number!');
        continue;
      }

      attempts++;

      if (guess === secretNumber) {
        console.log(`🎉 Congratulations! You guessed the number in ${attempts} attempts!`);
        guessed = true;
      } else if (guess < secretNumber) {
        console.log('📈 Too low! Try a higher number.');
      } else {
        console.log('📉 Too high! Try a lower number.');
      }
    }

    if (!guessed) {
      console.log(`😔 Game over! The number was ${secretNumber}`);
    }
  }

  // Main function to run the program
  async run(): Promise<void> {
    try {
      // Get user information
      const user = await this.getUserInfo();
      console.log('\n✅ User information saved:');
      console.log(`Name: ${user.name}`);
      console.log(`Age: ${user.age}`);
      console.log(`Email: ${user.email}`);

      // Play the game
      await this.numberGuessingGame();

    } catch (error) {
      if (error instanceof Error) {
        console.error(`❌ Error: ${error.message}`);
      } else {
        console.error('❌ An unknown error occurred');
      }
    } finally {
      this.rl.close();
    }
  }
}

// Function to demonstrate array operations with user input
async function demonstrateArrayOperations(): Promise<void> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const getInput = (prompt: string): Promise<string> => {
    return new Promise((resolve) => {
      rl.question(prompt, resolve);
    });
  };

  console.log('\n📝 Array Operations Demo');
  const numbers: number[] = [];
  
  console.log('Enter 5 numbers:');
  for (let i = 0; i < 5; i++) {
    const input = await getInput(`Number ${i + 1}: `);
    const num = parseFloat(input);
    
    if (!isNaN(num)) {
      numbers.push(num);
    } else {
      console.log('Invalid number, skipping...');
    }
  }

  // Perform operations on the array
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  const average = sum / numbers.length;
  const max = Math.max(...numbers);
  const min = Math.min(...numbers);

  console.log('\n📊 Results:');
  console.log(`Numbers: [${numbers.join(', ')}]`);
  console.log(`Sum: ${sum}`);
  console.log(`Average: ${average.toFixed(2)}`);
  console.log(`Maximum: ${max}`);
  console.log(`Minimum: ${min}`);

  rl.close();
}

// Run the program
async function main(): Promise<void> {
  const inputHandler = new InputHandler();
  await inputHandler.run();
  await demonstrateArrayOperations();
}

// Start the program
main().catch(console.error);
