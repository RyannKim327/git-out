/**
 * Returns true if `n` is a prime number.
 */
export function isPrime(n: number): boolean {
  // Prime numbers are > 1
  if (n <= 1) return false;

  // 2 and 3 are the only even/odd primes
  if (n <= 3) return true;

  // Even numbers > 2 can be rejected right away
  if (n % 2 === 0) return false;

  // Check only odd divisors up to √n
  const limit = Math.floor(Math.sqrt(n));
  for (let d = 3; d <= limit; d += 2) {
    if (n % d === 0) return false;
  }
  return true;
}
console.log(isPrime(2));  // true
console.log(isPrime(15)); // false
console.log(isPrime(17)); // true
console.log(isPrime(1));  // false
console.log(isPrime(-5)); // false
