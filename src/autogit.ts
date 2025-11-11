function factorial(n: number): number {
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers");
    }
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Example usage
console.log(factorial(5)); // Output: 120
console.log(factorial(0)); // Output: 1
function factorialRecursive(n: number): number {
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers");
    }
    
    if (n === 0 || n === 1) {
        return 1;
    }
    
    return n * factorialRecursive(n - 1);
}

// Example usage
console.log(factorialRecursive(5)); // Output: 120
function factorialFunctional(n: number): number {
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers");
    }
    
    if (n === 0) return 1;
    
    return Array.from({length: n}, (_, i) => i + 1)
                .reduce((acc, val) => acc * val, 1);
}

// Example usage
console.log(factorialFunctional(5)); // Output: 120
function factorialBigInt(n: number): BigInt {
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers");
    }
    
    let result = BigInt(1);
    for (let i = 2; i <= n; i++) {
        result *= BigInt(i);
    }
    return result;
}

// Example usage
console.log(factorialBigInt(20).toString()); // Output: 2432902008176640000
function factorial(n: number): number {
    // Input validation
    if (!Number.isInteger(n)) {
        throw new Error("Input must be an integer");
    }
    
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers");
    }
    
    // Handle edge cases
    if (n === 0 || n === 1) {
        return 1;
    }
    
    // Calculate factorial
    let result = 1;
    for (let i = 2; i <= n; i++) {
        if (result > Number.MAX_SAFE_INTEGER / i) {
            throw new Error("Result exceeds maximum safe integer");
        }
        result *= i;
    }
    
    return result;
}

// Test cases
try {
    console.log(factorial(5));  // 120
    console.log(factorial(0));  // 1
    console.log(factorial(1));  // 1
    console.log(factorial(10)); // 3628800
} catch (error) {
    console.error(error.message);
}
