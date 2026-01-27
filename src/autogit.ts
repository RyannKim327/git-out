// factorial.ts
import readline from 'readline';

// Utility that returns the factorial of a non‑negative integer
function factorial(n: number): number {
  if (n < 0) throw new Error('Number must be non‑negative');
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

// Set up a readline interface to read from stdin
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Ask the user for a number
rl.question('Enter a non‑negative integer: ', (answer) => {
  const num = Number(answer.trim());

  if (Number.isNaN(num) || !Number.isInteger(num)) {
    console.log(`"${answer}" is not a valid integer.`);
  } else {
    try {
      const result = factorial(num);
      console.log(`Factorial of ${num} is ${result}`);
    } catch (e) {
      console.log(e.message);
    }
  }

  rl.close();
});
npm install --save-dev @types/node
npx ts-node factorial.ts
tsc factorial.ts   # produces factorial.js
node factorial.js
