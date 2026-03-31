/**
 * Return the largest prime factor of a positive integer `n`.
 * For `n <= 1` returns `null` (no prime factors).
 *
 * @param n – a number > 0 (use Number if you’re certain it fits in a double precision float)
 */
function largestPrimeFactor(n: number): number | null {
  if (n <= 1) return null;          // 0 or 1 has no prime factors

  let remainder = n;
  let largest = 2;

  // Always strip out factors of 2 first – saves time later
  while (remainder % 2 === 0) {
    largest = 2;
    remainder /= 2;
  }

  // Now test only odd divisors (3,5,7,…)
  const limit = Math.sqrt(remainder);
  for (let divisor = 3; divisor <= limit; divisor += 2) {
    while (remainder % divisor === 0) {
      largest = divisor;
      remainder /= divisor;
    }
  }

  // If anything left of 1, it’s prime and bigger than any we found
  if (remainder > 1) largest = remainder;

  return largest;
}
console.log(largestPrimeFactor(15));    // 5
console.log(largestPrimeFactor(21));    // 7
console.log(largestPrimeFactor(26));    // 13
console.log(largestPrimeFactor(120));   // 5   (120 = 2⁴·3·5)
function largestPrimeFactorBig(n: bigint): bigint | null {
  if (n <= 1n) return null;
  let remainder = n;
  let largest = 2n;

  while (remainder % 2n === 0n) {
    largest = 2n;
    remainder /= 2n;
  }

  let divisor = 3n;
  while (divisor * divisor <= remainder) {
    while (remainder % divisor === 0n) {
      largest = divisor;
      remainder /= divisor;
    }
    divisor += 2n;
  }

  if (remainder > 1n) largest = remainder;
  return largest;
}
