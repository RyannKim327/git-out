function factorialRecursive(n: number): number {
    // Base cases
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers");
    }
    if (n === 0 || n === 1) {
        return 1;
    }
    
    // Recursive case
    return n * factorialRecursive(n - 1);
}

// Usage
console.log(factorialRecursive(5)); // Output: 120
function factorialIterative(n: number): number {
    // Input validation
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers");
    }
    
    if (n === 0 || n === 1) {
        return 1;
    }
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    
    return result;
}

// Usage
console.log(factorialIterative(5)); // Output: 120
function factorialBigInt(n: number): bigint {
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers");
    }
    
    if (n === 0 || n === 1) {
        return 1n;
    }
    
    let result = 1n;
    for (let i = 2n; i <= BigInt(n); i++) {
        result *= i;
    }
    
    return result;
}

// Usage
console.log(factorialBigInt(20).toString()); // Output: 2432902008176640000
class FactorialCalculator {
    /**
     * Calculate factorial iteratively (recommended for most cases)
     */
    static calculate(n: number): number {
        if (n < 0) {
            throw new Error("Factorial is not defined for negative numbers");
        }
        
        if (n === 0 || n === 1) {
            return 1;
        }
        
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        
        return result;
    }
    
    /**
     * Calculate factorial with BigInt for large numbers
     */
    static calculateBig(n: number): bigint {
        if (n < 0) {
            throw new Error("Factorial is not defined for negative numbers");
        }
        
        let result = 1n;
        for (let i = 2n; i <= BigInt(n); i++) {
            result *= i;
        }
        
        return result;
    }
}

// Test the implementation
try {
    console.log(FactorialCalculator.calculate(5));  // 120
    console.log(FactorialCalculator.calculate(0));  // 1
    console.log(FactorialCalculator.calculateBig(10).toString()); // 3628800
} catch (error) {
    console.error(error.message);
}
