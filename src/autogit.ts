function largestPrimeFactor(n: number): number {
    let factor = 2;
    let lastFactor = 1;
    
    while (n > 1) {
        if (n % factor === 0) {
            lastFactor = factor;
            n /= factor;
            while (n % factor === 0) {
                n /= factor; // remove all occurrences of the same factor
            }
        }
        factor++;
    }
    return lastFactor;
}

// Example usage:
console.log(largestPrimeFactor(13195)); // Output: 29
console.log(largestPrimeFactor(600851475143)); // Output: 6857
