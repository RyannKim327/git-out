function largestPrimeFactor(n: number): number {
    if (n < 2) return NaN;
    
    let num = n;
    let largestFactor = 1;
    
    // Handle factor 2 separately
    while (num % 2 === 0) {
        largestFactor = 2;
        num /= 2;
    }
    
    // Check odd factors
    let factor = 3;
    while (num > 1 && factor * factor <= num) {
        while (num % factor === 0) {
            largestFactor = factor;
            num /= factor;
        }
        factor += 2; // Skip even numbers
    }
    
    // If num is still greater than 1, it's prime
    if (num > 1) {
        largestFactor = num;
    }
    
    return largestFactor;
}

// Example usage
console.log(largestPrimeFactor(13195)); // 29
console.log(largestPrimeFactor(600851475143)); // 6857
function largestPrimeFactorOptimized(n: number): number {
    if (n < 2) return NaN;
    
    let num = n;
    let largestFactor = 1;
    
    // Remove factors of 2
    while (num % 2 === 0) {
        largestFactor = 2;
        num /= 2;
    }
    
    // Remove factors of 3
    while (num % 3 === 0) {
        largestFactor = 3;
        num /= 3;
    }
    
    // Check factors of the form 6k ± 1
    let i = 5;
    while (num > 1 && i * i <= num) {
        while (num % i === 0) {
            largestFactor = i;
            num /= i;
        }
        while (num % (i + 2) === 0) {
            largestFactor = i + 2;
            num /= (i + 2);
        }
        i += 6;
    }
    
    // If num is still greater than 1, it's prime
    if (num > 1) {
        largestFactor = num;
    }
    
    return largestFactor;
}
class PrimeFactorizer {
    /**
     * Finds the largest prime factor of a number
     */
    static largestPrimeFactor(n: number): number {
        if (n < 2) {
            throw new Error("Number must be greater than 1");
        }
        
        let num = Math.abs(n);
        let largestPrime = 1;
        
        // Handle even numbers
        while (num % 2 === 0) {
            largestPrime = 2;
            num /= 2;
        }
        
        // Check odd divisors
        for (let i = 3; i * i <= num; i += 2) {
            while (num % i === 0) {
                largestPrime = i;
                num /= i;
            }
        }
        
        return num > 1 ? num : largestPrime;
    }
    
    /**
     * Gets all prime factors of a number
     */
    static getPrimeFactors(n: number): number[] {
        const factors: number[] = [];
        let num = Math.abs(n);
        
        while (num % 2 === 0) {
            factors.push(2);
            num /= 2;
        }
        
        for (let i = 3; i * i <= num; i += 2) {
            while (num % i === 0) {
                factors.push(i);
                num /= i;
            }
        }
        
        if (num > 1) {
            factors.push(num);
        }
        
        return factors;
    }
}

// Examples
console.log(PrimeFactorizer.largestPrimeFactor(13195)); // 29
console.log(PrimeFactorizer.largestPrimeFactor(600851475143)); // 6857
console.log(PrimeFactorizer.getPrimeFactors(13195)); // [5, 7, 13, 29]
function largestPrimeFactorBigInt(n: bigint): bigint {
    if (n < 2n) throw new Error("Number must be greater than 1");
    
    let num = n;
    let largestFactor = 1n;
    
    // Remove factors of 2
    while (num % 2n === 0n) {
        largestFactor = 2n;
        num /= 2n;
    }
    
    // Check odd factors
    let factor = 3n;
    while (num > 1n && factor * factor <= num) {
        while (num % factor === 0n) {
            largestFactor = factor;
            num /= factor;
        }
        factor += 2n;
    }
    
    return num > 1n ? num : largestFactor;
}

// Example with very large numbers
console.log(largestPrimeFactorBigInt(600851475143n)); // 6857n
