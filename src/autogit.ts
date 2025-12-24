/**
 * Returns the largest prime factor of n (n ≥ 2).
 * Runs in O(√n) time and O(1) space.
 */
function largestPrimeFactor(n: number): number {
  if (n < 2 || !Number.isInteger(n)) throw RangeError('n must be an integer ≥ 2');

  let factor = 2;

  // Remove all factors of 2 first (optional micro-optimisation)
  while (n % factor === 0) n /= factor;

  // Check odd candidates up to √n
  factor = 3;
  while (factor * factor <= n) {
    if (n % factor === 0) {
      n /= factor;          // divide out this factor completely
    } else {
      factor += 2;            // next odd number
    }
  }

  // Whatever is left is either 1 or the last (largest) prime factor
  return n === 1 ? factor - 2 : n;
}

/* ---------- quick sanity checks ---------- */
console.log(largestPrimeFactor(18));     // 3
console.log(largestPrimeFactor(13195));   // 29
console.log(largestPrimeFactor(600851475143)); // 6857
