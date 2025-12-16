/**
 * Returns the largest prime factor of a positive integer.
 * If the input is 1 or less, the function returns undefined.
 *
 * @param value - The number to factor. Must be a safe integer (≤ Number.MAX_SAFE_INTEGER).
 * @returns The largest prime factor, or undefined if none exists.
 */
export function largestPrimeFactor(value: number): number | undefined {
  // ---- 0. Guard clauses ----------------------------------------------------
  if (!Number.isSafeInteger(value) || value < 2) {
    // 0, 1, negative numbers, or numbers beyond the safe integer range have no prime factors.
    return undefined;
  }

  // ---- 1. Strip out factor 2 ------------------------------------------------
  let n = value;
  let maxPrime = 2; // we know 2 is a prime factor if we ever see it

  while (n % 2 === 0) {
    n = n / 2;
  }

  // If the whole number was a power of two, 2 is the answer.
  if (n === 1) {
    return maxPrime;
  }

  // ---- 2. Trial‑divide by odd numbers ---------------------------------------
  // We only need to go up to sqrt(n). Because n changes during the loop,
  // we recompute the limit each iteration.
  for (let divisor = 3; divisor * divisor <= n; divisor += 2) {
    if (n % divisor === 0) {
      // divisor is a prime factor – keep it as the current max
      maxPrime = divisor;

      // Remove *all* occurrences of this prime factor
      while (n % divisor === 0) {
        n = n / divisor;
      }
    }
  }

  // ---- 3. Whatever is left (if > 1) is prime and larger than any we saw ----
  if (n > 1) {
    maxPrime = n; // n itself is prime
  }

  return maxPrime;
}
import { largestPrimeFactor } from "./primeFactor";

const numbers = [13195, 600851475143, 27, 2, 1];

for (const n of numbers) {
  const result = largestPrimeFactor(n);
  console.log(`${n} → ${result ?? "no prime factor"}`);
}

/* Output:
13195 → 29
600851475143 → 6857
27 → 3
2 → 2
1 → no prime factor
*/
export function largestPrimeFactorBigInt(value: bigint): bigint | undefined {
  if (value < 2n) return undefined;

  let n = value;
  let maxPrime = 2n;

  while (n % 2n === 0n) n /= 2n;
  if (n === 1n) return maxPrime;

  for (let d = 3n; d * d <= n; d += 2n) {
    if (n % d === 0n) {
      maxPrime = d;
      while (n % d === 0n) n /= d;
    }
  }

  if (n > 1n) maxPrime = n;
  return maxPrime;
}
function largestPrimeFactor(n: number): number | undefined {
  if (!Number.isSafeInteger(n) || n < 2) return undefined;
  let max = 2;
  while (n % 2 === 0) n /= 2;
  for (let d = 3; d * d <= n; d += 2) {
    if (n % d === 0) {
      max = d;
      while (n % d === 0) n /= d;
    }
  }
  return n > 1 ? n : max;
}
