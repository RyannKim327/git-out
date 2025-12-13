function factorial(n: number): number {
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers");
    }
    if (!Number.isInteger(n)) {
        throw new Error("Factorial is only defined for integers");
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
    if (!Number.isInteger(n)) {
        throw new Error("Factorial is only defined for integers");
    }
    
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorialRecursive(n - 1);
}

// Usage
console.log(factorialRecursive(5)); // 120
function factorialFunctional(n: number): number {
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers");
    }
    if (!Number.isInteger(n)) {
        throw new Error("Factorial is only defined for integers");
    }
    
    return Array.from({ length: n }, (_, i) => i + 1)
        .reduce((acc, val) => acc * val, 1);
}

// Usage
console.log(factorialFunctional(5)); // 120
class FactorialCalculator {
    private memo: Map<number, number> = new Map();
    
    factorialMemoized(n: number): number {
        if (n < 0) {
            throw new Error("Factorial is not defined for negative numbers");
        }
        if (!Number.isInteger(n)) {
            throw new Error("Factorial is only defined for integers");
        }
        
        if (this.memo.has(n)) {
            return this.memo.get(n)!;
        }
        
        if (n === 0 || n === 1) {
            this.memo.set(n, 1);
            return 1;
        }
        
        const result = n * this.factorialMemoized(n - 1);
        this.memo.set(n, result);
        return result;
    }
}

// Usage
const calculator = new FactorialCalculator();
console.log(calculator.factorialMemoized(5)); // 120
console.log(calculator.factorialMemoized(6)); // 720 (uses memo)
function factorialBigInt(n: number): bigint {
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers");
    }
    if (!Number.isInteger(n)) {
        throw new Error("Factorial is only defined for integers");
    }
    
    let result = 1n;
    for (let i = 2; i <= n; i++) {
        result *= BigInt(i);
    }
    return result;
}

// Usage
console.log(factorialBigInt(20).toString()); // 2432902008176640000
