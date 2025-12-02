function factorial(n: number): number {
    // Validate input
    if (n < 0 || !Number.isInteger(n)) {
        throw new Error("Factorial is only defined for non-negative integers.");
    }

    // Base case: 0! = 1
    if (n === 0) {
        return 1;
    }

    // Recursive case: n! = n * (n-1)!
    return n * factorial(n - 1);
}

// Example Usage:
console.log(factorial(5)); // Output: 120
console.log(factorial(0)); // Output: 1
function factorialIterative(n: number): number {
    if (n < 0 || !Number.isInteger(n)) {
        throw new Error("Invalid input: Non-negative integer required.");
    }
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
