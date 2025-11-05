function isPrime(n: number): boolean {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
}

function largestPrimeFactorBasic(n: number): number {
    let largestFactor = 1;
    
    for (let i = 2; i <= n; i++) {
        if (n % i === 0 && isPrime(i)) {
            largestFactor = i;
            n /= i; // Reduce n by the factor
        }
    }
    
    return largestFactor;
}

// Example usage
console.log(largestPrimeFactorBasic(13195)); // 29
console.log(largestPrimeFactorBasic(600851475143)); // 6857
function largestPrimeFactorOptimized(n: number): number {
    let largestFactor = 1;
    let divisor = 2;
    
    // Handle even numbers
    while (n % divisor === 0) {
        largestFactor = divisor;
        n /= divisor;
    }
    
    divisor = 3;
    
    // Handle odd numbers
    while (n > 1) {
        while (n % divisor === 0) {
            largestFactor = divisor;
            n /= divisor;
        }
        divisor += 2;
        
        // Optimization: Stop when divisor exceeds sqrt(n)
        if (divisor * divisor > n && n > 1) {
            largestFactor = n;
            break;
        }
    }
    
    return largestFactor;
}
function largestPrimeFactor(n: number): number {
    let largestFactor = 1;
    
    // Remove factors of 2
    while (n % 2 === 0) {
        largestFactor = 2;
        n /= 2;
    }
    
    // Check odd factors
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
        while (n % i === 0) {
            largestFactor = i;
            n /= i;
        }
    }
    
    // If n is still greater than 2, it's prime
    if (n > 2) {
        largestFactor = n;
    }
    
    return largestFactor;
}
class PrimeFactorFinder {
    static largestPrimeFactor(n: number): number {
        if (n <= 1) return 1;
        
        let largestFactor = 1;
        
        // Remove factors of 2
        while (n % 2 === 0) {
            largestFactor = 2;
            n /= 2;
        }
        
        // Check odd factors
        for (let i = 3; i <= Math.sqrt(n); i += 2) {
            while (n % i === 0) {
                largestFactor = i;
                n /= i;
            }
        }
        
        // If remaining n is prime and greater than current factor
        if (n > 2 && n > largestFactor) {
            largestFactor = n;
        }
        
        return largestFactor;
    }
}

// Test cases
const testCases = [
    { input: 10, expected: 5 },
    { input: 17, expected: 17 },
    { input: 13195, expected: 29 },
    { input: 600851475143, expected: 6857 }
];

// Run tests
testCases.forEach(test => {
    const result = PrimeFactorFinder.largestPrimeFactor(test.input);
    console.log(`Input: ${test.input}, Expected: ${test.expected}, Got: ${result}`);
});
const number = 600851475143;
const result = PrimeFactorFinder.largestPrimeFactor(number);
console.log(`Largest prime factor of ${number} is: ${result}`);
