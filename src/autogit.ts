function factorial(n: number): number {
    if (n < 0) throw new Error("Factorial is not defined for negative numbers");
    if (!Number.isInteger(n)) throw new Error("Factorial is only defined for integers");
    
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
    if (n < 0) throw new Error("Factorial is not defined for negative numbers");
    if (!Number.isInteger(n)) throw new Error("Factorial is only defined for integers");
    
    if (n === 0 || n === 1) return 1;
    return n * factorialRecursive(n - 1);
}

// Usage
console.log(factorialRecursive(5)); // 120
function factorialArray(n: number): number {
    if (n < 0) throw new Error("Factorial is not defined for negative numbers");
    if (!Number.isInteger(n)) throw new Error("Factorial is only defined for integers");
    
    return Array.from({length: n}, (_, i) => i + 1)
               .reduce((acc, val) => acc * val, 1);
}

// Usage
console.log(factorialArray(5)); // 120
class FactorialCalculator {
    private static memo: Map<number, number> = new Map();
    
    static factorialMemoized(n: number): number {
        if (n < 0) throw new Error("Factorial is not defined for negative numbers");
        if (!Number.isInteger(n)) throw new Error("Factorial is only defined for integers");
        
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
console.log(FactorialCalculator.factorialMemoized(5)); // 120
class Factorial {
    /**
     * Calculates factorial of a non-negative integer
     * @param n - Non-negative integer
     * @returns Factorial result
     * @throws Error for invalid inputs
     */
    static calculate(n: number): number {
        // Input validation
        if (n < 0) {
            throw new Error("Factorial is not defined for negative numbers");
        }
        
        if (!Number.isInteger(n)) {
            throw new Error("Factorial is only defined for integers");
        }
        
        // Base cases
        if (n === 0 || n === 1) {
            return 1;
        }
        
        // Iterative calculation
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        
        return result;
    }
}

// Usage examples
console.log(Factorial.calculate(5)); // 120
console.log(Factorial.calculate(0)); // 1
console.log(Factorial.calculate(1)); // 1

// Error cases
try {
    console.log(Factorial.calculate(-1)); // Throws error
} catch (error) {
    console.error(error.message);
}

try {
    console.log(Factorial.calculate(3.5)); // Throws error
} catch (error) {
    console.error(error.message);
}
function factorialBigInt(n: bigint): bigint {
    if (n < 0n) throw new Error("Factorial is not defined for negative numbers");
    
    let result = 1n;
    for (let i = 2n; i <= n; i++) {
        result *= i;
    }
    return result;
}

console.log(factorialBigInt(20n).toString()); // 2432902008176640000
