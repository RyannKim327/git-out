function factorial(n: number): number {
    // Handle invalid inputs (negative numbers)
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers.");
    }
    
    // Base case: 0! = 1 and 1! = 1
    if (n === 0 || n === 1) {
        return 1;
    }
    
    // Recursive case: n! = n * (n-1)!
    return n * factorial(n - 1);
}
console.log(factorial(5)); // Output: 120 (5 × 4 × 3 × 2 × 1)
console.log(factorial(0)); // Output: 1
function bigFactorial(n: bigint): bigint {
    if (n < 0n) throw new Error("Negative numbers not allowed");
    return n === 0n ? 1n : n * bigFactorial(n - 1n);
}

console.log(bigFactorial(20n)); // 2432902008176640000n
