/**
 * Returns true if `n` is a prime number.
 * Handles 0, 1 and negative numbers as non‑prime.
 */
export function isPrime(n: number): boolean {
  if (n <= 1) return false                // 0, 1, and negatives are not prime
  if (n <= 3) return true                 // 2 and 3 are prime

  // even numbers greater than 2 fail immediately
  if (n % 2 === 0) return false

  // only test odd divisors up to √n
  const limit = Math.floor(Math.sqrt(n));
  for (let i = 3; i <= limit; i += 2) {
    if (n % i === 0) return false
  }
  return true
}
console.log(isPrime(2));   // true
console.log(isPrime(15));  // false
console.log(isPrime(97));  // true
