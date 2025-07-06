function isPrime(n: number): boolean {
    if (n <= 1) return false; // 0, 1, and negative numbers are not prime
    if (n <= 3) return true;  // 2 and 3 are prime

    // Check divisibility by 2 and 3 for quick elimination
    if (n % 2 === 0 || n % 3 === 0) return false;

    // Check for factors up to sqrt(n)
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) {
            return false;
        }
    }

    return true;  // If no divisors found, n is prime
}

// Usage:
console.log(isPrime(17)); // true
console.log(isPrime(18)); // false
