function isPrime(num: number): boolean {
    // Edge cases
    if (num <= 1) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    
    // Check divisibility up to the square root
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        if (num % i === 0) return false;
    }
    
    return true;
}
function isPrimeOptimized(num: number): boolean {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    
    // Check for divisors of the form 6k ± 1
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    
    return true;
}
function isPrimeWithValidation(num: number): boolean {
    // Validate input
    if (!Number.isInteger(num) || num < 0) {
        throw new Error('Input must be a non-negative integer');
    }
    
    if (num <= 1) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    
    const sqrt = Math.sqrt(num);
    for (let i = 3; i <= sqrt; i += 2) {
        if (num % i === 0) return false;
    }
    
    return true;
}
// Test the functions
console.log(isPrime(7));      // true
console.log(isPrime(15));     // false
console.log(isPrime(29));     // true
console.log(isPrime(1));      // false
console.log(isPrime(2));      // true

// Generate first N prime numbers
function generatePrimes(count: number): number[] {
    const primes: number[] = [];
    let num = 2;
    
    while (primes.length < count) {
        if (isPrime(num)) {
            primes.push(num);
        }
        num++;
    }
    
    return primes;
}

console.log(generatePrimes(10)); // [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
// Compare performance
function benchmarkPrimeFunctions(): void {
    const testNumbers = [1000003, 1000033, 1000037, 1000039];
    
    console.time('Basic');
    testNumbers.forEach(num => isPrime(num));
    console.timeEnd('Basic');
    
    console.time('Optimized');
    testNumbers.forEach(num => isPrimeOptimized(num));
    console.timeEnd('Optimized');
}

benchmarkPrimeFunctions();
