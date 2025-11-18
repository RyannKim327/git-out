/**
 * Returns the largest prime factor of n (n ≥ 2).
 * Runs in O(√n) time and O(1) space.
 */
function largestPrimeFactor(n: number): number {
  if (n < 2 || !Number.isInteger(n)) {
    throw new Error('Input must be an integer ≥ 2');
  }

  let factor = 2;
  let lastFactor = 1;          // 1 is not prime, but we need a starter value

  while (factor * factor <= n) { // stop at √n
    if (n % factor === 0) {
      lastFactor = factor;
      do { n /= factor; } while (n % factor === 0); // strip all copies of this factor
    } else {
      factor += factor === 2 ? 1 : 2;           // 2 → 3, then only odd numbers
    }
  }

  // Whatever is left is either 1 or a prime > √original n
  return n > 1 ? n : lastFactor;
}

/* ---------- quick sanity checks ---------- */
console.log(largestPrimeFactor(13195)); // 29
console.log(largestPrimeFactor(600851475143)); // 6857
