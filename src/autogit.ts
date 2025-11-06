function factorial(n: number): number {
    if (n < 0) throw new Error("Negative numbers have no factorial");
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

// Example usage:
console.log(factorial(5)); // Outputs: 120
