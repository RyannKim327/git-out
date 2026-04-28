/**
 * Recursively calculates the factorial of a non‑negative integer.
 *
 * @param n - the number to compute the factorial of
 * @returns n! as a number (works well up to ~170 before overflow)
 */
function factorial(n: number): number {
  // Guard against negative input - factorial isn’t defined there
  if (n < 0) {
    throw new Error('Factorial is only defined for non‑negative integers.');
  }

  // Base case: 0! === 1 and 1! === 1
  if (n <= 1) {
    return 1;
  }

  // Recursive case
  return n * factorial(n - 1);
}

// Quick demo:
console.log(factorial(5)); // 120
function factorialBig(n: bigint): bigint {
  if (n < 0n) {
    throw new Error('Factorial is only defined for non‑negative integers.');
  }
  return n <= 1n ? 1n : n * factorialBig(n - 1n);
}

console.log(factorialBig(20n)); // 2432902008176640000n
