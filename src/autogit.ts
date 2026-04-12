/**
 * Returns the largest prime factor of a positive integer.
 * For values ≤ 1, it returns undefined (no prime factors).
 *
 * Supports both number (IEEE‑754 double) and BigInt inputs.
 */
function largestPrimeFactor(input: number | bigint): number | bigint | undefined {
  // Normalise to BigInt for arbitrary‑size support
  let n = typeof input === "bigint" ? input : BigInt(input);

  if (n <= 1n) return undefined; // 0, 1, or negative values have no prime factors

  let lastFactor: bigint = 1n;

  // Handle factor 2 separately to allow skipping even numbers later
  while (n % 2n === 0n) {
    lastFactor = 2n;
    n /= 2n;
  }

  // Now n is odd – we only need to test odd divisors
  let divisor = 3n;
  const limit = sqrtBigInt(n); // helper that returns floor(sqrt(n))

  while (divisor <= limit && n !== 1n) {
    while (n % divisor === 0n) {
      lastFactor = divisor;
      n /= divisor;
    }
    divisor += 2n;          // next odd candidate
  }

  // If anything remains, it's a prime larger than any we tested
  if (n > 1n) lastFactor = n;

  // Return a number when possible for convenience
  return lastFactor > Number.MAX_SAFE_INTEGER
    ? lastFactor
    : Number(lastFactor);
}

/* ---------- Helpers ---------- */

/**
 * Integer square root of a BigInt (floor).
 * Uses binary search – good enough for moderate sizes.
 */
function sqrtBigInt(value: bigint): bigint {
  if (value < 0n) throw new Error("square root of negative");
  if (value < 2n) return value;

  let low = 1n;
  let high = value >> 1n; // n/2 is an upper bound

  while (low <= high) {
    const mid = (low + high) >> 1n;
    const midSq = mid * mid;

    if (midSq === value) return mid;
    if (midSq < value) low = mid + 1n;
    else high = mid - 1n;
  }

  return high; // floor(sqrt(value))
}

/* ---------- Usage examples ---------- */

console.log(largestPrimeFactor(13195));   // 29
console.log(largestPrimeFactor(600851475143)); // 6857
console.log(largestPrimeFactor(997**3)); // 997
console.log(largestPrimeFactor(15n));     // 5
console.log(largestPrimeFactor(1));       // undefined
