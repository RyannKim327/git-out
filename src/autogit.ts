/**
 * Returns n! (n factorial) using a simple recursive algorithm.
 *
 * @param n - non‑negative integer (0, 1, 2, …)
 * @throws RangeError if n is negative or not an integer
 */
export function factorial(n: number): number {
  // ---- input validation ----------------------------------------------------
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError('factorial() only accepts non‑negative integers');
  }

  // ---- base case -----------------------------------------------------------
  if (n === 0) {
    return 1;
  }

  // ---- recursive step -------------------------------------------------------
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

  const helper = (current: number, acc: number): number => {
    if (current === 0) return acc;
    return helper(current - 1, current * acc);
  };

  return helper(n, 1);
}
/**
 * Iterative factorial – works for much larger n without blowing the stack.
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
 * Factorial using BigInt – exact for arbitrarily large n (limited only by memory).
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
console.log(factorial(5));               // 120
console.log(factorialTail(5));           // 120
console.log(factorialIterative(5));      // 120
console.log(factorialBigInt(25).toString());
// → "15511210043330985984000000"
function test() {
  const cases: [number, number][] = [
    [0, 1],
    [1, 1],
    [2, 2],
    [3, 6],
    [4, 24],
    [5, 120],
    [10, 3_628_800],
  ];

  for (const [input, expected] of cases) {
    const r1 = factorial(input);
    const r2 = factorialTail(input);
    const r3 = factorialIterative(input);
    if (r1 !== expected || r2 !== expected || r3 !== expected) {
      console.error(`FAIL for ${input}:`, { r1, r2, r3, expected });
      return;
    }
  }
  console.log('All tests passed ✅');
}
test();
