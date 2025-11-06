function isPrimeBasic(num: number): boolean {
    if (num <= 1) return false;
    if (num <= 3) return true;
    
    for (let i = 2; i < num; i++) {
        if (num % i === 0) return false;
    }
    
    return true;
}
function isPrime(num: number): boolean {
    if (num <= 1) return false;
    if (num <= 3) return true;
    
    // Check for even numbers and multiples of 3
    if (num % 2 === 0 || num % 3 === 0) return false;
    
    // Only check odd factors up to sqrt(num)
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    
    return true;
}
function isPrimeReadable(num: number): boolean {
    if (num <= 1) return false;
    if (num <= 3) return true;
    
    if (num % 2 === 0 || num % 3 === 0) return false;
    
    const sqrtNum = Math.sqrt(num);
    for (let i = 5; i <= sqrtNum; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    
    return true;
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

// Test the function
const testNumbers = [2, 3, 4, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];
const nonPrimes = [1, 4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20];

console.log("Prime numbers:");
testNumbers.forEach(num => {
    console.log(`${num}: ${isPrime(num)}`);
});

console.log("\nNon-prime numbers:");
nonPrimes.forEach(num => {
    console.log(`${num}: ${isPrime(num)}`);
});

// Example usage
console.log(`\nIs 97 prime? ${isPrime(97)}`); // true
console.log(`Is 100 prime? ${isPrime(100)}`); // false
