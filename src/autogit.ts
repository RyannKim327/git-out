function factorial(n: number): number {
    // Validate input
    if (n < 0) throw new Error("Factorial is not defined for negative numbers");
    if (!Number.isInteger(n)) throw new Error("Factorial requires integer input");
    
    // Base case
    if (n === 0 || n === 1) return 1;
    
    // Recursive case
    return n * factorial(n - 1);
}
function factorial(n: number): number {
    // Validate input
    if (n < 0) throw new Error("Factorial is not defined for negative numbers");
    if (!Number.isInteger(n)) throw new Error("Factorial requires integer input");
    
    let result = 1;
    
    // Multiply numbers from 1 to n
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    
    return result;
}
console.log(factorial(5));  // Output: 120
console.log(factorial(0));  // Output: 1
console.log(factorial(8));  // Output: 40320

try {
    console.log(factorial(-2));
} catch (e) {
    console.log(e.message); // "Factorial is not defined for negative numbers"
}
function bigFactorial(n: bigint): bigint {
    return n === 0n ? 1n : n * bigFactorial(n - 1n);
}

// Usage
const hugeNumber = bigFactorial(100n);
console.log(hugeNumber.toString());
