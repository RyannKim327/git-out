function factorialIterative(n: number): number {
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
console.log(factorialIterative(5)); // 120
console.log(factorialIterative(0)); // 1
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
function factorialMemoized(): (n: number) => number {
    const cache = new Map<number, number>();
    
    return function calculate(n: number): number {
        if (n < 0) {
            throw new Error("Factorial is not defined for negative numbers");
        }
        if (n === 0 || n === 1) {
            return 1;
        }
        
        if (cache.has(n)) {
            return cache.get(n)!;
        }
        
        const result = n * calculate(n - 1);
        cache.set(n, result);
        return result;
    };
}

// Usage
const factorial = factorialMemoized();
console.log(factorial(5)); // 120
console.log(factorial(6)); // 720 (uses cached result for 5)
function factorialArray(n: number): number {
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers");
    }
    return Array.from({length: n}, (_, i) => i + 1)
               .reduce((acc, val) => acc * val, 1);
}

// Usage
console.log(factorialArray(5)); // 120
