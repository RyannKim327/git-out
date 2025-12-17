function factorial(n: number): number {
    if (n < 0 || !Number.isInteger(n)) {
        throw new Error("Factorial is only defined for non-negative integers");
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
    if (n < 0 || !Number.isInteger(n)) {
        throw new Error("Factorial is only defined for non-negative integers");
    }
    
    if (n === 0 || n === 1) {
        return 1;
    }
    
    return n * factorialRecursive(n - 1);
}

// Usage
console.log(factorialRecursive(5)); // 120
function factorialBigInt(n: number): bigint {
    if (n < 0 || !Number.isInteger(n)) {
        throw new Error("Factorial is only defined for non-negative integers");
    }
    
    let result = BigInt(1);
    for (let i = 2; i <= n; i++) {
        result *= BigInt(i);
    }
    return result;
}

// Usage
console.log(factorialBigInt(20).toString()); // 2432902008176640000
class FactorialCalculator {
    private cache: Map<number, number> = new Map();
    
    factorialMemoized(n: number): number {
        if (n < 0 || !Number.isInteger(n)) {
            throw new Error("Factorial is only defined for non-negative integers");
        }
        
        if (this.cache.has(n)) {
            return this.cache.get(n)!;
        }
        
        if (n === 0 || n === 1) {
            return 1;
        }
        
        const result = n * this.factorialMemoized(n - 1);
        this.cache.set(n, result);
        return result;
    }
}

// Usage
const calculator = new FactorialCalculator();
console.log(calculator.factorialMemoized(5)); // 120
function isValidFactorialInput(n: number): n is number {
    return Number.isInteger(n) && n >= 0;
}

function factorialSafe(n: number): number | string {
    if (!isValidFactorialInput(n)) {
        return "Error: Input must be a non-negative integer";
    }
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Usage
console.log(factorialSafe(5)); // 120
console.log(factorialSafe(-1)); // "Error: Input must be a non-negative integer"
