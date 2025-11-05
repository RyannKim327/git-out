/**
 * Returns true if n is a prime number, false otherwise.
 * Works for every 64-bit signed integer (–9_223_372_036_854_775_807 … 9_223_372_036_854_775_807).
 */
function isPrime(n: number): boolean {
  if (n !== Math.trunc(n)) return false;      // Reject non-integers
  if (n < 2) return false;                    // 0, 1 and negatives are not prime
  if (n % 2 === 0) return n === 2;            // 2 is the only even prime
  if (n % 3 === 0) return n === 3;            // 3 is the only multiple-of-3 prime

  const limit = Math.floor(Math.sqrt(n));
  // All primes > 3 are of the form 6k ± 1
  for (let i = 5; i <= limit; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

/* ---------- quick sanity checks ---------- */
console.log(isPrime(-7));  // false
console.log(isPrime(0));   // false
console.log(isPrime(1));   // false
console.log(isPrime(2));   // true
console.log(isPrime(97));  // true
console.log(isPrime(1000000007)); // true
