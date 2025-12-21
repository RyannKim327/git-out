function largestPrimeFactor(n: number): number {
    let largestFactor = -1;
    let num = n;
    
    // Handle factor of 2
    while (num % 2 === 0) {
        largestFactor = 2;
        num /= 2;
    }
    
    // Handle odd factors starting from 3
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        while (num % i === 0) {
            largestFactor = i;
            num /= i;
        }
    }
    
    // If remaining number is prime and greater than 2
    if (num > 2) {
        largestFactor = num;
    }
    
    return largestFactor;
}

// Example usage
console.log(largestPrimeFactor(13195)); // 29
console.log(largestPrimeFactor(600851475143)); // 6857
function largestPrimeFactorDetailed(n: number): number {
    if (n <= 1) {
        throw new Error("Number must be greater than 1");
    }
    
    let numberToFactor = n;
    let largestPrime = -1;
    
    // Factor out 2s
    while (numberToFactor % 2 === 0) {
        largestPrime = 2;
        numberToFactor /= 2;
    }
    
    // Factor out odd numbers
    let factor = 3;
    while (factor * factor <= numberToFactor) {
        if (numberToFactor % factor === 0) {
            largestPrime = factor;
            numberToFactor /= factor;
        } else {
            factor += 2;
        }
    }
    
    // If what's left is prime
    if (numberToFactor > 1) {
        largestPrime = numberToFactor;
    }
    
    return largestPrime;
}
function isPrime(num: number): boolean {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
}

function largestPrimeFactorWithCheck(n: number): number {
    let largest = -1;
    
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            const factor1 = i;
            const factor2 = n / i;
            
            if (isPrime(factor1) && factor1 > largest) {
                largest = factor1;
            }
            if (isPrime(factor2) && factor2 > largest) {
                largest = factor2;
            }
        }
    }
    
    return largest;
}
// Test cases
const testCases = [
    { input: 10, expected: 5 },
    { input: 17, expected: 17 },
    { input: 13195, expected: 29 },
    { input: 600851475143, expected: 6857 }
];

testCases.forEach(({ input, expected }) => {
    const result = largestPrimeFactor(input);
    console.log(`Largest prime factor of ${input}: ${result} (expected: ${expected})`);
});
function safeLargestPrimeFactor(n: number): number {
    if (typeof n !== 'number' || !Number.isInteger(n)) {
        throw new Error("Input must be an integer");
    }
    
    if (n <= 1) {
        throw new Error("Number must be greater than 1");
    }
    
    if (n === 2) {
        return 2; // 2 is prime
    }
    
    return largestPrimeFactor(n);
}
