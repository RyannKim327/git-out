// Returns n! for n >= 0.
function factorial(n: number): number {
  if (n < 0) throw new Error('Negative numbers don’t have factorials!');
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
function factorialIter(n: number): number {
  if (n < 0) throw new Error('Negative numbers don’t have factorials!');
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
function factorialBigInt(n: number): bigint {
  if (n < 0) throw new Error('Negative numbers don’t have factorials!');
  let result = 1n;              // 1n is a BigInt literal
  for (let i = 2n; i <= BigInt(n); i++) {
    result *= i;
  }
  return result;
}
console.log(factorialBigInt(20)); // 2432902008176640000n
const memo: Record<number, number> = { 0: 1, 1: 1 };

function memoisedFactorial(n: number): number {
  if (n < 0) throw new Error('Negative numbers don’t have factorials!');
  if (n in memo) return memo[n];
  memo[n] = n * memoisedFactorial(n - 1);
  return memo[n];
}
