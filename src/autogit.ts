function factorial(n: number): number {
    // Base case: factorial of 0 or 1 is 1
    if (n <= 1) {
        return 1;
    }
    // Recursive case: n! = n * (n-1)!
    return n * factorial(n - 1);
}

// Usage
console.log(factorial(5));  // Output: 120
console.log(factorial(0));  // Output: 1
function factorial(n: number): number {
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers");
    }
    
    // Handle non-integer inputs (optional)
    if (!Number.isInteger(n)) {
        throw new Error("Factorial is only defined for integers");
    }
    
    // Base case
    if (n === 0 || n === 1) {
        return 1;
    }
    
    // Recursive case
    return n * factorial(n - 1);
}

// Usage examples
try {
    console.log(factorial(5));    // 120
    console.log(factorial(0));    // 1
    console.log(factorial(1));    // 1
} catch (error) {
    console.error(error.message);
}
const factorial = (n: number): number => {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
};
const memoizedFactorial = (() => {
    const cache: Record<number, number> = {};
    
    return function factorial(n: number): number {
        if (n <= 1) return 1;
        
        // Check if result is cached
        if (cache[n]) {
            return cache[n];
        }
        
        // Calculate and cache the result
        cache[n] = n * factorial(n - 1);
        return cache[n];
    };
})();

console.log(memoizedFactorial(10));  // 3628800
function factorialIterative(n: number): number {
    if (n < 0) throw new Error("Negative numbers not allowed");
    
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
