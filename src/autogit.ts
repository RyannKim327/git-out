/**
 * Fibonacci Search Algorithm Implementation
 * 
 * @param arr - Sorted array to search in
 * @param target - Value to search for
 * @returns Index of the target if found, -1 otherwise
 */
function fibonacciSearch(arr: number[], target: number): number {
    const n = arr.length;
    
    if (n === 0) return -1;
    
    // Initialize Fibonacci numbers
    let fibMMm2 = 0; // (m-2)'th Fibonacci number
    let fibMMm1 = 1; // (m-1)'th Fibonacci number
    let fibM = fibMMm2 + fibMMm1; // m'th Fibonacci number

    // Find the smallest Fibonacci number >= n
    while (fibM < n) {
        fibMMm2 = fibMMm1;
        fibMMm1 = fibM;
        fibM = fibMMm2 + fibMMm1;
    }

    // Marks the eliminated range from front
    let offset = -1;

    while (fibM > 1) {
        // Check if fibMMm2 is valid index
        const i = Math.min(offset + fibMMm2, n - 1);

        // If target is greater than value at index fibMMm2
        // cut the subarray from offset to i
        if (arr[i] < target) {
            fibM = fibMMm1;
            fibMMm1 = fibMMm2;
            fibMMm2 = fibM - fibMMm1;
            offset = i;
        }
        // If target is less than value at index fibMMm2
        // cut the subarray after i+1
        else if (arr[i] > target) {
            fibM = fibMMm2;
            fibMMm1 = fibMMm1 - fibMMm2;
            fibMMm2 = fibM - fibMMm1;
        }
        // Element found
        else {
            return i;
        }
    }

    // Compare the last element with target
    if (fibMMm1 && arr[offset + 1] === target) {
        return offset + 1;
    }

    return -1;
}

// Alternative implementation with helper function
function fibonacciSearchWithHelpers(arr: number[], target: number): number {
    const n = arr.length;
    
    if (n === 0) return -1;
    
    // Generate Fibonacci sequence up to n
    const fibSequence = generateFibonacciSequence(n);
    
    let fibM = fibSequence[fibSequence.length - 1];
    let fibMMm1 = fibSequence[fibSequence.length - 2];
    let fibMMm2 = fibSequence[fibSequence.length - 3];
    let offset = -1;

    while (fibM > 1) {
        const i = Math.min(offset + fibMMm2, n - 1);

        if (arr[i] < target) {
            fibM = fibMMm1;
            fibMMm1 = fibMMm2;
            fibMMm2 = fibM - fibMMm1;
            offset = i;
        } else if (arr[i] > target) {
            fibM = fibMMm2;
            fibMMm1 = fibMMm1 - fibMMm2;
            fibMMm2 = fibM - fibMMm1;
        } else {
            return i;
        }
    }

    if (fibMMm1 && arr[offset + 1] === target) {
        return offset + 1;
    }

    return -1;
}

/**
 * Helper function to generate Fibonacci sequence
 */
function generateFibonacciSequence(n: number): number[] {
    if (n <= 0) return [0];
    
    const fib = [0, 1];
    while (fib[fib.length - 1] < n) {
        fib.push(fib[fib.length - 1] + fib[fib.length - 2]);
    }
    return fib;
}

// Test function
function testFibonacciSearch(): void {
    const testArray = [10, 22, 35, 40, 45, 50, 80, 82, 85, 90, 100];
    const targets = [10, 35, 85, 90, 100, 15];

    console.log("Array:", testArray);
    
    targets.forEach(target => {
        const result = fibonacciSearch(testArray, target);
        console.log(`Search for ${target}: ${result !== -1 ? `Found at index ${result}` : 'Not found'}`);
    });
}

// Run tests
testFibonacciSearch();

// Export for use in other modules
export { fibonacciSearch, fibonacciSearchWithHelpers, generateFibonacciSequence };
// Basic usage
const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
const target = 13;

const index = fibonacciSearch(sortedArray, target);
console.log(`Found at index: ${index}`); // Output: Found at index: 6
