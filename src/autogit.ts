/**
 * Returns the largest prime factor of n.
 * Works for numbers up to < 2^53 – that’s the largest integer a JS `number` can
 * represent exactly. For bigger values use BigInt (see the comment below).
 */
function largestPrimeFactor(n: number): number {
  if (n <= 1) return n;          // 0 or 1 have no prime factors at all

  let remaining = n;

  // Deal with factor 2 first – it’s the only even prime
  while (remaining % 2 === 0) {
    remaining = remaining / 2;
  }
  let lastFactor = 2;

  // Now we only need to test odd numbers.
  // We stop once we’ve divided down to 1 or we’ve reached √remaining.
  for (let odd = 3; odd * odd <= remaining; odd += 2) {
    while (remaining % odd === 0) {
      remaining = remaining / odd;
      lastFactor = odd;
    }
  }

  // If what’s left is > 1, it’s a prime itself and is larger than any
  // factor we already found, so it becomes the biggest prime factor.
  return remaining > 1 ? remaining : lastFactor;
}
console.log(largestPrimeFactor(60));   // 5 (60 = 2 × 2 × 3 × 5)
console.log(largestPrimeFactor(63));   // 7 (63 = 3 × 3 × 7)
console.log(largestPrimeFactor(13195)); // 29 (13195 = 5 × 7 × 13 × 29)
function largestPrimeFactorBigInt(n: bigint): bigint {
  if (n <= 1n) return n;

  let remaining = n;
  let lastFactor = 2n;

  // factor 2
  while (remaining % 2n === 0n) {
    remaining /= 2n;
    lastFactor = 2n;
  }

  // odd factors
  for (let odd = 3n; odd * odd <= remaining; odd += 2n) {
    while (remaining % odd === 0n) {
      remaining /= odd;
      lastFactor = odd;
    }
  }

  return remaining > 1n ? remaining : lastFactor;
}
