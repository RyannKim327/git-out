function factorial(n: number): number {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error('Input must be a non-negative integer');
  }
  return n === 0 ? 1 : n * factorial(n - 1);
}

/* ---- usage ---- */
console.log(factorial(5)); // 120
