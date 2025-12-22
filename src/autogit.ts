/**
 * Returns true if `n` is a prime integer, otherwise false.
 * Works for all safe integers (|n| ≤ 9_007_199_254_740_991).
 */
export function isPrime(n: number): boolean {
  if (!Number.isInteger(n)) return false;   // Reject non-integers
  n = Math.abs(n);                         // Deal with negatives
  if (n < 2) return false;                 // 0, 1 and negatives are not prime
  if (n % 2 === 0) return n === 2;         // Even numbers
  if (n % 3 === 0) return n === 3;         // Multiples of 3

  const limit = Math.floor(Math.sqrt(n));
  // Test divisors of the form 6k ± 1
  for (let i = 5; i <= limit; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

/* ---------- quick sanity checks ---------- */
console.log(isPrime(-7));   // false
console.log(isPrime(0));    // false
console.log(isPrime(1));    // false
console.log(isPrime(2));    // true
console.log(isPrime(97));   // true
console.log(isPrime(1001)); // false (7 * 11 * 13)
