function largestPrimeFactor(n: number): number {
    if (n <= 1) return 0;
    
    let largestPrime = -1;
    let num = n;
    
    // Handle factor 2
    while (num % 2 === 0) {
        largestPrime = 2;
        num /= 2;
    }
    
    // Handle odd factors
    let factor = 3;
    while (factor * factor <= num) {
        while (num % factor === 0) {
            largestPrime = factor;
            num /= factor;
        }
        factor += 2;
    }
    
    // If the remaining number is prime and greater than 2
    if (num > 2) {
        largestPrime = num;
    }
    
    return largestPrime;
}

// Examples
console.log(largestPrimeFactor(13195));    // Output: 29
console.log(largestPrimeFactor(600851475143)); // Output: 6857
function largestPrimeFactorRecursive(n: number): number {
    if (n <= 1) return 0;
    
    for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) {
            return largestPrimeFactorRecursive(n / i);
        }
    }
    
    return n;
}

// Examples
console.log(largestPrimeFactorRecursive(13195));    // Output: 29
console.log(largestPrimeFactorRecursive(600851475143)); // Output: 6857
function getPrimeFactors(n: number): number[] {
    const factors: number[] = [];
    let num = n;
    
    // Factor out 2s
    while (num % 2 === 0) {
        factors.push(2);
        num /= 2;
    }
    
    // Factor out odd numbers
    for (let i = 3; i * i <= num; i += 2) {
        while (num % i === 0) {
            factors.push(i);
            num /= i;
        }
    }
    
    // If remaining number is prime
    if (num > 2) {
        factors.push(num);
    }
    
    return factors;
}

function largestPrimeFactorFromFactors(n: number): number {
    const factors = getPrimeFactors(n);
    return Math.max(...factors);
}

// Examples
console.log(largestPrimeFactorFromFactors(13195));    // Output: 29
console.log(getPrimeFactors(13195)); // Output: [5, 7, 13, 29]
class PrimeFactorizer {
    static isPrime(num: number): boolean {
        if (num <= 1) return false;
        if (num <= 3) return true;
        if (num % 2 === 0 || num % 3 === 0) return false;
        
        for (let i = 5; i * i <= num; i += 6) {
            if (num % i === 0 || num % (i + 2) === 0) return false;
        }
        return true;
    }
    
    static largestPrimeFactor(n: number): number {
        if (n <= 1) return 0;
        
        let largestPrime = -1;
        let num = n;
        
        // Handle factors
        let divisor = 2;
        while (divisor * divisor <= num) {
            if (num % divisor === 0) {
                if (PrimeFactorizer.isPrime(divisor)) {
                    largestPrime = divisor;
                }
                num /= divisor;
            } else {
                divisor++;
            }
        }
        
        // Check if the remaining number is prime
        if (num > 1 && PrimeFactorizer.isPrime(num)) {
            largestPrime = num > largestPrime ? num : largestPrime;
        }
        
        return largestPrime;
    }
}

// Examples
console.log(PrimeFactorizer.largestPrimeFactor(13195));    // Output: 29
console.log(PrimeFactorizer.largestPrimeFactor(600851475143)); // Output: 6857
function benchmark(func: (n: number) => number, n: number, iterations: number = 1000): number {
    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
        func(n);
    }
    const end = performance.now();
    return end - start;
}

// Performance test
const testNumber = 600851475143;
console.log("Performance test (1000 iterations):");
console.log(`Iterative: ${benchmark(largestPrimeFactor, testNumber)}ms`);
console.log(`Recursive: ${benchmark(largestPrimeFactorRecursive, testNumber)}ms`);
// Test with various numbers
const testCases = [
    10, 17, 100, 13195, 600851475143, 123456789
];

testCases.forEach(num => {
    console.log(`Largest prime factor of ${num}: ${largestPrimeFactor(num)}`);
});
