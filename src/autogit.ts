/**
 * Returns n! for a non‑negative integer `n`.
 * Throws an error if `n` is negative.
 */
function factorialRecursive(n: number): number {
  if (n < 0) throw new Error('factorial is undefined for negative numbers');
  if (n === 0 || n === 1) return 1;   // base case
  return n * factorialRecursive(n - 1);
}
/**
 * Computes factorial using a loop. 
 * Safe up to n ~ 1e6 in V8 before CPU time becomes noticeable.
 */
function factorialIterative(n: number): number {
  if (n < 0) throw new Error('factorial is undefined for negative numbers');
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
/**
 * Factorial returning a BigInt to avoid precision loss.
 * Accepts `bigint | number`, but converts to BigInt internally.
 */
function factorialBigInt(n: number | bigint): bigint {
  const bigN = typeof n === 'bigint' ? n : BigInt(n);
  if (bigN < 0n) throw new Error('factorial is undefined for negative numbers');
  if (bigN <= 1n) return 1n;
  let result = 1n;
  for (let i = 2n; i <= bigN; i++) {
    result *= i;
  }
  return result;
}
console.log(factorialBigInt(25));          // 15511210043330985984000000n
console.log(factorialBigInt(100n));        // (the 100‑factorial as a BigInt)
const factorialCache = new Map<number, number>();

function factorialMemoized(n: number): number {
  if (n < 0) throw new Error('factorial is undefined for negative numbers');
  if (n === 0 || n === 1) return 1;
  if (factorialCache.has(n)) return factorialCache.get(n)!;

  const value = n * factorialMemoized(n - 1);
  factorialCache.set(n, value);
  return value;
}
const fact = (n: number) => (n > 1 ? n * fact(n - 1) : 1);
