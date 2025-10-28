function factorial(n: number): number {
    // Base case: factorial of 0 or 1 is 1
    if (n <= 1) {
        return 1;
    }
    
    // Recursive case: n! = n * (n-1)!
    return n * factorial(n - 1);
}

// Examples
console.log(factorial(0)); // 1
console.log(factorial(1)); // 1
console.log(factorial(5)); // 120
console.log(factorial(7)); // 5040
function factorial(n: number): number {
    // Validate input - factorial is only defined for non-negative integers
    if (!Number.isInteger(n) || n < 0) {
        throw new Error("Factorial is only defined for non-negative integers");
    }
    
    // Base cases
    if (n === 0 || n === 1) {
        return 1;
    }
    
    // Recursive case
    return n * factorial(n - 1);
}

// Usage with error handling
try {
    console.log(factorial(5)); // 120
    console.log(factorial(-1)); // Throws error
} catch (error) {
    console.error(error.message);
}
function factorialBigInt(n: bigint): bigint {
    if (n <= 1n) {
        return 1n;
    }
    
    return n * factorialBigInt(n - 1n);
}

// Examples with BigInt
console.log(factorialBigInt(20n).toString()); // 2432902008176640000
console.log(factorialBigInt(30n).toString()); // 265252859812191058636308480000000
class FactorialCalculator {
    private static memo: Map<number, number> = new Map();
    
    static calculate(n: number): number {
        if (!Number.isInteger(n) || n < 0) {
            throw new Error("Factorial is only defined for non-negative integers");
        }
        
        // Check if already calculated
        if (this.memo.has(n)) {
            return this.memo.get(n)!;
        }
        
        // Base case
        if (n <= 1) {
            return 1;
        }
        
        // Calculate and store in memo
        const result = n * this.calculate(n - 1);
        this.memo.set(n, result);
        
        return result;
    }
    
    static clearCache(): void {
        this.memo.clear();
    }
}

// Usage
console.log(FactorialCalculator.calculate(5)); // 120
console.log(FactorialCalculator.calculate(6)); // 720 (uses cached result for 5)
