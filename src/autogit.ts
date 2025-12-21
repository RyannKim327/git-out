function largestPrimeFactor(n: number): number {
    if (n <= 1) return 1;
    
    let num = n;
    let largestFactor = 1;
    
    // Handle factor 2
    while (num % 2 === 0) {
        largestFactor = 2;
        num /= 2;
    }
    
    // Handle odd factors starting from 3
    let factor = 3;
    while (factor * factor <= num) {
        while (num % factor === 0) {
            largestFactor = factor;
            num /= factor;
        }
        factor += 2;
    }
    
    // If remaining number is prime
    if (num > 2) {
        largestFactor = num;
    }
    
    return largestFactor;
}

// Example usage
console.log(largestPrimeFactor(13195)); // 29
console.log(largestPrimeFactor(600851475143)); // 6857
class PrimeFactorFinder {
    
    static isPrime(num: number): boolean {
        if (num <= 1) return false;
        if (num <= 3) return true;
        if (num % 2 === 0 || num % 3 === 0) return false;
        
        let i = 5;
        while (i * i <= num) {
            if (num % i === 0 || num % (i + 2) === 0) {
                return false;
            }
            i += 6;
        }
        return true;
    }
    
    static findLargestPrimeFactor(n: number): number {
        if (n <= 1) return 1;
        if (this.isPrime(n)) return n;
        
        let largestPrime = 1;
        const sqrtN = Math.sqrt(n);
        
        // Check factors up to sqrt(n)
        for (let i = 2; i <= sqrtN; i++) {
            if (n % i === 0) {
                const factor1 = i;
                const factor2 = n / i;
                
                if (this.isPrime(factor1) && factor1 > largestPrime) {
                    largestPrime = factor1;
                }
                
                if (this.isPrime(factor2) && factor2 > largestPrime) {
                    largestPrime = factor2;
                }
            }
        }
        
        return largestPrime;
    }
}

// Example usage
console.log(PrimeFactorFinder.findLargestPrimeFactor(13195)); // 29
const largestPrimeFactorFunctional = (n: number): number => {
    const factors = (num: number): number[] => {
        const result: number[] = [];
        let current = num;
        let divisor = 2;
        
        while (current >= 2) {
            if (current % divisor === 0) {
                result.push(divisor);
                current /= divisor;
            } else {
                divisor++;
            }
        }
        return result;
    };
    
    const isPrime = (num: number): boolean => {
        if (num <= 1) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return true;
    };
    
    const primeFactors = factors(n).filter(isPrime);
    return Math.max(...primeFactors);
};

// Example usage
console.log(largestPrimeFactorFunctional(13195)); // 29
// Test function to compare performance
function testPerformance(n: number): void {
    console.log(`Testing for n = ${n}`);
    
    console.time('Method 1');
    const result1 = largestPrimeFactor(n);
    console.timeEnd('Method 1');
    console.log(`Result: ${result1}`);
    
    console.time('Method 2');
    const result2 = PrimeFactorFinder.findLargestPrimeFactor(n);
    console.timeEnd('Method 2');
    console.log(`Result: ${result2}`);
    
    console.time('Method 3');
    const result3 = largestPrimeFactorFunctional(n);
    console.timeEnd('Method 3');
    console.log(`Result: ${result3}`);
}

// Run performance test
testPerformance(600851475143);
// Test edge cases
console.log(largestPrimeFactor(1)); // 1
console.log(largestPrimeFactor(2)); // 2
console.log(largestPrimeFactor(3)); // 3
console.log(largestPrimeFactor(4)); // 2
console.log(largestPrimeFactor(17)); // 17 (prime number)
