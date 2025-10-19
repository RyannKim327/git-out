function largestPrimeFactor(n: number): number {
    // Handle edge cases
    if (n <= 1) return 1;
    
    // Remove factors of 2 (smallest prime)
    while (n % 2 === 0) {
        n = n / 2;
    }
    
    // n must be odd at this point, so check odd factors
    let maxPrime = 2;
    for (let i = 3; i * i <= n; i += 2) {
        while (n % i === 0) {
            maxPrime = i;
            n = n / i;
        }
    }
    
    // If n is a prime number greater than 2
    if (n > 2) {
        maxPrime = n;
    }
    
    return maxPrime;
}

// Example usage
console.log(largestPrimeFactor(13195)); // Output: 29
console.log(largestPrimeFactor(600851475143)); // Output: 6857
