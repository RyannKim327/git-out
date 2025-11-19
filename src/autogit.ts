/**
 * Returns true if `n` is a prime number, otherwise false.
 * Runs in O(√n) time and O(1) space.
 */
function isPrime(n: number): boolean {
  if (n !== Math.trunc(n)) return false;     // non-integers are not prime
  if (n < 2) return false;                  // 0,1 are not prime
  if (n % 2 === 0) return n === 2;          // 2 is prime, evens >2 are not
  const limit = Math.floor(Math.sqrt(n));
  for (let i = 3; i <= limit; i += 2) {      // test only odd divisors
    if (n % i === 0) return false;
  }
  return true;
}

/* ---------- usage ---------- */
console.log(isPrime(2));   // true
console.log(isPrime(29));  // true
console.log(isPrime(100)); // false
