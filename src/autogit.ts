function isPrime(num: number): boolean {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    
    // Check for divisors up to sqrt(num)
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    
    return true;
}
function isPrimeSimple(num: number): boolean {
    if (num <= 1) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    
    // Check odd divisors up to sqrt(num)
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        if (num % i === 0) return false;
    }
    
    return true;
}
function isPrimeOptimized(n: number): boolean {
    // Handle edge cases
    if (n <= 1) return false;
    if (n <= 3) return true;
    
    // Eliminate multiples of 2 and 3
    if (n % 2 === 0 || n % 3 === 0) return false;
    
    // Check divisors of form 6k ± 1
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) {
            return false;
        }
    }
    
    return true;
}
// Test the functions
console.log(isPrime(7));       // true
console.log(isPrime(10));      // false
console.log(isPrime(17));      // true
console.log(isPrime(1));       // false
console.log(isPrime(2));       // true

// You can also create a function to find primes in a range
function getPrimesInRange(start: number, end: number): number[] {
    const primes: number[] = [];
    for (let i = start; i <= end; i++) {
        if (isPrime(i)) {
            primes.push(i);
        }
    }
    return primes;
}

console.log(getPrimesInRange(1, 20)); // [2, 3, 5, 7, 11, 13, 17, 19]
