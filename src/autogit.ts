function factorialIterative(n: number): number {
    if (n < 0) throw new Error("Factorial is not defined for negative numbers");
    if (!Number.isInteger(n)) throw new Error("Factorial is only defined for integers");
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Usage
console.log(factorialIterative(5)); // 120
console.log(factorialIterative(0)); // 1
function factorialRecursive(n: number): number {
    if (n < 0) throw new Error("Factorial is not defined for negative numbers");
    if (!Number.isInteger(n)) throw new Error("Factorial is only defined for integers");
    
    // Base case
    if (n === 0 || n === 1) {
        return 1;
    }
    
    // Recursive case
    return n * factorialRecursive(n - 1);
}

// Usage
console.log(factorialRecursive(5)); // 120
function factorialReduce(n: number): number {
    if (n < 0) throw new Error("Factorial is not defined for negative numbers");
    if (!Number.isInteger(n)) throw new Error("Factorial is only defined for integers");
    
    if (n === 0 || n === 1) return 1;
    
    return Array.from({length: n}, (_, i) => i + 1)
        .reduce((acc, curr) => acc * curr, 1);
}

// Usage
console.log(factorialReduce(5)); // 120
class FactorialCalculator {
    private static cache = new Map<number, number>();
    
    static factorialMemoized(n: number): number {
        if (n < 0) throw new Error("Factorial is not defined for negative numbers");
        if (!Number.isInteger(n)) throw new Error("Factorial is only defined for integers");
        
        // Check cache first
        if (this.cache.has(n)) {
            return this.cache.get(n)!;
        }
        
        // Base case
        if (n === 0 || n === 1) {
            this.cache.set(n, 1);
            return 1;
        }
        
        // Calculate and cache
        const result = n * this.factorialMemoized(n - 1);
        this.cache.set(n, result);
        return result;
    }
}

// Usage
console.log(FactorialCalculator.factorialMemoized(5)); // 120
function* factorialGenerator(): Generator<number, void, unknown> {
    let current = 1;
    let i = 0;
    
    while (true) {
        if (i === 0 || i === 1) {
            yield 1;
        } else {
            current *= i;
            yield current;
        }
        i++;
    }
}

// Usage
const factorialGen = factorialGenerator();
console.log(factorialGen.next().value); // 1 (0!)
console.log(factorialGen.next().value); // 1 (1!)
console.log(factorialGen.next().value); // 2 (2!)
console.log(factorialGen.next().value); // 6 (3!)
console.log(factorialGen.next().value); // 24 (4!)
function safeFactorial(n: number): number {
    try {
        if (n < 0) throw new Error("Input must be non-negative");
        if (!Number.isInteger(n)) throw new Error("Input must be an integer");
        if (n > 170) throw new Error("Factorial too large for JavaScript numbers");
        
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    } catch (error) {
        console.error(`Error calculating factorial of ${n}:`, error.message);
        return NaN;
    }
}
