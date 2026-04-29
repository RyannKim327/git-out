function factorialIterative(n: number): number {
  if (n < 0) throw new Error('Factorial is only defined for non‑negative integers');

  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
console.log(factorialIterative(5));   // 120
console.log(factorialIterative(0));   // 1
function factorialRecursive(n: number): number {
  if (n < 0) throw new Error('Factorial is only defined for non‑negative integers');
  if (n === 0 || n === 1) return 1;
  return n * factorialRecursive(n - 1);
}
function factorialBigInt(n: number): bigint {
  if (n < 0) throw new Error('Factorial is only defined for non‑negative integers');

  let result = 1n;          // `n` suffix makes it a BigInt literal
  for (let i = 2n; i <= BigInt(n); i++) {
    result *= i;
  }
  return result;
}
console.log(factorialBigInt(50).toString());
// 304140932655... (the full 50! value)
