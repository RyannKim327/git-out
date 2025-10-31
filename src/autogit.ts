/**
 * Returns true when n is a prime number.
 * Safe up to Number.MAX_SAFE_INTEGER (2^53 – 1).
 */
export function isPrime(n: number): boolean {
  if (!Number.isInteger(n) || n < 2) return false;
  if (n % 2 === 0) return n === 2;
  if (n % 3 === 0) return n === 3;

  const limit = Math.floor(Math.sqrt(n));
  for (let i = 5; i <= limit; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

/* ---------- usage ---------- */
console.log(isPrime(2));   // true
console.log(isPrime(97));  // true
console.log(isPrime(100)); // false
