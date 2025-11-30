function largestPrimeFactor(n: number): number {
    if (n <= 1) {
        throw new Error("Input must be greater than 1.");
    }
    
    let largestFactor = 1;
    
    // Divide n by 2 until it's odd
    while (n % 2 === 0) {
        largestFactor = 2;
        n = n / 2;
    }
    
    // n must be odd now; skip even divisors
    let divisor = 3;
    while (divisor * divisor <= n) {
        while (n % divisor === 0) {
            largestFactor = divisor;
            n = n / divisor;
        }
        divisor += 2; // Move to next odd number
    }
    
    // If remaining n is a prime number greater than 2
    if (n > 2) {
        largestFactor = n;
    }
    
    return largestFactor;
}
console.log(largestPrimeFactor(13195));   // Output: 29
console.log(largestPrimeFactor(10));      // Output: 5
console.log(largestPrimeFactor(17));      // Output: 17
