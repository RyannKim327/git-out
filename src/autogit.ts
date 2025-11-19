function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) {
    throw new Error("Factorial is only defined for non-negative integers.");
  }

  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Usage
console.log(factorial(5)); // 120
console.log(factorial(0)); // 1 (base case)
function factorialRecursive(n: number): number {
  if (n < 0 || !Number.isInteger(n)) {
    throw new Error("Factorial is only defined for non-negative integers.");
  }
  return n === 0 ? 1 : n * factorialRecursive(n - 1);
}

// Usage
console.log(factorialRecursive(5)); // 120
function factorialBigInt(n: bigint): bigint {
  if (n < 0n) throw new Error("Factorial is only defined for non-negative integers.");
  return n === 0n ? 1n : n * factorialBigInt(n - 1n);
}

// Usage (append 'n' to denote BigInt literals)
console.log(factorialBigInt(25n).toString()); // 15511210043330985984000000
