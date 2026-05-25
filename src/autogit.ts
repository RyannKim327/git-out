/**
 * Checks whether a given integer is a prime number.
 * @param n - The number to test. Must be an integer.
 * @returns `true` if `n` is prime, otherwise `false`.
 */
export function isPrime(n: number): boolean {
  // Reject non‑integers, negatives, and the few small non‑prime numbers
  if (!Number.isInteger(n) || n <= 1) return false;
  if (n <= 3) return true;           // 2 and 3 are prime

  // Any even number > 2 or divisible by 3 can't be prime
  if (n % 2 === 0 || n % 3 === 0) return false;

  // 6k ± 1 optimization:
  // For numbers > 3, all primes are of the form 6k ± 1
  // We check divisors 5, 7, 11, 13, 17, …
  let i = 5;
  const limit = Math.floor(Math.sqrt(n));

  while (i <= limit) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
    i += 6;
  }

  return true;
}
console.log(isPrime(2));   // true
console.log(isPrime(15));  // false
console.log(isPrime(29));  // true

// Handle non‑integers gracefully
console.log(isPrime(7.5)); // false
export function isPrimeBigInt(n: bigint): boolean {
  if (n <= 1n) return false;
  if (n <= 3n) return true;

  if (n % 2n === 0n || n % 3n === 0n) return false;

  let i = 5n;
  const limit = BigInt(Math.floor(Math.sqrt(Number(n)))); // careful: can't use sqrt on bigint directly

  while (i <= limit) {
    if (n % i === 0n || n % (i + 2n) === 0n) return false;
    i += 6n;
  }

  return true;
}
