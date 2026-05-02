/**
 * Returns true if n is a prime number, false otherwise.
 *
 * Numbers less than 2 are not prime by definition.
 * 2 and 3 are the only even / odd primes that break the 6‑k±1 pattern.
 * After that only numbers of the form 6k ± 1 can be prime.
 */
export function isPrime(n: number): boolean {
  if (n <= 1) return false;          // 0, 1, and negatives are not prime
  if (n <= 3) return true;           // 2 and 3 are prime
  if (n % 2 === 0 || n % 3 === 0) return false; // eliminate obvious composites

  // test divisors up to √n; step by 6 to skip multiples of 2 and 3
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }

  return true;
}
[1, 2, 3, 4, 5, 16, 17, 19, 20, 23, 24, 29].forEach(num =>
  console.log(`${num} → ${isPrime(num)}`));
1 → false
2 → true
3 → true
4 → false
5 → true
16 → false
17 → true
19 → true
20 → false
23 → true
24 → false
29 → true
export function isPrimeBigInt(n: bigint): boolean {
  if (n <= 1n) return false;
  if (n <= 3n) return true;
  if (n % 2n === 0n || n % 3n === 0n) return false;

  for (let i = 5n; i * i <= n; i += 6n) {
    if (n % i === 0n || n % (i + 2n) === 0n) return false;
  }
  return true;
}
