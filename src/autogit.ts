/**
 * Returns n! as a Number.
 * Throws if n is negative or not an integer.
 */
export function factorialIterative(n: number): number {
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError('factorial is defined for non‑negative integers only');
  }

  // 0! = 1 by definition
  if (n === 0) return 1;

  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
console.log(factorialIterative(5)); // 120
console.log(factorialIterative(0)); // 1
/**
 * Recursive factorial (Number version).
 * Beware of call‑stack limits for very large n (≈ 10⁴‑10⁵).
 */
export function factorialRecursive(n: number): number {
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError('factorial is defined for non‑negative integers only');
  }
  if (n <= 1) return 1;               // covers 0! and 1!
  return n * factorialRecursive(n - 1);
}
console.log(factorialRecursive(6)); // 720
/**
 * Factorial that returns a BigInt.
 * Works for arbitrarily large n (limited only by memory / time).
 */
export function factorialBigInt(n: number | bigint): bigint {
  // Normalise the argument to a bigint
  const N = typeof n === 'bigint' ? n : BigInt(n);

  if (N < 0n) {
    throw new RangeError('factorial is defined for non‑negative integers only');
  }

  // 0! = 1
  if (N === 0n) return 1n;

  let result = 1n;
  for (let i = 2n; i <= N; i++) {
    result *= i;
  }
  return result;
}
console.log(factorialBigInt(20).toString()); // "2432902008176640000"
console.log(factorialBigInt(100).toString().slice(0, 20) + '...'); // first 20 digits
// src/math/factorial.ts
export { factorialIterative, factorialRecursive, factorialBigInt };
// src/index.ts
import {
  factorialIterative,
  factorialRecursive,
  factorialBigInt,
} from './math/factorial';

function demo() {
  const n = 12;

  console.log(`${n}! (iterative) = ${factorialIterative(n)}`);
  console.log(`${n}! (recursive) = ${factorialRecursive(n)}`);

  // For a huge number, switch to BigInt
  const huge = 50;
  console.log(`${huge}! (bigint) = ${factorialBigInt(huge)}`);
}

demo();
12! (iterative) = 479001600
12! (recursive) = 479001600
50! (bigint) = 30414093201713378043612608166064768844377641568960512000000000000
// Number (fast, limited range)
factorialIterative(7);   // 5040

// Recursive (nice, but limited stack)
factorialRecursive(7);   // 5040

// BigInt (unlimited range, slower)
factorialBigInt(100);    // 9.3326e157 as a BigInt
