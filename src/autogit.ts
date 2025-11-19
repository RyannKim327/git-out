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
    
    let result: bigint = BigInt(1);
    for (let i = 2; i <= n; i++) {
        result *= BigInt(i);
    }
    return result;
}

// Usage
console.log(factorialBigInt(20).toString()); // "2432902008176640000"
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
            this.cache.set(n, 1);
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
function factorialReduce(n: number): number {
    if (n < 0 || !Number.isInteger(n)) {
        throw new Error("Factorial is only defined for non-negative integers");
    }
    
    return Array.from({length: n}, (_, i) => i + 1)
               .reduce((acc, val) => acc * val, 1);
}

// Usage
console.log(factorialReduce(5)); // 120
