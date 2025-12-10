function factorial(n: number): number {
  if (!Number.isInteger(n)) throw new TypeError('n must be an integer');
  if (n < 0) throw new RangeError('n must be non-negative');
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Examples
console.log(factorial(5)); // 120
console.log(factorial(0)); // 1
function factorialBigInt(n: number): bigint {
  if (!Number.isInteger(n)) throw new TypeError('n must be an integer');
  if (n < 0) throw new RangeError('n must be non-negative');
  let result = 1n;
  for (let i = 2; i <= n; i++) {
    result *= BigInt(i);
  }
  return result;
}

// Examples
console.log(factorialBigInt(20).toString()); // "2432902008176640000"
console.log(factorialBigInt(0).toString());  // "1"
