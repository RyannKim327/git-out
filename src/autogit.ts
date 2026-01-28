function factorialRecursive(n: number): number {
  if (n < 0) throw new Error('Factorial is not defined for negative numbers');
  return n <= 1 ? 1 : n * factorialRecursive(n - 1);
}
console.log(factorialRecursive(5)); // 120
function factorialIterative(n: number): number {
  if (n < 0) throw new Error('Factorial is not defined for negative numbers');
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
function factorialBigInt(n: number): bigint {
  if (n < 0) throw new Error('Factorial is not defined for negative numbers');
  let result = 1n;
  for (let i = 2n; i <= BigInt(n); i++) {
    result *= i;
  }
  return result;
}
console.log(factorialBigInt(20));        // 2432902008176640000n
console.log(factorialBigInt(100));       // 9.332621544e+157n (full bigint printed)
const factorialMemo = (() => {
  const cache: Record<number, number> = {0: 1, 1: 1};

  const inner = (n: number): number => {
    if (n in cache) return cache[n];
    cache[n] = n * inner(n - 1);
    return cache[n];
  };

  return inner;
})();
console.assert(factorialIterative(0) === 1);
console.assert(factorialIterative(6) === 720);

console.assert(factorialBigInt(5).toString() === '120');
console.assert(factorialBigInt(30).toString().startsWith('265252859...'));
