function largestPrimeFactor(n: number): number {
    if (n <= 1) return -1; // Handle invalid input
    
    let largest = -1;
    let current = n;
    
    // Handle factor 2
    if (current % 2 === 0) {
        largest = 2;
        while (current % 2 === 0) {
            current /= 2;
        }
    }
    
    // Handle odd factors
    for (let i = 3; i <= Math.sqrt(current); i += 2) {
        while (current % i === 0) {
            largest = i;
            current /= i;
        }
    }
    
    // If remaining number is prime and greater than current largest
    if (current > 2) {
        largest = current;
    }
    
    return largest;
}

// Example usage
console.log(largestPrimeFactor(13195)); // Output: 29
console.log(largestPrimeFactor(600851475143)); // Output: 6857
function largestPrimeFactorRecursive(n: number): number {
    if (n <= 1) return -1;
    
    // Start checking from smallest prime factor
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            return largestPrimeFactorRecursive(n / i);
        }
    }
    
    return n; // n is prime
}

// Example usage
console.log(largestPrimeFactorRecursive(13195)); // Output: 29
function largestPrimeFactorEnhanced(n: number): number {
    // Input validation
    if (!Number.isInteger(n) || n <= 1) {
        throw new Error("Input must be an integer greater than 1");
    }
    
    let largest = -1;
    let current = n;
    
    // Special case for even numbers
    if (current % 2 === 0) {
        largest = 2;
        current = removeFactor(current, 2);
    }
    
    // Check odd factors
    for (let i = 3; i <= Math.sqrt(current); i += 2) {
        if (current % i === 0) {
            largest = i;
            current = removeFactor(current, i);
        }
    }
    
    // If what remains is a prime number
    if (current > 2) {
        largest = current;
    }
    
    return largest;
}

function removeFactor(n: number, factor: number): number {
    while (n % factor === 0) {
        n /= factor;
    }
    return n;
}

// Example with error handling
try {
    console.log(largestPrimeFactorEnhanced(600851475143));
} catch (error) {
    console.error(error.message);
}
function largestPrimeFactorWhile(n: number): number {
    if (n <= 1) return -1;
    
    let factor = 2;
    let largest = -1;
    let current = n;
    
    while (factor * factor <= current) {
        if (current % factor === 0) {
            largest = factor;
            current /= factor;
        } else {
            factor++;
        }
    }
    
    if (current > 1) {
        largest = current;
    }
    
    return largest;
}
// Test with various numbers
const testNumbers = [15, 21, 35, 13195, 600851475143];

testNumbers.forEach(num => {
    console.log(`Largest prime factor of ${num}: ${largestPrimeFactor(num)}`);
});
