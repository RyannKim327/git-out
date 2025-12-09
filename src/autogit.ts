/**
 * Returns true if `n` is a prime integer, false otherwise.
 * Works for every safe integer (−2^53 +1 ... 2^53 −1).
 */
function isPrime(n: number): boolean {
  if (n !== Math.trunc(n)) return false;   // Reject non-integers
  n = Math.abs(n);                         // Handle negatives
  if (n < 2) return false;               // 0, 1 are not prime
  if (n % 2 === 0) return n === 2;       // Evens
  if (n % 3 === 0) return n === 3;       // Multiples of 3

  const limit = Math.floor(Math.sqrt(n));
  for (let i = 5; i <= limit; i += 6) {  // 5, 11, 17, 23, ...
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

/* ---- usage ---- */
console.log(isPrime(2));   // true
console.log(isPrime(97));  // true
console.log(isPrime(1000000007)); // true
console.log(isPrime(1000000000)); // false
