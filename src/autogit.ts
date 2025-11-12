function factorial(n: number): number {
    // Handle negative numbers
    if (n < 0) {
        throw new Error("Factorial is undefined for negative numbers");
    }
    
    // Base case: 0! = 1 and 1! = 1
    if (n === 0 || n === 1) {
        return 1;
    }
    
    // Recursive case: n! = n * (n-1)!
    return n * factorial(n - 1);
}

// Example usage:
console.log(factorial(5)); // Output: 120
console.log(factorial(0)); // Output: 1
function bigFactorial(n: bigint): bigint {
    if (n < 0n) throw new Error("Negative input");
    if (n === 0n || n === 1n) return 1n;
    return n * bigFactorial(n - 1n);
}

console.log(String(bigFactorial(30n))); // 265252859812191058636308480000000
