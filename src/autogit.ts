/**
 * Returns the largest prime factor of n.
 *
 * @param n The number (must be > 1).  Use `BigInt` if you’ll pass a value > Number.MAX_SAFE_INTEGER.
 */
export function largestPrimeFactor(n: number | bigint): number | bigint {
    if (n <= 1) throw new Error('n must be > 1');

    // Work with BigInt for arbitrary precision
    let num: bigint = typeof n === 'bigint' ? n : BigInt(n);
    let maxFactor: bigint = 1n;

    // Handle factor 2 separately
    while (num % 2n === 0n) {
        maxFactor = 2n;
        num /= 2n;
    }

    // Now num is odd – we only need to check odd divisors
    for (let divisor = 3n; divisor * divisor <= num; divisor += 2n) {
        while (num % divisor === 0n) {
            maxFactor = divisor;
            num /= divisor;
        }
    }

    // If anything is left, it's a prime larger than any divisor we tried
    if (num > 1n) maxFactor = num;

    // Return a native number if the input was a number and the result fits
    if (typeof n === 'number' && maxFactor <= Number.MAX_SAFE_INTEGER) {
        return Number(maxFactor);
    }
    return maxFactor;
}
console.log(largestPrimeFactor(28));          // 7
console.log(largestPrimeFactor(91));          // 13
console.log(largestPrimeFactor(600851475143));// 6857

// With a BigInt (e.g. a 100‑digit number)
const huge = BigInt('123456789123456789123456789');
console.log(largestPrimeFactor(huge)); // prints the largest prime factor as a BigInt
