function isPrime(num: number): boolean {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    
    return true;
}

// Examples
console.log(isPrime(2));    // true
console.log(isPrime(17));   // true
console.log(isPrime(15));   // false
console.log(isPrime(1));    // false
function isPrimeSimple(num: number): boolean {
    if (num <= 1) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    
    // Check only odd divisors up to sqrt(num)
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        if (num % i === 0) return false;
    }
    
    return true;
}
function isPrimeOptimized(num: number): boolean {
    // Handle edge cases
    if (num <= 1) return false;
    if (num <= 3) return true;
    
    // Check for divisibility by 2 or 3
    if (num % 2 === 0 || num % 3 === 0) return false;
    
    // All primes are of the form 6k ± 1
    // Check divisibility by numbers of this form
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
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
function testPrimeFunction(): void {
    const testNumbers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];
    const nonPrimes = [1, 4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20];
    
    console.log('Testing prime numbers:');
    testNumbers.forEach(num => {
        console.log(`${num}: ${isPrime(num)}`);
    });
    
    console.log('\nTesting non-prime numbers:');
    nonPrimes.forEach(num => {
        console.log(`${num}: ${isPrime(num)}`);
    });
}

testPrimeFunction();
