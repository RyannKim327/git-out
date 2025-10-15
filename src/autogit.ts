function factorial(n: number): number {
    // Base case
    if (n === 0 || n === 1) {
        return 1;
    }
    // Recursive case
    return n * factorial(n - 1);
}
function factorial(n: number): number {
    // Input validation
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers");
    }
    
    if (!Number.isInteger(n)) {
        throw new Error("Factorial is only defined for integers");
    }
    
    // Base cases
    if (n === 0 || n === 1) {
        return 1;
    }
    
    // Recursive case
    return n * factorial(n - 1);
}
// Test the function
console.log(factorial(0));  // 1
console.log(factorial(1));  // 1
console.log(factorial(5));  // 120
console.log(factorial(7));  // 5040

// Error cases
try {
    console.log(factorial(-1));
} catch (error) {
    console.error((error as Error).message); // "Factorial is not defined for negative numbers"
}

try {
    console.log(factorial(2.5));
} catch (error) {
    console.error((error as Error).message); // "Factorial is only defined for integers"
}
function isNonNegativeInteger(n: number): n is number {
    return Number.isInteger(n) && n >= 0;
}

function factorial(n: number): number {
    if (!isNonNegativeInteger(n)) {
        throw new Error("Input must be a non-negative integer");
    }
    
    if (n === 0 || n === 1) {
        return 1;
    }
    
    return n * factorial(n - 1);
}
function factorialIterative(n: number): number {
    if (n < 0 || !Number.isInteger(n)) {
        throw new Error("Input must be a non-negative integer");
    }
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
