function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) {
    throw new Error('Input must be a non-negative integer');
  }

  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Usage
console.log(factorial(5)); // 120
function factorialBig(n: number): bigint {
  if (n < 0 || !Number.isInteger(n)) {
    throw new Error('Input must be a non-negative integer');
  }

  let result = 1n;
  for (let i = 2n; i <= BigInt(n); i++) {
    result *= i;
  }
  return result;
}

console.log(factorialBig(25)); // 15511210043330985984000000n
