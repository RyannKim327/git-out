function factorialIterative(n: number): number {
    // 1. Input Validation: Factorial is not defined for negative numbers.
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers.");
    }

    // 2. Input Validation: Factorial is only defined for integers.
    if (!Number.isInteger(n)) {
        throw new Error("Factorial is only defined for integers.");
    }

    // 3. Base Case: 0! and 1! are both 1.
    if (n === 0 || n === 1) {
        return 1;
    }

    let result = 1;
    // Loop from 2 up to n (since multiplying by 1 doesn't change the result)
    for (let i = 2; i <= n; i++) {
        result *= i;
    }

    return result;
}

// --- Usage Examples ---
console.log("Iterative Factorial:");
console.log(`0! = ${factorialIterative(0)}`);     // Expected: 1
console.log(`1! = ${factorialIterative(1)}`);     // Expected: 1
console.log(`5! = ${factorialIterative(5)}`);     // Expected: 120 (5*4*3*2*1)
console.log(`10! = ${factorialIterative(10)}`);   // Expected: 3628800

// Example with a number that exceeds standard integer precision (after 20!)
// JavaScript numbers are 64-bit floats. Number.MAX_SAFE_INTEGER is 2^53 - 1.
// 21! already exceeds this.
try {
    console.log(`20! = ${factorialIterative(20)}`); // Fits within `number`
    console.log(`21! = ${factorialIterative(21)}`); // Might lose precision or exceed MAX_SAFE_INTEGER
} catch (e: any) {
    console.error(e.message);
}

// Error handling examples
try {
    factorialIterative(-5);
} catch (e: any) {
    console.error(`Error: ${e.message}`);
}

try {
    factorialIterative(3.5);
} catch (e: any) {
    console.error(`Error: ${e.message}`);
}
function factorialRecursive(n: number): number {
    // 1. Input Validation: Factorial is not defined for negative numbers.
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers.");
    }

    // 2. Input Validation: Factorial is only defined for integers.
    if (!Number.isInteger(n)) {
        throw new Error("Factorial is only defined for integers.");
    }

    // 3. Base Case: 0! and 1! are both 1. This stops the recursion.
    if (n === 0 || n === 1) {
        return 1;
    }

    // 4. Recursive Step: n! = n * (n-1)!
    return n * factorialRecursive(n - 1);
}

// --- Usage Examples ---
console.log("\nRecursive Factorial:");
console.log(`0! = ${factorialRecursive(0)}`);     // Expected: 1
console.log(`1! = ${factorialRecursive(1)}`);     // Expected: 1
console.log(`5! = ${factorialRecursive(5)}`);     // Expected: 120
console.log(`10! = ${factorialRecursive(10)}`);   // Expected: 3628800

// Error handling examples
try {
    factorialRecursive(-5);
} catch (e: any) {
    console.error(`Error: ${e.message}`);
}

try {
    factorialRecursive(3.5);
} catch (e: any) {
    console.error(`Error: ${e.message}`);
}
function factorialBigInt(n: number): bigint {
    // 1. Input Validation: Factorial is not defined for negative numbers.
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers.");
    }

    // 2. Input Validation: Factorial is only defined for integers.
    if (!Number.isInteger(n)) {
        throw new Error("Factorial is only defined for integers.");
    }

    // 3. Base Case: 0! and 1! are both 1. Use `1n` for BigInt literal.
    if (n === 0 || n === 1) {
        return 1n;
    }

    let result = 1n; // Initialize with a BigInt
    for (let i = 2; i <= n; i++) {
        result *= BigInt(i); // Convert 'i' to BigInt before multiplication
    }

    return result;
}

// --- Usage Examples ---
console.log("\nBigInt Factorial:");
console.log(`0! = ${factorialBigInt(0)}`);     // Expected: 1n
console.log(`1! = ${factorialBigInt(1)}`);     // Expected: 1n
console.log(`5! = ${factorialBigInt(5)}`);     // Expected: 120n
console.log(`20! = ${factorialBigInt(20)}`);   // Still fits standard number, but returned as BigInt
console.log(`21! = ${factorialBigInt(21)}`);   // This is where BigInt becomes essential
console.log(`50! = ${factorialBigInt(50)}`);   // A very large number!

// Error handling examples
try {
    factorialBigInt(-5);
} catch (e: any) {
    console.error(`Error: ${e.message}`);
}

try {
    factorialBigInt(3.5);
} catch (e: any) {
    console.error(`Error: ${e.message}`);
}
