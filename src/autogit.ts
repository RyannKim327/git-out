function largestPrimeFactor(n: number): number {
    if (n <= 1) return -1; // No prime factors

    let factor = 2;
    while (factor * factor <= n) {
        if (n % factor === 0) {
            n /= factor;
        } else {
            factor++;
        }
    }
    return n; // n is now the largest prime factor
}

// Example usage:
console.log(largestPrimeFactor(13195)); // Output: 29
console.log(largestPrimeFactor(600851475143)); // Output: 6857
