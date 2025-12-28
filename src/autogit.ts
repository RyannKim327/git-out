function largestPrimeFactor(n: number): number {
    if (n < 2) return -1; // No prime factors

    let factor = 2;

    // Remove all factors of 2
    while (n % 2 === 0) {
        n /= 2;
    }

    // Check odd factors from 3 upwards
    factor = 3;
    const maxFactor = Math.sqrt(n);
    while (factor <= maxFactor) {
        while (n % factor === 0) {
            n /= factor;
        }
        factor += 2;
    }

    // If n is still > 2, it's a prime number
    return n > 2 ? n : factor - 2;
}

// Example usage:
console.log(largestPrimeFactor(13195)); // Output: 29
console.log(largestPrimeFactor(600851475143)); // Output: 6857
