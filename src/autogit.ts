// factorial.ts
import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

function factorial(n: number): bigint {
  if (n < 0) throw new Error('Negative numbers aren’t supported');
  return n <= 1 ? BigInt(1) : BigInt(n) * factorial(n - 1);
}

rl.question('Enter a non‑negative integer: ', (answer) => {
  const num = Number(answer.trim());
  if (!Number.isInteger(num) || num < 0) {
    console.log('That’s not a valid non‑negative integer.');
  } else {
    console.log(`Factorial of ${num} is ${factorial(num).toString()}`);
  }
  rl.close();
});
