/**
 * Returns true if `n` is a prime number, false otherwise.
 * Handles integer inputs, explicitly rejects non‑integers and numbers ≤ 1.
 */
function isPrime(n: number): boolean {
  // 0, 1, negatives and non‑integers are not prime
  if (!Number.isInteger(n) || n < 2) return false;

  // 2 and 3 are prime
  if (n === 2 || n === 3) return true;

  // Eliminate even numbers and multiples of 3 early
  if (n % 2 === 0 || n % 3 === 0) return false;

  // Only test up to √n. Use step 6k±1 pattern to skip even numbers.
  const limit = Math.floor(Math.sqrt(n));
  for (let i = 5; i <= limit; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }

  return true;
}
console.log(isPrime(1));   // false
console.log(isPrime(2));   // true
console.log(isPrime(29));  // true
console.log(isPrime(30));  // false
console.log(isPrime(97));  // true
