function largestPrimeFactorBruteForce(n: number): number {
    if (n <= 1) return 1;
    
    let largestFactor = 1;
    let num = n;
    
    // Handle even numbers
    while (num % 2 === 0) {
        largestFactor = 2;
        num /= 2;
    }
    
    // Handle odd factors
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        while (num % i === 0) {
            largestFactor = i;
            num /= i;
        }
    }
    
    // If remaining number is prime and greater than current largest factor
    if (num > 2 && num > largestFactor) {
        largestFactor = num;
    }
    
    return largestFactor;
}
function largestPrimeFactor(n: number): number {
    if (n <= 1) return 1;
    
    let num = n;
    let largestFactor = 1;
    
    // Remove factors of 2
    while (num % 2 === 0) {
        largestFactor = 2;
        num /= 2;
    }
    
    // Remove odd factors
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        while (num % i === 0) {
            largestFactor = i;
            num /= i;
        }
    }
    
    // Handle the case when the remaining number is prime
    if (num > 2) {
        largestFactor = Math.max(largestFactor, num);
    }
    
    return largestFactor;
}
function largestPrimeFactorRecursive(n: number, memo: Map<number, number> = new Map()): number {
    if (memo.has(n)) return memo.get(n)!;
    
    if (n <= 1) return 1;
    
    // Check divisibility by 2
    if (n % 2 === 0) {
        const result = Math.max(2, largestPrimeFactorRecursive(n / 2, memo));
        memo.set(n, result);
        return result;
    }
    
    // Check odd divisors
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
        if (n % i === 0) {
            const result = Math.max(i, largestPrimeFactorRecursive(n / i, memo));
            memo.set(n, result);
            return result;
        }
    }
    
    // n is prime
    memo.set(n, n);
    return n;
}
class PrimeFactorFinder {
    /**
     * Finds the largest prime factor of a number
     */
    static findLargestPrimeFactor(n: number): number {
        if (!Number.isInteger(n) || n <= 1) {
            throw new Error("Input must be an integer greater than 1");
        }
        
        let num = Math.abs(n);
        let largestFactor = 1;
        
        // Remove factors of 2
        while (num % 2 === 0) {
            largestFactor = 2;
            num /= 2;
        }
        
        // Remove odd factors
        for (let i = 3; i <= Math.sqrt(num); i += 2) {
            while (num % i === 0) {
                largestFactor = i;
                num /= i;
            }
        }
        
        // Handle remaining prime number
        if (num > 2) {
            largestFactor = Math.max(largestFactor, num);
        }
        
        return largestFactor;
    }
    
    /**
     * Gets all prime factors of a number
     */
    static getAllPrimeFactors(n: number): number[] {
        const factors: number[] = [];
        let num = Math.abs(n);
        
        while (num % 2 === 0) {
            factors.push(2);
            num /= 2;
        }
        
        for (let i = 3; i <= Math.sqrt(num); i += 2) {
            while (num % i === 0) {
                factors.push(i);
                num /= i;
            }
        }
        
        if (num > 2) {
            factors.push(num);
        }
        
        return factors;
    }
}

// Usage Examples
const testNumbers = [13195, 600851475143, 123456789, 97];

testNumbers.forEach(num => {
    try {
        const largestFactor = PrimeFactorFinder.findLargestPrimeFactor(num);
        const allFactors = PrimeFactorFinder.getAllPrimeFactors(num);
        
        console.log(`Number: ${num}`);
        console.log(`Prime Factors: [${allFactors.join(', ')}]`);
        console.log(`Largest Prime Factor: ${largestFactor}`);
        console.log('---');
    } catch (error) {
        console.error(`Error for ${num}: ${error.message}`);
    }
});
function benchmark(func: (n: number) => number, n: number, iterations: number = 1000): number {
    const start = performance.now();
    
    for (let i = 0; i < iterations; i++) {
        func(n);
    }
    
    const end = performance.now();
    return end - start;
}

// Compare performance
const largeNumber = 600851475143;

console.log("Brute Force:", benchmark(largestPrimeFactorBruteForce, largeNumber, 100), "ms");
console.log("Optimized:", benchmark(largestPrimeFactor, largeNumber, 100), "ms");
