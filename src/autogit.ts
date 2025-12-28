/**
 * Returns the largest prime factor of n (n ≥ 2).
 * Runs in O(√n) time and O(1) space.
 */
function largestPrimeFactor(n: number): number {
  if (n < 2 || !Number.isInteger(n)) {
    throw new RangeError('Input must be an integer ≥ 2');
  }

  let factor = 2;

  // Remove all 2’s first so the loop below can skip even numbers
  while (n % factor === 0) n /= factor;

  // Check odd factors 3,5,7,… up to √n
  for (factor = 3; factor * factor <= n; factor += 2) {
    while (n % factor === 0) n /= factor;
  }

  // Whatever is left is either 1 or the largest prime factor
  return n === 1 ? factor - 2 : n;
}

/* ---------- quick sanity checks ---------- */
console.log(largestPrimeFactor(13195)); // 29
console.log(largestPrimeFactor(600851475143)); // 6857
