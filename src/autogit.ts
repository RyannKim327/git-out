/**
 * Returns the largest prime factor of n (n ≥ 2).
 * Runs in O(√n) time and O(1) extra space.
 */
function largestPrimeFactor(n: number): number {
  if (n < 2 || !Number.isInteger(n)) {
    throw new Error('Input must be an integer ≥ 2');
  }

  let factor = 2;

  // Remove all factors of 2 first (optional micro-optimisation)
  while (n % factor === 0) n /= factor;

  // Check odd candidates only, up to √n
  for (factor = 3; factor * factor <= n; factor += 2) {
    while (n % factor === 0) n /= factor;
  }

  // Whatever is left is either 1 or the largest prime factor
  return n === 1 ? factor - 2 : n;
}

/* ---------- quick sanity checks ---------- */
console.log(largestPrimeFactor(2));        // 2
console.log(largestPrimeFactor(15));       // 5
console.log(largestPrimeFactor(13195));   // 29
console.log(largestPrimeFactor(600851475143)); // 6857
