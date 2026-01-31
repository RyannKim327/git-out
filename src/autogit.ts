/**
 * Returns true if `n` is a prime number.
 * Works with any non‑negative integer. For negative numbers or 0/1 it returns false.
 */
export function isPrime(n: number): boolean {
  if (!Number.isInteger(n) || n < 2) return false;   // 0, 1, and non‑ints aren't prime
  
  // 2 and 3 are the only even/odd primes.
  if (n === 2 || n === 3) return true;

  // Even numbers > 2 are not prime.
  if (n % 2 === 0) return false;

  // Check odd divisors up to √n.
  const limit = Math.floor(Math.sqrt(n));
  for (let i = 3; i <= limit; i += 2) {
    if (n % i === 0) return false;
  }

  return true;
}
console.log(isPrime(7));   // true
console.log(isPrime(20));  // false
console.log(isPrime(91));  // false (7 × 13)
console.log(isPrime(97));  // true
