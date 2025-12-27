function isPrime(num: number): boolean {
    // Check for numbers less than 2
    if (num < 2) return false;
    
    // Check for even numbers (except 2)
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    
    // Check odd divisors up to sqrt(num)
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        if (num % i === 0) return false;
    }
    
    return true;
}
function isPrime(num: number): boolean {
    // Handle edge cases
    if (!Number.isInteger(num) || num < 2) return false;
    
    // Quick checks for small primes
    if (num === 2 || num === 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    
    // Check divisors of form 6k ± 1
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    
    return true;
}
class PrimeChecker {
    static isPrime(num: number): boolean {
        if (num < 2) return false;
        if (num === 2) return true;
        if (num % 2 === 0) return false;
        
        for (let i = 3; i <= Math.sqrt(num); i += 2) {
            if (num % i === 0) return false;
        }
        
        return true;
    }
    
    static getPrimesUpTo(limit: number): number[] {
        const primes: number[] = [];
        for (let i = 2; i <= limit; i++) {
            if (this.isPrime(i)) primes.push(i);
        }
        return primes;
    }
}
// Test the functions
console.log(isPrime(7));      // true
console.log(isPrime(10));     // false
console.log(isPrime(17));     // true
console.log(isPrime(1));      // false
console.log(isPrime(2));      // true

// Using the class
console.log(PrimeChecker.isPrime(29)); // true
console.log(PrimeChecker.getPrimesUpTo(20)); // [2, 3, 5, 7, 11, 13, 17, 19]
function isPrimeWithValidation(num: unknown): boolean {
    // Type guard for number
    if (typeof num !== 'number' || !Number.isInteger(num)) {
        throw new Error('Input must be an integer');
    }
    
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    
    const sqrt = Math.sqrt(num);
    for (let i = 3; i <= sqrt; i += 2) {
        if (num % i === 0) return false;
    }
    
    return true;
}
