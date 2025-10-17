function factorial(n: number): number {
    // Validate input
    if (n < 0 || !Number.isInteger(n)) {
        throw new Error("Input must be a non-negative integer");
    }
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Example usage
console.log(factorial(5));   // 120
console.log(factorial(0));   // 1
console.log(factorial(1));   // 1
function factorialRecursive(n: number): number {
    if (n < 0 || !Number.isInteger(n)) {
        throw new Error("Input must be a non-negative integer");
    }

    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorialRecursive(n - 1);
}

// Example usage
console.log(factorialRecursive(5));   // 120
function factorialBigInt(n: bigint): bigint {
    if (n < 0n) throw new Error("Negative numbers not allowed");
    
    let result = 1n;
    for (let i = 2n; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Usage
console.log(factorialBigInt(170n).toString());  // 725741561530798...
