/**
 * Returns true if `n` is a prime integer, otherwise false.
 * Works for every safe integer (−(2⁵³−1) to 2⁵³−1).
 */
function isPrime(n: number): boolean {
  if (n !== Math.trunc(n)) return false;         // non-integers are not prime
  n = Math.abs(n);                               // handle negatives

  if (n < 2) return false;                       // 0, 1 are not prime
  if (n % 2 === 0) return n === 2;                 // 2 is prime, evens >2 are not
  if (n % 3 === 0) return n === 3;                 // 3 is prime, multiples are not

  const limit = Math.floor(Math.sqrt(n));
  for (let i = 5; i <= limit; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

/* ---------- quick sanity checks ---------- */
console.log(isPrime(1));   // false
console.log(isPrime(2));   // true
console.log(isPrime(17));  // true
console.log(isPrime(18));  // false
console.log(isPrime(982_451_653)); // true
