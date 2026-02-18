/**
 * Factorial using recursion.
 * Works for ordinary numbers up to 20 (safe integer range).
 * If you need bigger results, use BigInt and the overload below.
 */
function factorial(n: number): number {
  if (n < 0) throw new Error("Negative values are not allowed");
  if (n <= 1) return 1;          // base case
  return n * factorial(n - 1);   // recursive step
}

/**
 * A BigInt version for arbitrary‑size factorials.
 */
function factorialBigInt(n: bigint): bigint {
  if (n < 0n) throw new Error("Negative values are not allowed");
  if (n <= 1n) return 1n;
  return n * factorialBigInt(n - 1n);
}
console.log(factorial(5));          // 120
console.log(factorialBigInt(25n));  // 15511210043330985984000000n
