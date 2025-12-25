/**
 * Returns n! (factorial of n) as a number.
 * Works for n up to about 170 (beyond that Number overflows to Infinity).
 *
 * @param n - non‑negative integer
 * @throws RangeError if n is negative or not an integer
 */
function factorialIterative(n: number): number {
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError('factorial is defined for non‑negative integers only');
  }

  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Example
console.log(factorialIterative(5)); // 120
/**
 * Recursive factorial – elegant but limited by the call‑stack size.
 *
 * @param n - non‑negative integer
 * @throws RangeError if n is negative or not an integer
 */
function factorialRecursive(n: number): number {
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError('factorial is defined for non‑negative integers only');
  }
  if (n === 0 || n === 1) return 1;
  return n * factorialRecursive(n - 1);
}

// Example
console.log(factorialRecursive(6)); // 720
/**
 * Factorial that returns a BigInt, allowing results far larger than Number.MAX_SAFE_INTEGER.
 *
 * @param n - non‑negative integer (as a regular number)
 * @returns n! as a BigInt
 * @throws RangeError if n is negative or not an integer
 */
function factorialBigInt(n: number): bigint {
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError('factorial is defined for non‑negative integers only');
  }

  let result = 1n; // note the "n" suffix → BigInt literal
  for (let i = 2; i <= n; i++) {
    result *= BigInt(i);
  }
  return result;
}

// Example
console.log(factorialBigInt(20).toString()); // "2432902008176640000"
console.log(factorialBigInt(100).toString().slice(0, 20) + '...'); // first 20 digits of 100!
// factorial.ts
export type FactorialResult = number | bigint;

/**
 * Validate that n is a non‑negative integer.
 */
function assertNonNegativeInteger(n: number): void {
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError('factorial is defined for non‑negative integers only');
  }
}

/**
 * Iterative version returning a Number.
 */
export function factorialIterative(n: number): number {
  assertNonNegativeInteger(n);
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

/**
 * Recursive version returning a Number.
 */
export function factorialRecursive(n: number): number {
  assertNonNegativeInteger(n);
  return n <= 1 ? 1 : n * factorialRecursive(n - 1);
}

/**
 * BigInt version – safe for arbitrarily large n.
 */
export function factorialBigInt(n: number): bigint {
  assertNonNegativeInteger(n);
  let result = 1n;
  for (let i = 2; i <= n; i++) result *= BigInt(i);
  return result;
}

/**
 * Convenience wrapper that picks the appropriate implementation.
 *
 * @param n - non‑negative integer
 * @param useBigInt - if true, returns a BigInt; otherwise a Number (may overflow)
 */
export function factorial(n: number, useBigInt = false): FactorialResult {
  return useBigInt ? factorialBigInt(n) : factorialIterative(n);
}
import { factorial, factorialBigInt } from './factorial';

console.log(factorial(7));               // 5040 (Number)
console.log(factorial(7, true));         // 5040n (BigInt)
console.log(factorialBigInt(150).toString()); // huge number as a string
for (let i = 0; i <= 20; i++) {
  const a = factorialIterative(i);
  const b = factorialRecursive(i);
  const c = Number(factorialBigInt(i)); // safe up to 20!
  console.assert(a === b && a === c, `Mismatch at ${i}`);
}
console.log('All checks passed!');
// Simple iterative factorial (Number)
function factorial(n: number): number {
  if (!Number.isInteger(n) || n < 0) throw new RangeError('n must be a non‑negative integer');
  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}
function factorialBig(n: number): bigint {
  if (!Number.isInteger(n) || n < 0) throw new RangeError('n must be a non‑negative integer');
  let result = 1n;
  for (let i = 2; i <= n; i++) result *= BigInt(i);
  return result;
}
