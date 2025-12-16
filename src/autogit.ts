/**
 * Returns the largest prime factor of n.
 * Runs in O(sqrt(n)) time and O(1) space.
 */
function largestPrimeFactor(n: number): number {
  if (n < 2) return NaN;           // nothing to do
  let factor = 2;

  // Remove factors of 2 first
  while (n % 2 === 0) n /= 2;

  // Check odd candidates up to sqrt(n)
  for (let candidate = 3; candidate * candidate <= n; candidate += 2) {
    while (n % candidate === 0) {
      factor = candidate;
      n /= candidate;
    }
  }

  // Whatever is left is either 1 or a prime > sqrt(original n)
  return n === 1 ? factor : n;
}

// --- quick sanity checks ---
console.log(largestPrimeFactor(13195)); // 29
console.log(largestPrimeFactor(600851475143)); // 6857
