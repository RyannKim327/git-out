factorial(0) = 1
factorial(n) = n * factorial(n‑1)   for n > 0
/**
 * Returns n! (n factorial) using a simple recursive algorithm.
 *
 * @param n - A non‑negative integer.
 * @throws {RangeError} if n is negative or not an integer.
 * @returns The factorial of n as a number.
 */
export function factorial(n: number): number {
  // ---- Input validation ----------------------------------------------------
  if (!Number.isInteger(n)) {
    throw new RangeError('factorial() only accepts integer values.');
  }
  if (n < 0) {
    throw new RangeError('factorial() is undefined for negative numbers.');
  }

  // ---- Base case -----------------------------------------------------------
  if (n === 0) {
    return 1;
  }

  // ---- Recursive case ------------------------------------------------------
  return n * factorial(n - 1);
}
import { factorial } from './factorial';

console.log(factorial(5)); // 120
console.log(factorial(0)); // 1
/**
 * Tail‑recursive factorial.
 *
 * @param n - Non‑negative integer.
 * @param acc - Accumulator (should be omitted by callers).
 */
export function factorialTail(n: number, acc: number = 1): number {
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError('factorialTail() expects a non‑negative integer.');
  }

  if (n === 0) {
    return acc;
  }

  // Tail call: the recursive call is the *last* operation.
  return factorialTail(n - 1, n * acc);
}
console.log(factorialTail(6)); // 720
/**
 * Factorial using `bigint` – works for arbitrarily large n (limited only by memory).
 *
 * @param n - Non‑negative integer (as a regular number or bigint).
 * @returns n! as a bigint.
 */
export function factorialBigInt(n: number | bigint): bigint {
  const bn = typeof n === 'bigint' ? n : BigInt(n);

  if (bn < 0n) {
    throw new RangeError('factorialBigInt() does not accept negative numbers.');
  }

  // Base case
  if (bn === 0n) {
    return 1n;
  }

  // Recursive step (still tail‑recursive for consistency)
  return bn * factorialBigInt(bn - 1n);
}
console.log(factorialBigInt(25).toString()); // "15511210043330985984000000"
// factorial.ts ---------------------------------------------------------------

/**
 * Simple recursive factorial (number).
 */
export function factorial(n: number): number {
  if (!Number.isInteger(n)) {
    throw new RangeError('factorial() only accepts integer values.');
  }
  if (n < 0) {
    throw new RangeError('factorial() is undefined for negative numbers.');
  }
  return n === 0 ? 1 : n * factorial(n - 1);
}

/**
 * Tail‑recursive factorial (number).
 */
export function factorialTail(n: number, acc: number = 1): number {
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError('factorialTail() expects a non‑negative integer.');
  }
  return n === 0 ? acc : factorialTail(n - 1, n * acc);
}

/**
 * Factorial using bigint (arbitrary precision).
 */
export function factorialBigInt(n: number | bigint): bigint {
  const bn = typeof n === 'bigint' ? n : BigInt(n);
  if (bn < 0n) {
    throw new RangeError('factorialBigInt() does not accept negative numbers.');
  }
  return bn === 0n ? 1n : bn * factorialBigInt(bn - 1n);
}
// factorial.test.ts
import { factorial, factorialTail, factorialBigInt } from './factorial';

describe('factorial (number)', () => {
  test('0! = 1', () => expect(factorial(0)).toBe(1));
  test('5! = 120', () => expect(factorial(5)).toBe(120));
  test('throws on negative', () => expect(() => factorial(-3)).toThrow(RangeError));
  test('throws on non‑integer', () => expect(() => factorial(2.5)).toThrow(RangeError));
});

describe('factorialTail (number)', () => {
  test('6! = 720', () => expect(factorialTail(6)).toBe(720));
});

describe('factorialBigInt', () => {
  test('25! matches known value', () => {
    const expected = BigInt('15511210043330985984000000');
    expect(factorialBigInt(25)).toBe(expected);
  });
});
const fact = (n: number): number => (n <= 1 ? 1 : n * fact(n - 1));
