function largestPrimeFactor(n: number): number {
    let largestPrime = -1;
    let num = n;
    
    // Divide by 2 until the number is odd
    while (num % 2 === 0) {
        largestPrime = 2;
        num /= 2;
    }
    
    // Check odd factors up to sqrt(num)
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        while (num % i === 0) {
            largestPrime = i;
            num /= i;
        }
    }
    
    // If num is still greater than 2, it's prime
    if (num > 2) {
        largestPrime = num;
    }
    
    return largestPrime;
}

// Examples
console.log(largestPrimeFactor(13195));    // 29
console.log(largestPrimeFactor(600851475143)); // 6857
function isPrime(num: number): boolean {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
}

function getPrimeFactors(n: number): number[] {
    const factors: number[] = [];
    let num = n;
    
    // Handle 2 separately
    while (num % 2 === 0) {
        factors.push(2);
        num /= 2;
    }
    
    // Handle odd factors
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        while (num % i === 0) {
            if (isPrime(i)) {
                factors.push(i);
            }
            num /= i;
        }
    }
    
    // If remaining number is prime and greater than 2
    if (num > 2 && isPrime(num)) {
        factors.push(num);
    }
    
    return factors;
}

function largestPrimeFactor(n: number): number {
    const primeFactors = getPrimeFactors(n);
    return primeFactors.length > 0 ? Math.max(...primeFactors) : -1;
}

// Examples
console.log(largestPrimeFactor(13195));    // 29
console.log(largestPrimeFactor(600851475143)); // 6857
function largestPrimeFactor(n: number): number {
    let largestPrime = -1;
    let num = n;
    
    // Handle 2 separately
    if (num % 2 === 0) {
        largestPrime = 2;
        while (num % 2 === 0) {
            num /= 2;
        }
    }
    
    // Check odd factors
    for (let i = 3; i * i <= num; i += 2) {
        if (num % i === 0) {
            largestPrime = i;
            while (num % i === 0) {
                num /= i;
            }
        }
    }
    
    // If what remains is greater than 1, it's prime
    if (num > 1) {
        largestPrime = num;
    }
    
    return largestPrime;
}
const largestPrimeFactor = (n: number): number => {
    let num = n;
    let factor = 2;
    let largest = -1;
    
    while (num > 1) {
        if (num % factor === 0) {
            largest = factor;
            while (num % factor === 0) {
                num /= factor;
            }
        }
        factor++;
    }
    
    return largest;
};
// Test the function
const testNumbers = [
    10,      // Largest prime factor: 5
    17,      // Largest prime factor: 17 (prime itself)
    13195,   // Largest prime factor: 29
    600851475143 // Largest prime factor: 6857
];

testNumbers.forEach(num => {
    console.log(`Largest prime factor of ${num} is: ${largestPrimeFactor(num)}`);
});
