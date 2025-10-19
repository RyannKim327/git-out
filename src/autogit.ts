/**
 * Returns the largest prime factor of a positive integer.
 * Throws for n ≤ 1.
 */
function largestPrimeFactor(n: number): number {
  if (n <= 1 || !Number.isInteger(n)) {
    throw new Error('Input must be an integer greater than 1');
  }

  let factor = 2;
  while (factor * factor <= n) {
    if (n % factor === 0) {
      n /= factor;          // divide out this factor completely
    } else {
      factor += factor === 2 ? 1 : 2; // after 2, only test odd numbers
    }
  }
  return n; // whatever is left is prime and the largest factor
}

// --- quick checks ---
console.log(largestPrimeFactor(13195)); // 29
console.log(largestPrimeFactor(600851475143)); // 6857
