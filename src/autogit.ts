function factorial(n: number): number {
    // Handle invalid inputs
    if (n < 0 || !Number.isInteger(n)) {
        throw new Error("Factorial is only defined for non-negative integers.");
    }
    
    // Base case: 0! = 1
    if (n === 0) return 1;

    // Calculate factorial iteratively
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
function factorial(n: number): number {
    // Input validation
    if (n < 0 || !Number.isInteger(n)) {
        throw new Error("Factorial is only defined for non-negative integers.");
    }

    // Base case
    if (n === 0) return 1;

    // Recursive case
    return n * factorial(n - 1);
}
console.log(factorial(5));  // Output: 120
console.log(factorial(0));  // Output: 1
console.log(factorial(10)); // Output: 3628800
function factorialBigInt(n: bigint): bigint {
    if (n < 0n) throw new Error("Negative values not allowed");
    if (n === 0n) return 1n;
    
    let result = 1n;
    for (let i = 2n; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Usage:
console.log(String(factorialBigInt(30n))); // 265252859812191058636308480000000
