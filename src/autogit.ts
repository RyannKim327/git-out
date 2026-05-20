/**
 * Return true if n is prime, false otherwise.
 *
 * Works for values up to 2^53‑1 (the largest safe integer in JS/TS).
 * For bigger integers you’d need BigInt and, better yet, a probabilistic test
 * (Miller‑Rabin, etc.).
 */
function isPrime(n: number): boolean {
  if (n <= 1) return false;          // 0, 1 and negatives aren’t prime
  if (n <= 3) return true;           // 2 and 3 are prime
  if (n % 2 === 0 || n % 3 === 0) return false; // eliminate evens & multiples of 3

  // From here we only need to test numbers of the form 6k ± 1
  const limit = Math.floor(Math.sqrt(n));
  for (let i = 5; i <= limit; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}
console.log(isPrime(11));          // true
console.log(isPrime(12));          // false
console.log(isPrime(1_000_003));   // true (1 M+‑prime)
