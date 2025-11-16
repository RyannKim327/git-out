function factorial(n: number): number {
    // Base case: factorial of 0 or 1 is 1
    if (n <= 1) {
        return 1;
    }
    // Recursive case: n! = n × (n-1)!
    return n * factorial(n - 1);
}

// Example usage
console.log(factorial(5)); // Output: 120
console.log(factorial(0)); // Output: 1
function factorial(n: number): number {
    // Handle negative numbers
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers");
    }
    
    // Handle non-integer numbers
    if (!Number.isInteger(n)) {
        throw new Error("Factorial is only defined for integers");
    }
    
    // Base case
    if (n <= 1) {
        return 1;
    }
    
    // Recursive case
    return n * factorial(n - 1);
}

// Example usage
try {
    console.log(factorial(5));  // 120
    console.log(factorial(0));  // 1
    console.log(factorial(1));  // 1
    // console.log(factorial(-1)); // Throws error
    // console.log(factorial(3.5)); // Throws error
} catch (error) {
    console.error(error.message);
}
function factorialIterative(n: number): number {
    if (n < 0) throw new Error("Negative numbers not allowed");
    if (!Number.isInteger(n)) throw new Error("Only integers allowed");
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
function factorialBigInt(n: bigint): bigint {
    if (n < 0) throw new Error("Negative numbers not allowed");
    
    if (n <= 1) {
        return 1n;
    }
    return n * factorialBigInt(n - 1n);
}

// Usage with BigInt
console.log(factorialBigInt(20n).toString()); // 2432902008176640000
