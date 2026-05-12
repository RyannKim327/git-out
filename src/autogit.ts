/**
 * Compute n! recursively.
 *
 * Handles:
 *   - n >= 0   → valid
 *   - n < 0    → throws (factorial is undefined for negatives)
 *
 * Returns a number if the result fits in a JavaScript number,
 * otherwise returns a BigInt to avoid overflow.
 */
export function factorial(n: number | bigint): number | bigint {
  // Normalize input to a bigint for exact arithmetic
  const bigN = typeof n === 'bigint' ? n : BigInt(n);

  if (bigN < 0n) {
    throw new Error('Factorial is defined only for non‑negative integers.');
  }

  // Base case: 0! = 1 and 1! = 1
  if (bigN <= 1n) return 1n;

  // Recursive step
  const product = bigN * factorial(bigN - 1n);

  // Return a standard Number when it’s mathematically safe
  // (anything that fits within 2^53‑1).
  if (product <= BigInt(Number.MAX_SAFE_INTEGER)) {
    return Number(product);
  }

  // Otherwise keep it as a BigInt.
  return product;
}
import { factorial } from './factorial';

console.log(factorial(5));   // 120          (returns a number)
console.log(factorial(20));  // 2432902008176640000  (returns a number)
console.log(factorial(50));  // BigInt(304140932...)
// if you prefer a string for extremely large results:
console.log(factorial(50).toString());
