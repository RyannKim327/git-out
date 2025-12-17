/**
 * Returns true if `n` is a prime number.
 *
 * @param n - The number to test. Must be a safe integer (|n| ≤ Number.MAX_SAFE_INTEGER).
 * @returns true if `n` is prime, false otherwise.
 *
 * @example
 *   isPrime(2);   // true
 *   isPrime(15);  // false
 *   isPrime(7919); // true
 */
export function isPrime(n: number): boolean {
  // 1️⃣ Reject non‑integers, negatives, 0 and 1
  if (!Number.isSafeInteger(n) || n < 2) {
    return false;
  }

  // 2️⃣ Small primes
  if (n === 2 || n === 3) {
    return true;
  }

  // 3️⃣ Eliminate even numbers and multiples of 3
  if (n % 2 === 0 || n % 3 === 0) {
    return false;
  }

  // 4️⃣ Test only numbers of the form 6k ± 1 up to √n
  const limit = Math.floor(Math.sqrt(n));
  for (let i = 5; i <= limit; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) {
      return false;
    }
  }

  // If we never found a divisor, n is prime
  return true;
}
import { isPrime } from "./prime-utils";

console.log(isPrime(2));      // true
console.log(isPrime(3));      // true
console.log(isPrime(4));      // false
console.log(isPrime(17));     // true
console.log(isPrime(100));    // false
console.log(isPrime(7919));   // true   (a known prime)
console.log(isPrime(-7));     // false  (negative numbers aren't prime)
console.log(isPrime(1.5));    // false  (non‑integer)
// prime-utils.test.ts
import { isPrime } from "./prime-utils";

describe("isPrime", () => {
  test("rejects non‑integers and numbers < 2", () => {
    expect(isPrime(0)).toBe(false);
    expect(isPrime(1)).toBe(false);
    expect(isPrime(-5)).toBe(false);
    expect(isPrime(1.2)).toBe(false);
    expect(isPrime(Number.NaN)).toBe(false);
  });

  test("recognises small primes", () => {
    expect(isPrime(2)).toBe(true);
    expect(isPrime(3)).toBe(true);
  });

  test("detects even numbers > 2 as composite", () => {
    expect(isPrime(4)).toBe(false);
    expect(isPrime(100)).toBe(false);
  });

  test("detects multiples of 3 as composite", () => {
    expect(isPrime(9)).toBe(false);
    expect(isPrime(27)).toBe(false);
  });

  test("handles a range of known primes/composites", () => {
    const primes = [5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
    const composites = [6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24];

    primes.forEach(p => expect(isPrime(p)).toBe(true));
    composites.forEach(c => expect(isPrime(c)).toBe(false));
  });

  test("works for a larger prime", () => {
    expect(isPrime(1_000_003)).toBe(true); // known prime
  });

  test("works for a large composite", () => {
    expect(isPrime(1_000_000)).toBe(false);
  });
});
npm test   # or jest
export function isPrimeBigInt(n: bigint): boolean {
  if (n < 2n) return false;
  if (n === 2n || n === 3n) return true;
  if (n % 2n === 0n || n % 3n === 0n) return false;

  const limit = sqrtBigInt(n); // implement integer sqrt for bigint
  for (let i = 5n; i <= limit; i += 6n) {
    if (n % i === 0n || n % (i + 2n) === 0n) return false;
  }
  return true;
}
export function isPrime(n: number): boolean {
  if (!Number.isSafeInteger(n) || n < 2) return false;
  if (n === 2 || n === 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  const limit = Math.floor(Math.sqrt(n));
  for (let i = 5; i <= limit; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}
