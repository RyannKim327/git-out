/**
 * Computes the factorial of a non‑negative integer `n` recursively.
 * @param n - A non‑negative integer (e.g., 0, 1, 2, …)
 * @returns n! as a `number`. For values beyond ≈ 170 you’ll hit the
 *          IEEE‑754 overflow limit and get `Infinity`, so for large
 *          inputs you might want to switch to BigInt.
 */
function factorial(n: number): number {
  if (n < 0) throw new Error('Negative numbers don’t have factorials');
  if (n <= 1) return 1;          // base case: 0! = 1! = 1
  return n * factorial(n - 1);   // recursive step
}
console.log(factorial(5));   // 120
console.log(factorial(0));   // 1
function bigIntFactorial(n: number): bigint {
  if (n < 0) throw new Error('Negative numbers don’t have factorials');
  if (n <= 1) return 1n;               // 1n is a BigInt literal
  return BigInt(n) * bigIntFactorial(n - 1);
}

console.log(bigIntFactorial(30).toString());
function tailFactorial(n: number, acc: number = 1): number {
  if (n <= 1) return acc;
  return tailFactorial(n - 1, acc * n);
}
