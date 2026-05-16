/**
 * Returns n! for a positive integer n (or 0).
 * Uses recursion – safe for small n, but can hit the call‑stack for big ones.
 */
export function factorialRecursive(n: number): number {
  if (n < 0) {
    throw new Error('Factorial is only defined for non‑negative integers');
  }
  // 0! = 1, and the recursion base case covers that
  if (n <= 1) return 1;
  return n * factorialRecursive(n - 1);
}
console.log(factorialRecursive(5)); // 120
console.log(factorialRecursive(0)); // 1
export function factorialIterative(n: number): number {
  if (n < 0) throw new Error('Factorial is only defined for non‑negative integers');

  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
export function factorialBigInt(n: number): bigint {
  if (n < 0) throw new Error('Factorial is only defined for non‑negative integers');

  let result = 1n; // BigInt literal
  for (let i = 2; i <= n; i++) {
    result *= BigInt(i);
  }
  return result;
}
console.log(factorialBigInt(20).toString()); // "2432902008176640000"
console.log(factorialBigInt(100).toString()); // 158‑digit number
const memo = new Map<number, number | bigint>();

export function factorialMemo(n: number, useBigInt = false): number | bigint {
  if (n < 0) throw new Error('Factorial is only defined for non‑negative integers');
  if (n <= 1) return useBigInt ? 1n : 1;

  const key = n;
  if (memo.has(key)) return memo.get(key)!;

  const res = useBigInt
    ? BigInt(n) * factorialMemo(n - 1, true)
    : n * factorialMemo(n - 1, false);

  memo.set(key, res);
  return res;
}
