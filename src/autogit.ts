/**
 * Return the largest prime factor of a positive integer.
 *
 * @param n – the number you want to factor (must be > 1)
 * @returns the largest prime factor, or `undefined` if `n` is ≤ 1
 */
function largestPrimeFactor(n: number): number | undefined {
  if (n <= 1) return undefined;

  let num = n;
  let largest = -1;

  // Remove all factors of 2
  while (num % 2 === 0) {
    largest = 2;
    num /= 2;
  }

  // Now `num` is odd; try odd divisors only
  let divisor = 3;
  const limit = Math.sqrt(num);
  while (divisor <= limit) {
    while (num % divisor === 0) {
      largest = divisor;
      num /= divisor;
    }
    divisor += 2;           // skip the even numbers
  }

  // If we're left with a prime greater than 2
  if (num > 2) largest = num;

  return largest;
}

// Quick demo
console.log(largestPrimeFactor(13195)); // 29
console.log(largestPrimeFactor(600851475143)); // 6857
