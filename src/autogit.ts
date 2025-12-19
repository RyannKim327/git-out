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
// For numbers that might exceed JavaScript's number limit
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
class FactorialCalculator {
    private memo: Map<number, number> = new Map();
    
    calculate(n: number): number {
        if (n < 0) {
            throw new Error("Factorial is not defined for negative numbers");
        }
        
        if (this.memo.has(n)) {
            return this.memo.get(n)!;
        }
        
        if (n === 0 || n === 1) {
            this.memo.set(n, 1);
            return 1;
        }
        
        const result = n * this.calculate(n - 1);
        this.memo.set(n, result);
        return result;
    }
}

// Usage
const calculator = new FactorialCalculator();
console.log(calculator.calculate(5)); // 120
console.log(calculator.calculate(6)); // 720 (uses cached result for efficiency)
const factorialOneLiner = (n: number): number => 
    n < 0 ? 
        (() => { throw new Error("Factorial is not defined for negative numbers") })() :
        Array.from({length: n}, (_, i) => i + 1)
             .reduce((acc, val) => acc * val, 1);

// Usage
console.log(factorialOneLiner(5)); // 120
