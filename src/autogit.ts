function factorial(n: number): number {
    // Base cases
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers");
    }
    if (n === 0 || n === 1) {
        return 1;
    }
    
    // Recursive case
    return n * factorial(n - 1);
}

// Example usage
console.log(factorial(5)); // Output: 120 (5 * 4 * 3 * 2 * 1)
console.log(factorial(0)); // Output: 1
console.log(factorial(3)); // Output: 6
function factorialBig(n: number): bigint {
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers");
    }
    if (n === 0 || n === 1) {
        return 1n;
    }
    
    return BigInt(n) * factorialBig(n - 1);
}

// Example usage
console.log(factorialBig(20).toString()); // Handles large numbers without overflow
