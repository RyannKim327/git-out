function isPrime(num: number): boolean {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    
    return true;
}

// Usage
console.log(isPrime(17)); // true
console.log(isPrime(15)); // false
console.log(isPrime(2));  // true
function isPrimeSimple(num: number): boolean {
    if (num <= 1) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    
    const sqrt = Math.sqrt(num);
    for (let i = 3; i <= sqrt; i += 2) {
        if (num % i === 0) return false;
    }
    
    return true;
}
function isPrimeWithValidation(num: number): boolean {
    // Input validation
    if (!Number.isInteger(num)) {
        throw new Error('Input must be an integer');
    }
    
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    
    return true;
}
class PrimeChecker {
    static isPrime(num: number): boolean {
        if (num <= 1) return false;
        if (num <= 3) return true;
        if (num % 2 === 0 || num % 3 === 0) return false;
        
        for (let i = 5; i * i <= num; i += 6) {
            if (num % i === 0 || num % (i + 2) === 0) return false;
        }
        
        return true;
    }
    
    static getPrimesUpTo(limit: number): number[] {
        const primes: number[] = [];
        for (let i = 2; i <= limit; i++) {
            if (this.isPrime(i)) {
                primes.push(i);
            }
        }
        return primes;
    }
}

// Usage
console.log(PrimeChecker.isPrime(29)); // true
console.log(PrimeChecker.getPrimesUpTo(20)); // [2, 3, 5, 7, 11, 13, 17, 19]
// Test the performance
function testPerformance() {
    const testNumbers = [2, 3, 17, 97, 100, 997, 1000, 7919];
    
    console.log('Prime Check Results:');
    testNumbers.forEach(num => {
        console.log(`${num}: ${isPrime(num)}`);
    });
}

testPerformance();
