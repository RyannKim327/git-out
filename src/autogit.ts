/**
 * Returns the largest prime factor of n (n ≥ 2).
 * Runs in O(√n) worst-case time and O(1) space.
 */
function largestPrimeFactor(n: number): number {
  if (n < 2 || !Number.isInteger(n)) {
    throw new Error('Input must be an integer ≥ 2');
  }

  let factor = 2;

  // Remove all factors of 2 first (makes the later loop faster)
  while (n % factor === 0) n /= factor;

  // Now n is odd; check odd candidates only
  factor = 3;
  while (factor * factor <= n) {
    if (n % factor === 0) {
      n /= factor;
    } else {
      factor += 2; // skip even numbers
    }
  }

  // Whatever is left is either 1 or the last (largest) prime factor
  return n === 1 ? factor - 2 : n;
}

/* ---------- quick sanity checks ---------- */
console.log(largestPrimeFactor(2));        // → 2
console.log(largestPrimeFactor(15));       // → 5
console.log(largestPrimeFactor(13195));    // → 29
console.log(largestPrimeFactor(600851475143)); // → 6857
