function largestPrimeFactorSimple(n: number): number {
    if (n <= 1) return 1;
    
    let largestPrime = 1;
    let temp = n;
    
    // Factor out 2s first
    if (temp % 2 === 0) {
        largestPrime = 2;
        while (temp % 2 === 0) {
            temp /= 2;
        }
    }
    
    // Check odd factors
    for (let i = 3; i <= Math.sqrt(temp); i += 2) {
        while (temp % i === 0) {
            largestPrime = i;
            temp /= i;
        }
    }
    
    // If remaining number is prime and greater than current largest
    if (temp > 2 && temp > largestPrime) {
        largestPrime = temp;
    }
    
    return largestPrime;
}
function largestPrimeFactorOptimized(n: number): number {
    if (n <= 1) return 1;
    
    let largestPrime = 1;
    let temp = n;
    
    // Remove factors of 2
    if (temp % 2 === 0) {
        largestPrime = 2;
        do {
            temp /= 2;
        } while (temp % 2 === 0);
    }
    
    // Check odd factors up to sqrt(n)
    let factor = 3;
    const maxFactor = Math.sqrt(temp);
    
    while (temp > 1 && factor <= maxFactor) {
        if (temp % factor === 0) {
            largestPrime = factor;
            do {
                temp /= factor;
            } while (temp % factor === 0);
            maxFactor = Math.sqrt(temp);
        }
        factor += 2;
    }
    
    // If what's left is prime
    if (temp > 1 && temp > largestPrime) {
        largestPrime = temp;
    }
    
    return largestPrime;
}
function largestPrimeFactorRecursive(n: number): number {
    if (n <= 1) return 1;
    
    // Find the smallest prime factor
    let factor = 2;
    while (n % factor !== 0 && factor <= Math.sqrt(n)) {
        factor++;
    }
    
    // If n is prime
    if (factor > Math.sqrt(n)) {
        return n;
    }
    
    // Recursively find largest prime factor of the quotient
    return largestPrimeFactorRecursive(n / factor);
}
// Test the functions
console.log(largestPrimeFactorOptimized(13195));  // 29
console.log(largestPrimeFactorOptimized(600851475143));  // 6857

// Performance comparison
const testNumber = 600851475143;
console.time('Optimized');
console.log(largestPrimeFactorOptimized(testNumber));
console.timeEnd('Optimized');

console.time('Simple');
console.log(largestPrimeFactorSimple(testNumber));
console.timeEnd('Simple');
