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

// Usage
console.log(factorial(5)); // 120 (5 * 4 * 3 * 2 * 1)
console.log(factorial(0)); // 1
// console.log(factorial(-1)); // Throws error
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

// Usage
console.log(factorial(5)); // 120
console.log(factorial(10)); // 3628800
function factorialBig(n: number): bigint {
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
console.log(factorialBig(20).toString()); // 2432902008176640000
console.log(factorialBig(5).toString()); // 120
