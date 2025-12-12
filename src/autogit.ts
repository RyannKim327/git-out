function isPrime(num: number): boolean {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) {
            return false;
        }
    }
    return true;
}

// Usage
console.log(isPrime(7));    // true
console.log(isPrime(10));   // false
console.log(isPrime(17));   // true
function isPrimeSimple(num: number): boolean {
    if (num <= 1) return false;
    if (num <= 3) return true;
    
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}
function isPrimeOptimized(num: number): boolean {
    // Handle edge cases
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    
    // Check divisibility by numbers of form 6k ± 1
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) {
            return false;
        }
    }
    return true;
}
class PrimeChecker {
    static isPrime(num: number): boolean {
        if (!Number.isInteger(num) || num <= 1) return false;
        if (num <= 3) return true;
        if (num % 2 === 0 || num % 3 === 0) return false;
        
        for (let i = 5; i * i <= num; i += 6) {
            if (num % i === 0 || num % (i + 2) === 0) {
                return false;
            }
        }
        return true;
    }
    
    // Bonus: Generate first n prime numbers
    static generatePrimes(count: number): number[] {
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

// Usage
console.log(PrimeChecker.isPrime(29));          // true
console.log(PrimeChecker.generatePrimes(10));   // [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
// Test performance
function testPerformance() {
    const testNumbers = [2, 3, 17, 97, 100, 7919, 104729];
    
    console.time('Method 1');
    testNumbers.forEach(n => isPrime(n));
    console.timeEnd('Method 1');
    
    console.time('Method 2');
    testNumbers.forEach(n => isPrimeSimple(n));
    console.timeEnd('Method 2');
    
    console.time('Method 3');
    testNumbers.forEach(n => isPrimeOptimized(n));
    console.timeEnd('Method 3');
}

testPerformance();
