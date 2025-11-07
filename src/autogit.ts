function factorial(n: number): number {
  if (n < 0) throw new Error('Factorial is not defined for negative numbers');
  return n <= 1 ? 1 : n * factorial(n - 1);
}

// Example usage:
console.log(factorial(5)); // 120
