/**
 * Returns n! (n factorial) using simple recursion.
 * Throws if n is negative or not an integer.
 *
 * @param n - non‑negative integer
 * @returns factorial of n as a number
 */
export function factorialRecursive(n: number): number {
  // ----- input validation -------------------------------------------------
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError('factorial is defined only for non‑negative integers');
  }

  // ----- base case --------------------------------------------------------
  if (n === 0 || n === 1) return 1;

  // ----- recursive step ----------------------------------------------------
  return n * factorialRecursive(n - 1);
}
/**
 * Returns n! using an explicit loop.
 * Works up to the largest safe integer (Number.MAX_SAFE_INTEGER ≈ 9e15).
 *
 * @param n - non‑negative integer
 * @returns factorial of n as a number
 */
export function factorialIterative(n: number): number {
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError('factorial is defined only for non‑negative integers');
  }

  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
/**
 * Returns n! as a BigInt.
 * No overflow worries – limited only by memory.
 *
 * @param n - non‑negative integer (as number or bigint)
 * @returns factorial of n as a BigInt
 */
export function factorialBigInt(n: number | bigint): bigint {
  // Normalise the argument to a bigint
  const bn = typeof n === 'bigint' ? n : BigInt(n);

  if (bn < 0n) {
    throw new RangeError('factorial is defined only for non‑negative integers');
  }

  // 0! = 1
  if (bn === 0n) return 1n;

  let result = 1n;
  for (let i = 2n; i <= bn; i++) {
    result *= i;
  }
  return result;
}
console.log(factorialBigInt(20).toString()); // "2432902008176640000"
console.log(factorialBigInt(100n).toString().slice(0, 20) + '…'); // first 20 digits
import { factorialRecursive, factorialIterative, factorialBigInt } from './factorial';

// Helper to format bigints nicely
const format = (value: number | bigint) => value.toString();

const testValues = [0, 1, 5, 10, 20, 30]; // feel free to add more

for (const n of testValues) {
  console.log(`--- n = ${n} ---`);
  console.log('recursive :', format(factorialRecursive(n)));
  console.log('iterative :', format(factorialIterative(n)));
  console.log('bigint    :', format(factorialBigInt(n)));
  console.log('');
}

// Very large factorial (only bigint works)
const huge = 100; // try 1000, 5000, etc.
console.log(`${huge}! (bigint) =`, factorialBigInt(huge).toString().slice(0, 30) + '…');
# If you have ts-node installed
npx ts-node factorial-demo.ts

# Or compile first:
tsc factorial-demo.ts && node factorial-demo.js
const factorial = (n: number): number =>
  n < 0 || !Number.isInteger(n) ? NaN
  : [...Array(n).keys()].map(i => i + 1).reduce((a, b) => a * b, 1);
