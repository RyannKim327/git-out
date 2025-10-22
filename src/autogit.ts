function factorial(n: number): number {
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers");
    }
    if (n === 0 || n === 1) {
        return 1;
    }
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Usage
console.log(factorial(5)); // 120
console.log(factorial(0)); // 1
function factorialRecursive(n: number): number {
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers");
    }
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorialRecursive(n - 1);
}

// Usage
console.log(factorialRecursive(5)); // 120
function factorialReduce(n: number): number {
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers");
    }
    if (n === 0 || n === 1) {
        return 1;
    }
    
    return Array.from({ length: n }, (_, i) => i + 1)
        .reduce((acc, curr) => acc * curr, 1);
}

// Usage
console.log(factorialReduce(5)); // 120
function factorialBigInt(n: number): bigint {
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers");
    }
    if (n === 0 || n === 1) {
        return 1n;
    }
    
    let result = 1n;
    for (let i = 2; i <= n; i++) {
        result *= BigInt(i);
    }
    return result;
}

// Usage
console.log(factorialBigInt(20).toString()); // 2432902008176640000
type NonNegativeInteger<T extends number> = 
    T extends number ? 
        `${T}` extends `-${string}` | `${string}.${string}` ? 
            never : T : never;

function factorial<T extends number>(
    n: NonNegativeInteger<T>
): number {
    if (n === 0 || n === 1) {
        return 1;
    }
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Usage - will only accept non-negative integers
console.log(factorial(5));     // 120
// console.log(factorial(-5));  // TypeScript error
// console.log(factorial(5.5)); // TypeScript error
// Test all implementations
const testNumber = 5;

console.log("Iterative:", factorial(testNumber));
console.log("Recursive:", factorialRecursive(testNumber));
console.log("Reduce:", factorialReduce(testNumber));
console.log("BigInt:", factorialBigInt(testNumber).toString());
