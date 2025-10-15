function largestPrimeFactor(n: number): number {
    if (n < 2) return 0;

    // Remove all factors of 2
    while (n % 2 === 0) {
        n /= 2;
    }

    // Check odd factors from 3 upwards
    let factor = 3;
    while (factor * factor <= n) {
        if (n % factor === 0) {
            n /= factor;
        } else {
            factor += 2;
        }
    }

    return n > 2 ? n : 2;
}

// Example usage:
console.log(largestPrimeFactor(13195)); // Output: 29
console.log(largestPrimeFactor(600851475143)); // Output: 6857
