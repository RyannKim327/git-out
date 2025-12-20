/**
 * Returns n! (n factorial) using plain recursion.
 * Works for 0 ≤ n ≤ 20 (beyond that the result exceeds Number.MAX_SAFE_INTEGER).
 *
 * @param n - non‑negative integer
 * @throws RangeError if n is negative or not an integer
 */
function factorialRecursive(n: number): number {
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError('factorial is defined for non‑negative integers only');
  }

  // Base case
  if (n === 0 || n === 1) return 1;

  // Recursive step
  return n * factorialRecursive(n - 1);
}

// Example
console.log(factorialRecursive(5)); // 120
/**
 * Returns n! using an iterative loop.
 * Safer for larger n because it never builds a deep call stack.
 *
 * @param n - non‑negative integer
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
console.log(factorialIterative(10)); // 3628800
/**
 * Tail‑recursive factorial.
 *
 * @param n - non‑negative integer
 * @param acc - accumulator (should be omitted by callers)
 */
function factorialTailRecursive(n: number, acc: number = 1): number {
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError('factorial is defined for non‑negative integers only');
  }

  if (n === 0) return acc;
  return factorialTailRecursive(n - 1, n * acc);
}

// Example
console.log(factorialTailRecursive(7)); // 5040
/**
 * Factorial that returns a BigInt, capable of handling very large n.
 *
 * @param n - non‑negative integer (as a regular number)
 */
function factorialBigInt(n: number): bigint {
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError('factorial is defined for non‑negative integers only');
  }

  let result = 1n; // start with a BigInt literal
  for (let i = 2; i <= n; i++) {
    result *= BigInt(i); // convert each i to BigInt before multiplication
  }
  return result;
}

// Example
console.log(factorialBigInt(25).toString());
// → "15511210043330985984000000"
// factorial.ts
export function factorial(
  n: number,
  options?: { useBigInt?: boolean; method?: 'recursive' | 'iterative' | 'tail' }
): number | bigint {
  const useBigInt = options?.useBigInt ?? false;
  const method = options?.method ?? (useBigInt ? 'iterative' : 'iterative');

  if (useBigInt) {
    // delegate to the BigInt implementation (iterative is simplest)
    return factorialBigInt(n);
  }

  switch (method) {
    case 'recursive':
      return factorialRecursive(n);
    case 'tail':
      return factorialTailRecursive(n);
    case 'iterative':
    default:
      return factorialIterative(n);
  }
}

// Export the individual helpers if you need them directly
export {
  factorialRecursive,
  factorialIterative,
  factorialTailRecursive,
  factorialBigInt,
};
import { factorial } from './factorial';

console.log(factorial(6));                     // 720 (number)
console.log(factorial(6, { method: 'recursive' })); // 720
console.log(factorial(30, { useBigInt: true }));    // 265252859812191058636308480000000n
function factorial(n: number, useBigInt = false): number | bigint {
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError('n must be a non‑negative integer');
  }

  if (useBigInt) {
    let result = 1n;
    for (let i = 2; i <= n; i++) result *= BigInt(i);
    return result;
  }

  let result = 1;
  for (let i = 2; i <= n; i++) result *= i;
  return result;
}

// Demo
console.log(factorial(5));               // 120
console.log(factorial(25, true).toString());
// → "15511210043330985984000000"
