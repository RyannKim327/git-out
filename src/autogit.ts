function largestPrimeFactor(n: number): number {
    if (n < 2) return 0; // No prime factors

    let factor = 2;
    let lastFactor = 1;

    // Handle 2 separately
    while (n % 2 === 0) {
        lastFactor = 2;
        n /= 2;
    }

    // Check odd numbers from 3 upwards
    factor = 3;
    const maxFactor = Math.sqrt(n);
    while (n > 1 && factor <= maxFactor) {
        if (n % factor === 0) {
            lastFactor = factor;
            while (n % factor === 0) {
                n /= factor;
            }
        }
        factor += 2;
    }

    // If n is still > 1, then it's a prime factor
    return n > 1 ? n : lastFactor;
}

// Example usage:
console.log(largestPrimeFactor(13195)); // Output: 29
console.log(largestPrimeFactor(600851475143)); // Output: 6857
