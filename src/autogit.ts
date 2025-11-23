function factorial(n: number): number {
    // Validate input: must be a non-negative integer
    if (!Number.isInteger(n) || n < 0) {
        throw new Error("Factorial is only defined for non-negative integers.");
    }

    // Base case: factorial of 0 or 1 is 1
    if (n === 0 || n === 1) {
        return 1;
    }

    // Recursive case: n! = n * (n-1)!
    return n * factorial(n - 1);
}
console.log(factorial(5));  // 120 (5 × 4 × 3 × 2 × 1)
console.log(factorial(0));  // 1
console.log(factorial(1));  // 1

// These will throw errors:
// console.log(factorial(-2));  // Error: "Factorial is only defined..."
// console.log(factorial(2.5)); // Error: "Factorial is only defined..."
