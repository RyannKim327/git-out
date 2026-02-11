/**
 * Return the largest prime factor of |n|.
 *
 * @param n Any integer. Negative values are treated as |n|.
 * @returns   The largest prime factor of n, or `0` if n has no prime factors
 * (i.e. n is 0, 1, or –1).
 */
function largestPrimeFactor(n: number): number {
  if (n === 0 || n === 1 || n === -1) return 0;

  let num = Math.abs(n);          // work with the absolute value
  let lastPrime = 0;              // keep the biggest factor we’ve seen

  // Treat 2 separately – it’s the only even prime
  while (num % 2 === 0) {
    lastPrime = 2;
    num >>= 1;                    // divide by 2
  }

  // Now n is odd. Try only odd divisors.
  // We only need to go up to sqrt(num) because if num still > 1 after that,
  // num itself is prime and the largest factor.
  for (let d = 3; d * d <= num; d += 2) {
    while (num % d === 0) {
      lastPrime = d;
      num /= d;
    }
  }

  // If after the loop num > 1, it means num itself is prime
  // and larger than any divisor we found earlier.
  if (num > 1) lastPrime = num;

  return lastPrime;
}

/* ----- quick sanity checks ----- */
console.log(largestPrimeFactor(13195));   // 29  (13195 = 5 × 7 × 13 × 29)
console.log(largestPrimeFactor(600851475143)); // 6857 (the known answer to Project Euler #3)
Console.log(largestPrimeFactor(13));      // 13
Console.log(largestPrimeFactor(4));       // 2
Console.log(largestPrimeFactor(1));       // 0
function largestPrimeFactorBigInt(n: bigint): bigint {
  // identical logic, but using bigint operations
}
