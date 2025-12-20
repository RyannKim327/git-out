n! = 1                     if n = 0
n! = n × (n‑1)!            if n > 0
/**
 * Returns n! (the factorial of n) as a number.
 *
 * @param n - A non‑negative integer (0, 1, 2, …)
 * @throws {RangeError} if n is negative or not an integer
 * @returns factorial of n
 */
export function factorial(n: number): number {
  // ---- validation ---------------------------------------------------------
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError('factorial() only accepts non‑negative integers');
  }

  // ---- base case -----------------------------------------------------------
  if (n === 0) {
    return 1;               // 0! = 1 by definition
  }

  // ---- recursive step ------------------------------------------------------
  return n * factorial(n - 1);
}
/**
 * Tail‑recursive factorial.
 *
 * @param n - non‑negative integer
 * @returns n!
 */
export function factorialTail(n: number): number {
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError('factorialTail() only accepts non‑negative integers');
  }

  // inner helper that carries the accumulator
  function helper(x: number, acc: number): number {
    if (x === 0) {
      return acc;           // accumulator holds the result
    }
    return helper(x - 1, x * acc);
  }

  return helper(n, 1);
}
/**
 * Iterative factorial – O(1) stack usage.
 *
 * @param n - non‑negative integer
 * @returns n!
 */
export function factorialIterative(n: number): number {
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError('factorialIterative() only accepts non‑negative integers');
  }

  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
/**
 * Factorial using BigInt – works for arbitrarily large n (limited by memory).
 *
 * @param n - non‑negative integer (as a regular number)
 * @returns n! as a BigInt
 */
export function factorialBigInt(n: number): bigint {
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError('factorialBigInt() only accepts non‑negative integers');
  }

  let result = 1n;
  for (let i = 2n; i <= BigInt(n); i++) {
    result *= i;
  }
  return result;
}
// ---- import the functions (if you placed them in a module) ----
// import { factorial, factorialTail, factorialIterative, factorialBigInt } from './factorial';

// Simple test harness
function test() {
  const values = [0, 1, 5, 10, 20];

  console.log('=== Number based (recursive) ===');
  for (const v of values) console.log(`${v}! = ${factorial(v)}`);

  console.log('\n=== Tail‑recursive ===');
  for (const v of values) console.log(`${v}! = ${factorialTail(v)}`);

  console.log('\n=== Iterative ===');
  for (const v of values) console.log(`${v}! = ${factorialIterative(v)}`);

  console.log('\n=== BigInt (large n) ===');
  const big = 30; // 30! still fits in Number, but we show BigInt usage
  console.log(`${big}! = ${factorialBigInt(big).toString()}`);

  // Uncomment to see overflow with Number:
  // console.log('170! =', factorialIterative(170)); // safe
  // console.log('171! =', factorialIterative(171)); // > Number.MAX_SAFE_INTEGER
}
test();
=== Number based (recursive) ===
0! = 1
1! = 1
5! = 120
10! = 3628800
20! = 2432902008176640000

=== Tail‑recursive ===
0! = 1
1! = 1
5! = 120
10! = 3628800
20! = 2432902008176640000

=== Iterative ===
0! = 1
1! = 1
5! = 120
10! = 3628800
20! = 2432902008176640000

=== BigInt (large n) ===
30! = 265252859812191058636308480000000
export function factorial(n: number): number {
  if (!Number.isInteger(n) || n < 0) throw new RangeError('non‑negative integer required');
  return n === 0 ? 1 : n * factorial(n - 1);
}
