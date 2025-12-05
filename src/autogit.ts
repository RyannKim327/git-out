function factorialRecursive(n: number): number {
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers.");
    }
    // Base case: 0! = 1 and 1! = 1
    if (n <= 1) {
        return 1;
    }
    // Recursive step
    return n * factorialRecursive(n - 1);
}
function factorialIterative(n: number): number {
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers.");
    }
    let result = 1;
    // Multiply result by all integers from 2 to n
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
function factorialBigInt(n: number): bigint {
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers.");
    }
    let result = 1n; // 'n' suffix denotes a BigInt literal
    for (let i = 2; i <= n; i++) {
        result *= BigInt(i);
    }
    return result;
}

const hugeFactorial = factorialBigInt(25); // 15511210043330985984000000n (accurate!)
