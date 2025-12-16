function factorial(n: number): number {
  if (n < 0) {
    throw new Error('Factorial is undefined for negative numbers');
  }
  if (n === 0 || n === 1) {
    return 1;          // base case
  }
  return n * factorial(n - 1); // recursive case
}

// quick sanity checks
console.log(factorial(0)); // 1
console.log(factorial(5)); // 120
