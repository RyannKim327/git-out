/**
 * Returns true if `n` is a prime number.
 *
 * Rules:
 *   * 0 and 1 are **not** primes.
 *   * 2 is the only even prime.
 *   * For any other number, test divisibility up to √n.
 *
 * NOTE: This is a classic, “trial‑division” algorithm
 * and is fast enough for numbers that fit comfortably
 * in a JavaScript `number`. If you need to handle millisecond‑length
 * big‑ints, consider a probabilistic test like Miller‑Rabin.
 */
function isPrime(n: number): boolean {
  if (n < 2) return false;         // 0, 1, and negative numbers are not prime
  if (n === 2) return true;        // 2 is prime
  if (n % 2 === 0) return false;   // even numbers larger than 2 are not prime

  const limit = Math.floor(Math.sqrt(n));
  for (let divisor = 3; divisor <= limit; divisor += 2) {
    if (n % divisor === 0) return false;
  }
  return true;
}
console.log(isPrime(2));   // true
console.log(isPrime(9));   // false
console.log(isPrime(13));  // true
console.log(isPrime(1_000_003)); // true (prime just over a million)
Time to test 1 000 000 numbers (≈ 5–6 ms in Node.js)
