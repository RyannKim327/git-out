function isPrimeBasic(n: number): boolean {
    if (n <= 1) return false;
    if (n <= 3) return true;
    
    for (let i = 2; i < n; i++) {
        if (n % i === 0) {
            return false;
        }
    }
    return true;
}
function isPrimeOptimized(n: number): boolean {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) {
            return false;
        }
    }
    return true;
}
function isPrime(n: number): boolean {
    // Handle edge cases
    if (!Number.isInteger(n) || n < 2) {
        return false;
    }
    
    // 2 and 3 are prime
    if (n <= 3) return true;
    
    // Eliminate multiples of 2 and 3
    if (n % 2 === 0 || n % 3 === 0) return false;
    
    // Check divisibility up to √n
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) {
            return false;
        }
    }
    
    return true;
}
class PrimeChecker {
    static isPrime(n: number): boolean {
        if (!Number.isInteger(n) || n < 2) return false;
        if (n <= 3) return true;
        if (n % 2 === 0 || n % 3 === 0) return false;
        
        for (let i = 5; i * i <= n; i += 6) {
            if (n % i === 0 || n % (i + 2) === 0) {
                return false;
            }
        }
        return true;
    }
    
    // Additional utility method to get first N primes
    static getFirstNPrimes(count: number): number[] {
        const primes: number[] = [];
        let num = 2;
        
        while (primes.length < count) {
            if (this.isPrime(num)) {
                primes.push(num);
            }
            num++;
        }
        return primes;
    }
}
// Test the functions
console.log(isPrimeOptimized(17)); // true
console.log(isPrimeOptimized(15)); // false
console.log(isPrimeOptimized(2));  // true
console.log(isPrimeOptimized(1));  // false

// Using the class
console.log(PrimeChecker.isPrime(29)); // true
console.log(PrimeChecker.getFirstNPrimes(10)); // [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
// Test performance
function testPerformance(n: number) {
    console.time('Optimized');
    isPrimeOptimized(n);
    console.timeEnd('Optimized');
    
    console.time('Basic');
    isPrimeBasic(n);
    console.timeEnd('Basic');
}

testPerformance(10000000019); // Large prime number
