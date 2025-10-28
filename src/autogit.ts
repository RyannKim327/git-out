function factorial(n: number): number {
  // Base case: factorial of 0 or 1 is 1
  if (n <= 1) {
    return 1;
  }
  // Recursive case: n! = n × (n-1)!
  return n * factorial(n - 1);
}

// Example usage
console.log(factorial(5)); // Output: 120
console.log(factorial(0)); // Output: 1
function factorial(n: number): number {
  // Handle negative numbers
  if (n < 0) {
    throw new Error("Factorial is not defined for negative numbers");
  }
  
  // Base case
  if (n <= 1) {
    return 1;
  }
  
  // Recursive case
  return n * factorial(n - 1);
}

// Example with error handling
try {
  console.log(factorial(5));  // 120
  console.log(factorial(-1)); // Throws error
} catch (error) {
  console.error(error.message);
}
function factorialBigInt(n: number): bigint {
  if (n < 0) {
    throw new Error("Factorial is not defined for negative numbers");
  }
  
  if (n <= 1) {
    return BigInt(1);
  }
  
  return BigInt(n) * factorialBigInt(n - 1);
}

console.log(factorialBigInt(25).toString()); // 15511210043330985984000000
function factorialTailRecursive(n: number, accumulator: number = 1): number {
  if (n < 0) throw new Error("Negative input");
  if (n <= 1) return accumulator;
  
  return factorialTailRecursive(n - 1, n * accumulator);
}

console.log(factorialTailRecursive(5)); // 120
