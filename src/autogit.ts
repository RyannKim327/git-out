function factorial(n: number): number {
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers");
    }
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Usage
console.log(factorial(5)); // Output: 120
console.log(factorial(0)); // Output: 1
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
console.log(factorialRecursive(5)); // Output: 120
function factorialFunctional(n: number): number {
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers");
    }
    if (n === 0) return 1;
    
    return Array.from({length: n}, (_, i) => i + 1)
        .reduce((acc, val) => acc * val, 1);
}

// Usage
console.log(factorialFunctional(5)); // Output: 120
class FactorialCalculator {
    private static memo: Map<number, number> = new Map();
    
    static factorialMemoized(n: number): number {
        if (n < 0) {
            throw new Error("Factorial is not defined for negative numbers");
        }
        
        if (n === 0 || n === 1) return 1;
        
        if (this.memo.has(n)) {
            return this.memo.get(n)!;
        }
        
        const result = n * this.factorialMemoized(n - 1);
        this.memo.set(n, result);
        return result;
    }
}

// Usage
console.log(FactorialCalculator.factorialMemoized(5)); // Output: 120
function factorialBigInt(n: number): bigint {
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers");
    }
    
    let result: bigint = 1n;
    for (let i = 2; i <= n; i++) {
        result *= BigInt(i);
    }
    return result;
}

// Usage
console.log(factorialBigInt(20).toString()); // Output: 2432902008176640000
