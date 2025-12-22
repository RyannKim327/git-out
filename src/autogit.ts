class FibonacciSearch {
    /**
     * Generates Fibonacci numbers up to a given value
     */
    private generateFibonacci(n: number): number[] {
        const fib: number[] = [0, 1];
        
        while (fib[fib.length - 1] < n) {
            fib.push(fib[fib.length - 1] + fib[fib.length - 2]);
        }
        
        return fib;
    }

    /**
     * Performs Fibonacci search on a sorted array
     * @param arr - Sorted array to search
     * @param target - Value to search for
     * @returns Index of the target if found, -1 otherwise
     */
    search(arr: number[], target: number): number {
        const n = arr.length;
        
        // Edge cases
        if (n === 0) return -1;
        if (n === 1) return arr[0] === target ? 0 : -1;
        
        // Generate Fibonacci numbers
        const fib = this.generateFibonacci(n);
        let fibM = fib.length - 1;
        
        let offset = 0;
        
        while (fibM > 0) {
            // Calculate the index to check
            const i = Math.min(offset + fib[fibM - 2], n - 1);
            
            if (arr[i] < target) {
                // Search in the right subarray
                fibM -= 1;
                offset = i;
            } else if (arr[i] > target) {
                // Search in the left subarray
                fibM -= 2;
            } else {
                // Found the target
                return i;
            }
        }
        
        // Check if the last element is the target
        if (fibM === 0 && arr[offset] === target) {
            return offset;
        }
        
        return -1;
    }
}
// Example usage
const fibonacciSearch = new FibonacciSearch();

const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25];
const target = 13;

const result = fibonacciSearch.search(sortedArray, target);

console.log(`Array: [${sortedArray}]`);
console.log(`Searching for: ${target}`);
console.log(`Result: ${result !== -1 ? `Found at index ${result}` : 'Not found'}`);

// Test with multiple examples
const testCases = [
    { array: [1, 2, 3, 4, 5], target: 3, expected: 2 },
    { array: [10, 20, 30, 40, 50], target: 25, expected: -1 },
    { array: [1, 3, 5, 7, 9], target: 1, expected: 0 },
    { array: [2, 4, 6, 8, 10], target: 10, expected: 4 }
];

testCases.forEach((testCase, index) => {
    const result = fibonacciSearch.search(testCase.array, testCase.target);
    const status = result === testCase.expected ? '✓ PASS' : '✗ FAIL';
    console.log(`Test ${index + 1}: ${status} - Expected ${testCase.expected}, Got ${result}`);
});
class FibonacciSearchWithLogging extends FibonacciSearch {
    search(arr: number[], target: number): number {
        console.log(`Searching for ${target} in array: [${arr}]`);
        
        const n = arr.length;
        
        if (n === 0) {
            console.log('Empty array');
            return -1;
        }
        
        const fib = this.generateFibonacci(n);
        console.log(`Generated Fibonacci sequence: [${fib}]`);
        
        let fibM = fib.length - 1;
        let offset = 0;
        let iteration = 0;
        
        while (fibM > 0) {
            iteration++;
            const i = Math.min(offset + fib[fibM - 2], n - 1);
            
            console.log(`Iteration ${iteration}: fibM=${fibM}, offset=${offset}, checking index ${i} (value=${arr[i]})`);
            
            if (arr[i] < target) {
                console.log(`Moving right - ${arr[i]} < ${target}`);
                fibM -= 1;
                offset = i;
            } else if (arr[i] > target) {
                console.log(`Moving left - ${arr[i]} > ${target}`);
                fibM -= 2;
            } else {
                console.log(`Found target at index ${i}`);
                return i;
            }
        }
        
        if (fibM === 0 && arr[offset] === target) {
            console.log(`Found target at index ${offset}`);
            return offset;
        }
        
        console.log('Target not found');
        return -1;
    }
}

// Usage with logging
const searchWithLogging = new FibonacciSearchWithLogging();
const result = searchWithLogging.search([1, 3, 5, 7, 9, 11, 13], 7);
console.log(`Final result: ${result}`);
