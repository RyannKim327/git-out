function factorial(n: number): number {
    if (n < 0) throw new Error("Factorial is not defined for negative numbers");
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

// Usage
console.log(factorial(5)); // 120
console.log(factorial(0)); // 1
function factorialIterative(n: number): number {
    if (n < 0) throw new Error("Factorial is not defined for negative numbers");
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Usage
console.log(factorialIterative(5)); // 120
function factorialBigInt(n: number | bigint): bigint {
    const num = BigInt(n);
    if (num < 0n) throw new Error("Factorial is not defined for negative numbers");
    if (num === 0n || num === 1n) return 1n;
    
    let result = 1n;
    for (let i = 2n; i <= num; i++) {
        result *= i;
    }
    return result;
}

// Usage
console.log(factorialBigInt(5)); // 120n
console.log(factorialBigInt(20)); // 2432902008176640000n
class FactorialCalculator {
    private static cache: Map<number, number> = new Map();
    
    static calculate(n: number): number {
        if (n < 0) throw new Error("Factorial is not defined for negative numbers");
        if (n === 0 || n === 1) return 1;
        
        if (this.cache.has(n)) {
            return this.cache.get(n)!;
        }
        
        const result = n * this.calculate(n - 1);
        this.cache.set(n, result);
        return result;
    }
}

// Usage
console.log(FactorialCalculator.calculate(5)); // 120
// Type for non-negative integers
type NonNegativeInteger<T extends number> = 
    `${T}` extends `-${string}` | `${string}.${string}` 
    ? never 
    : T;

function factorialWithType<T extends number>(
    n: NonNegativeInteger<T>
): number {
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Usage (this won't compile with negative numbers)
console.log(factorialWithType(5)); // 120
// console.log(factorialWithType(-5)); // TypeScript error!
