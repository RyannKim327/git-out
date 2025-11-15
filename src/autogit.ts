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
console.log(factorial(1)); // Output: 1
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
const factorialMemo = (() => {
    const cache: Record<number, number> = {};
    
    return function(n: number): number {
        if (n < 0) {
            throw new Error("Factorial is not defined for negative numbers");
        }
        
        if (n in cache) {
            return cache[n];
        }
        
        if (n === 0 || n === 1) {
            return cache[n] = 1;
        }
        
        return cache[n] = n * factorialMemo(n - 1);
    };
})();

// Usage
console.log(factorialMemo(5)); // Output: 120
function factorialReduce(n: number): number {
    if (n < 0) {
        throw new Error("Factorial is not defined for negative numbers");
    }
    
    return Array.from({length: n}, (_, i) => i + 1)
                .reduce((acc, val) => acc * val, 1);
}

// Usage
console.log(factorialReduce(5)); // Output: 120
