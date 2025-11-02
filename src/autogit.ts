function factorialIter(n: number): bigint {
  if (!Number.isInteger(n) || n < 0)
    throw new Error('n must be a non-negative integer');

  let result = 1n;                 // use BigInt to avoid overflow
  for (let i = 2n; i <= BigInt(n); i++) result *= i;
  return result;
}

console.log(String(factorialIter(20))); // 2432902008176640000
function factorialRec(n: number): bigint {
  if (!Number.isInteger(n) || n < 0)
    throw new Error('n must be a non-negative integer');
  if (n <= 1) return 1n;
  return BigInt(n) * factorialRec(n - 1);
}

console.log(String(factorialRec(20)));
