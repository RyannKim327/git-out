// Regular number factorial (fast for small n, but beware of JS number limits)
function factorialRecursive(n: number): number {
  if (n < 0)
    throw new Error('factorial is defined only for non‑negative integers');

  // the base case
  if (n === 0 || n === 1) return 1;

  // recursive call
  return n * factorialRecursive(n - 1);
}
// BigInt variant – no loss of precision up to very large n
function factorialRecursiveBigInt(n: bigint): bigint {
  if (n < 0n)
    throw new Error('factorial is defined only for non‑negative integers');

  if (n === 0n || n === 1n) return 1n;

  return n * factorialRecursiveBigInt(n - 1n);
}
console.log(factorialRecursive(5));          // 120
console.log(factorialRecursiveBigInt(20n));   // 2432902008176640000n
