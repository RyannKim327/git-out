function factorial(n: number): number {
    if (!Number.isInteger(n) || n < 0) {
        throw new Error("Factorial is only defined for non-negative integers.");
    }
    if (n === 0) {
        return 1; // Base case: 0! = 1
    }
    return n * factorial(n - 1); // Recursive call
}
console.log(factorial(5)); // Output: 120
console.log(factorial(0)); // Output: 1
