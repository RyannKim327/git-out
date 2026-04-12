/**
 * Returns true if the supplied integer is a prime number.
 *
 * Special notes
 * • 0 and 1 are *not* prime.
 * • Negative numbers are treated as non‑prime because primes are defined for positive integers only.
 * • The function uses the classic “divide up to sqrt(n)” trick – O(√n) which is fast enough for
 *   almost every use‑case you’ll hit in day‑to‑day code. If you need primality for astronomically large
 *   numbers you’ll need a more elaborate algorithm (Miller‑Rabin, etc.) – that’s a different story.
 *
 * @param n – the number you want to test
 * @returns true if n is prime, false otherwise
 */
export function isPrime(n: number): boolean {
  if (!Number.isInteger(n)) return false;   // TypeScript’s runtime check
  if (n <= 1) return false;                // 0 and 1 aren’t prime, negative numbers aren’t considered either

  // 2 and 3 are the only even and odd primes
  if (n <= 3) return true;                 // 2 and 3

  // Even numbers > 2 are composite
  if (n % 2 === 0) return false;

  // We can skip even divisors – test only odd ones
  const limit = Math.floor(Math.sqrt(n));
  for (let i = 3; i <= limit; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}
import { isPrime } from "./primes";

const numbers = [1, 2, 3, 4, 5, 16, 17, 19, 20, 23, 25, 29, 31];

numbers.forEach(n => {
  console.log(`${n} is prime? ${isPrime(n)}`);
});
1 is prime? false
2 is prime? true
3 is prime? true
4 is prime? false
5 is prime? true
16 is prime? false
17 is prime? true
19 is prime? true
20 is prime? false
23 is prime? true
25 is prime? false
29 is prime? true
31 is prime? true
