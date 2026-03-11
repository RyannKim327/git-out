// largestPrimeFactor.ts
export function largestPrimeFactor(n: number): number | null {
    if (n < 2) return null;          // No prime factor for 0, 1 or negatives

    let largest = 0;

    // Handle factor 2 first – it’s the only even prime
    while (n % 2 === 0) {
        largest = 2;
        n = Math.floor(n / 2);
    }

    // Now n is odd.  Test odd divisors from 3 upward.
    // Only need to go up to sqrt(n); beyond that any remaining n is prime.
    for (let d = 3; d * d <= n; d += 2) {
        while (n % d === 0) {
            largest = d;
            n = Math.floor(n / d);
        }
    }

    // If after the loop n > 1 it means n itself is prime and larger
    // than any divisor we removed.
    if (n > 1) largest = n;

    return largest;
}
console.log(largestPrimeFactor(210)); // 7
console.log(largestPrimeFactor(2));   // 2
console.log(largestPrimeFactor(17));  // 17
console.log(largestPrimeFactor(18));  // 3
console.log(largestPrimeFactor(0));   // null
