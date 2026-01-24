/**
 * Returns the largest prime divisor of `n`.
 * If `n` is 0 or 1, returns `undefined`.
 */
function largestPrimeFactor(n: number): number | undefined {
  if (n < 2) return undefined;          // no prime factors for 0 or 1

  let num = Math.abs(n);                 // work with a positive number
  let maxFactor = 1;

  // Handle the factor 2 separately to keep the loop odd.
  while (num % 2 === 0) {
    maxFactor = 2;
    num /= 2;
  }

  // Now only odd factors are possible.
  let divisor = 3;
  const sqrtLimit = Math.sqrt(num);
  while (divisor <= sqrtLimit) {
    while (num % divisor === 0) {
      maxFactor = divisor;
      num /= divisor;
    }
    divisor += 2;                       // skip even numbers
  }

  // If after the loop num > 1, it itself is a prime factor larger than all found.
  if (num > 1) {
    maxFactor = num;
  }

  return maxFactor;
}
console.log(largestPrimeFactor(2));                // 2
console.log(largestPrimeFactor(28));               // 7
console.log(largestPrimeFactor(1000003));          // 1000003 (its prime)
console.log(largestPrimeFactor(123456));           // 643
console.log(largestPrimeFactor(-84));              // 7
