// Simple calculator that takes user input
import * as readline from 'readline';

interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
  multiply(a: number, b: number): number;
  divide(a: number, b: number): number;
}

class BasicCalculator implements Calculator {
  add(a: number, b: number): number {
    return a + b;
  }

  subtract(a: number, b: number): number {
    return a - b;
  }

  multiply(a: number, b: number): number {
    return a * b;
  }

  divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error("Cannot divide by zero!");
    }
    return a / b;
  }
}

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getUserInput(): Promise<{ num1: number; num2: number; operation: string }> {
  return new Promise((resolve) => {
    rl.question('Enter first number: ', (num1Input) => {
      rl.question('Enter second number: ', (num2Input) => {
        rl.question('Enter operation (+, -, *, /): ', (operation) => {
          const num1 = parseFloat(num1Input);
          const num2 = parseFloat(num2Input);
          resolve({ num1, num2, operation });
        });
      });
    });
  });
}

async function runCalculator(): Promise<void> {
  const calculator = new BasicCalculator();
  
  try {
    const { num1, num2, operation } = await getUserInput();
    
    if (isNaN(num1) || isNaN(num2)) {
      console.log('Please enter valid numbers!');
      return;
    }

    let result: number;
    
    switch (operation) {
      case '+':
        result = calculator.add(num1, num2);
        break;
      case '-':
        result = calculator.subtract(num1, num2);
        break;
      case '*':
        result = calculator.multiply(num1, num2);
        break;
      case '/':
        result = calculator.divide(num1, num2);
        break;
      default:
        console.log('Invalid operation! Please use +, -, *, or /');
        return;
    }
    
    console.log(`Result: ${num1} ${operation} ${num2} = ${result}`);
    
  } catch (error) {
    if (error instanceof Error) {
      console.log('Error:', error.message);
    } else {
      console.log('An unexpected error occurred');
    }
  } finally {
    rl.close();
  }
}

// Run the calculator
console.log('Welcome to the TypeScript Calculator!');
runCalculator();
