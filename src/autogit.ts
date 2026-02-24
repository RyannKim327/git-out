/**
 * Returns the largest prime factor of a positive integer.
 * Works for Number (up to ~9e15) and for BigInt.
 */
export function largestPrimeFactor(nInput: number | bigint): bigint {
  // 0 or 1 have no prime factors
  if (nInput <= 1) {
    throw new Error('Number must be >= 2');
  }

  // Work with BigInt internally for uniformity
  let n = BigInt(nInput);

  // Remove factors of 2
  let lastFactor = 2n;
  while (n % 2n === 0n) {
    lastFactor = 2n;
    n /= 2n;
  }

  // Try odd factors only
  let factor = 3n;
  const limit = sqrtBigInt(n);

  while (factor <= limit) {
    while (n % factor === 0n) {
      lastFactor = factor;
      n /= factor;
    }
    factor += 2n;        // skip even numbers
  }

  // If anything is left, it must be a prime > sqrt(original n)
  if (n > 1n) {
    lastFactor = n;
  }

  return lastFactor;
}

/**
 * Integer square root of a BigInt (floor)
 * (Euclidean algorithm – takes few iterations even for 64‑bit numbers)
 */
function sqrtBigInt(value: bigint): bigint {
  if (value < 0n) throw new Error('square root of negative not supported');
  if (value < 2n) return value;

  let x0 = value / 2n;
  let x1 = (x0 + value / x0) / 2n;

  while (x1 < x0) {
    x0 = x1;
    x1 = (x0 + value / x0) / 2n;
  }
  return x0;
}
console.log(largestPrimeFactor(13195));      // 29
console.log(largestPrimeFactor(600851475143)); // 6857

// Using BigInt
console.log(
  largestPrimeFactor(
    BigInt("9999999967") // a 10‑digit number; you can make this much bigger
  ).toString()
);
