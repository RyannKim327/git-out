function factorialRec(n: number): number {
  if (n < 0) throw new Error('Factorial is not defined for negative numbers');
  if (n <= 1) return 1;           // base case: 0! = 1, 1! = 1
  return n * factorialRec(n - 1);
}
function factorialIter(n: number): number {
  if (n < 0) throw new Error('Factorial is not defined for negative numbers');
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
function factorialBig(n: bigint): bigint {
  if (n < 0n) throw new Error('Factorial is not defined for negative numbers');
  let result = 1n;
  for (let i = 2n; i <= n; i++) {
    result *= i;
  }
  return result;
}
console.log(factorialIter(5));        // 120
console.log(factorialRec(5));         // 120
console.log(factorialBig(20n));       // 2432902008176640000n
