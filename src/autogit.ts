function factorial(n: number): number {
    // Validate input (must be non-negative integer)
    if (!Number.isInteger(n) || n < 0) {
        throw new Error("Factorial is only defined for non-negative integers.");
    }

    // Base case: 0! = 1 and 1! = 1
    if (n <= 1) {
        return 1;
    }

    // Recursive case: n! = n × (n-1)!
    return n * factorial(n - 1);
}
console.log(factorial(5));  // 120
console.log(factorial(0));  // 1
console.log(factorial(1));  // 1
console.log(factorial(10)); // 3628800

try {
    factorial(-2); // Throws error
} catch (e) {
    console.error(e.message); // "Factorial is only defined for non-negative integers."
}
function bigFactorial(n: bigint): bigint {
    if (n < 0n) throw new Error("Negative numbers not allowed");
    return n <= 1n ? 1n : n * bigFactorial(n - 1n);
}

console.log(bigFactorial(50n).toString()); // 3041409320171337804361260816606476884...
