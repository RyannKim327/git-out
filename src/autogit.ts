function largestPrimeFactor(n: number): number {
    // Handle edge cases
    if (n <= 1) return 1;
    
    // Remove factors of 2 (even numbers)
    let largestFactor = 1;
    while (n % 2 === 0) {
        largestFactor = 2;
        n /= 2;
    }
    
    // Check odd factors up to sqrt(n)
    for (let i = 3; i * i <= n; i += 2) {
        while (n % i === 0) {
            largestFactor = i;
            n /= i;
        }
    }
    
    // If n is a prime number greater than 2, it's the largest factor
    if (n > 1) {
        largestFactor = n;
    }
    
    return largestFactor;
}

// Example usage and test function
function testLargestPrimeFactor(): void {
    const testCases = [
        2,      // 2
        10,     // 5
        13,     // 13
        25,     // 5
        13195,  // 29
        600851475143 // 6857
    ];
    
    testCases.forEach(num => {
        const result = largestPrimeFactor(num);
        console.log(`Largest prime factor of ${num} is: ${result}`);
    });
}

// Run tests
testLargestPrimeFactor();
Largest prime factor of 2 is: 2
Largest prime factor of 10 is: 5
Largest prime factor of 13 is: 13
Largest prime factor of 25 is: 5
Largest prime factor of 13195 is: 29
Largest prime factor of 600851475143 is: 6857
