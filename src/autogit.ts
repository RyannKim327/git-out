function factorial(n: number): number {
  if (n < 0) throw new Error('Factorial is undefined for negative numbers');
  return n <= 1 ? 1 : n * factorial(n - 1);
}

/* quick sanity check */
console.log(factorial(5)); // 120
