function factorialRecursive(n: number): number {
  // Validate input
  if (n < 0 || !Number.isInteger(n)) {
    throw new Error("Input must be a non-negative integer.");
  }

  // Base case: 0! = 1 and 1! = 1
  if (n === 0 || n === 1) {
    return 1;
  }
  
  // Recursive call
  return n * factorialRecursive(n - 1);
}

// Example usage
console.log(factorialRecursive(5)); // Output: 120
console.log(factorialRecursive(0)); // Output: 1
function factorialIterative(n: number): number {
  // Validate input
  if (n < 0 || !Number.isInteger(n)) {
    throw new Error("Input must be a non-negative integer.");
  }

  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Example usage
console.log(factorialIterative(6)); // Output: 720
console.log(factorialIterative(1)); // Output: 1
function factorialBigInt(n: bigint): bigint {
  if (n < 0n) throw new Error("BigInt input must be non-negative.");
  if (n === 0n || n === 1n) return 1n;
  return n * factorialBigInt(n - 1n);
}

// Example usage
console.log(factorialBigInt(20n)); // Output: 2432902008176640000n (exact)
