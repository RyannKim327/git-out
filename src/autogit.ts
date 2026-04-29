/**
 * Returns the largest prime factor of a positive integer (>1).
 * Uses trial division up to √n – fast enough for 32‑bit ints.
 */
export function largestPrimeFactor(n: number): number {
  if (n <= 1) throw new Error("n must be > 1");

  // 2 is the only even prime
  while (n % 2 === 0) n /= 2;

  // n is now odd – we only need to test odd divisors
  let factor = 3;
  const sqrt = Math.sqrt(n);
  while (factor <= sqrt) {
    while (n % factor === 0) {
      n /= factor;          // keep dividing out this prime
    }
    factor += 2;            // next odd candidate
  }

  // If n is still > 2, it is a prime larger than any factor we tried.
  return n;
}
/**
 * Returns the largest prime factor of a BigInt > 1.
 */
export function largestPrimeFactorBigInt(n: bigint): bigint {
  if (n <= 1n) throw new Error("n must be > 1");

  // 2 is the only even prime
  while (n % 2n === 0n) n /= 2n;

  let factor = 3n;
  const sqrt = bigintSqrt(n);
  while (factor <= sqrt) {
    while (n % factor === 0n) {
      n /= factor;
    }
    factor += 2n;
  }

  return n;
}

/**
 * Integer square‑root of a BigInt – floor(√n).
 * Uses Newton’s method; fast for large numbers.
 */
function bigintSqrt(value: bigint): bigint {
  if (value < 0n) throw new Error("negative value");
  if (value < 2n) return value;

  let x0 = value;
  let x1 = (x0 + 1n) >> 1n;
  while (x1 < x0) {
    x0 = x1;
    x1 = (x0 + value / x0) >> 1n;
  }
  return x0;
}
console.log(largestPrimeFactor(13195));          // 29
console.log(largestPrimeFactor(600851475143));   // 6857

console.log(largestPrimeFactorBigInt(13195n));    // 29n
console.log(largestPrimeFactorBigInt(600851475143n)); // 6857n
