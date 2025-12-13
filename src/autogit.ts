function factorial(n: number): number {
    // Base case: factorial of 0 or 1 is 1
    if (n === 0 || n === 1) {
        return 1;
    }
    // Recursive case: n! = n × (n-1)!
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
    
    // Base case
    if (n === 0 || n === 1) {
        return 1;
    }
    
    // Recursive case
    return n * factorial(n - 1);
}
function factorial<T extends number>(n: T): number {
    if (n < 0 || !Number.isInteger(n)) {
        throw new Error("Factorial requires non-negative integers");
    }
    
    if (n === 0 || n === 1) {
        return 1;
    }
    
    return n * factorial(n - 1);
}
// Test the function
console.log(factorial(0));  // 1
console.log(factorial(1));  // 1
console.log(factorial(5));  // 120
console.log(factorial(10)); // 3628800

// Error cases (will throw errors)
// console.log(factorial(-1)); // Error: Factorial is not defined for negative numbers
// console.log(factorial(3.5)); // Error: Factorial is only defined for integers
function factorialIterative(n: number): number {
    if (n < 0 || !Number.isInteger(n)) {
        throw new Error("Factorial requires non-negative integers");
    }
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
