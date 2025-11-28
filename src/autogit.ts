function isPrimeBasic(n: number): boolean {
    if (n <= 1) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    
    for (let i = 3; i < n; i += 2) {
        if (n % i === 0) return false;
    }
    return true;
}
function isPrime(n: number): boolean {
    if (n <= 1) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    
    const sqrt = Math.sqrt(n);
    for (let i = 3; i <= sqrt; i += 2) {
        if (n % i === 0) return false;
    }
    return true;
}
function isPrime(n: number): boolean {
    // Handle edge cases
    if (!Number.isInteger(n) || n <= 1) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    
    // Only check up to square root
    const sqrt = Math.sqrt(n);
    for (let i = 3; i <= sqrt; i += 2) {
        if (n % i === 0) return false;
    }
    return true;
}
class PrimeChecker {
    static isPrime(n: number): boolean {
        if (n <= 1) return false;
        if (n === 2) return true;
        if (n % 2 === 0) return false;
        
        const sqrt = Math.sqrt(n);
        for (let i = 3; i <= sqrt; i += 2) {
            if (n % i === 0) return false;
        }
        return true;
    }
}

// Usage
console.log(PrimeChecker.isPrime(17)); // true
console.log(PrimeChecker.isPrime(15)); // false
// Test function
function testPrimes() {
    const testNumbers = [2, 3, 4, 5, 17, 25, 29, 100, 97];
    
    testNumbers.forEach(num => {
        console.log(`${num} is prime: ${isPrime(num)}`);
    });
}

testPrimes();
