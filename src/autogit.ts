function fibonacciSearch(arr: number[], target: number): number {
    if (arr.length === 0) return -1;
    
    // Initialize Fibonacci numbers
    let fib2 = 0; // (m-2)'th Fibonacci number
    let fib1 = 1; // (m-1)'th Fibonacci number
    let fib = fib1 + fib2; // m'th Fibonacci number
    
    // Find the smallest Fibonacci number greater than or equal to array length
    while (fib < arr.length) {
        fib2 = fib1;
        fib1 = fib;
        fib = fib1 + fib2;
    }
    
    let offset = -1;
    
    while (fib > 1) {
        // Check if fib2 is a valid location
        const i = Math.min(offset + fib2, arr.length - 1);
        
        if (arr[i] < target) {
            // Target is in the right subarray
            fib = fib1;
            fib1 = fib2;
            fib2 = fib - fib1;
            offset = i;
        } else if (arr[i] > target) {
            // Target is in the left subarray
            fib = fib2;
            fib1 = fib1 - fib2;
            fib2 = fib - fib1;
        } else {
            // Element found
            return i;
        }
    }
    
    // Compare the last element with target
    if (fib1 === 1 && arr[offset + 1] === target) {
        return offset + 1;
    }
    
    return -1; // Element not found
}
interface FibonacciSearchResult {
    index: number;
    comparisons: number;
    found: boolean;
}

class FibonacciSearch {
    /**
     * Performs Fibonacci search on a sorted array
     * @param arr - Sorted array to search
     * @param target - Value to search for
     * @returns Search result with index and statistics
     */
    static search(arr: number[], target: number): FibonacciSearchResult {
        const result: FibonacciSearchResult = {
            index: -1,
            comparisons: 0,
            found: false
        };
        
        if (arr.length === 0) {
            return result;
        }
        
        // Precompute Fibonacci numbers up to array length
        const fibSequence = this.generateFibonacciUpTo(arr.length);
        let m = fibSequence.length - 1;
        
        let offset = -1;
        
        while (m > 0) {
            result.comparisons++;
            
            const i = Math.min(offset + fibSequence[m - 2], arr.length - 1);
            
            if (arr[i] < target) {
                // Search in the right subarray
                offset = i;
                m = m - 1;
            } else if (arr[i] > target) {
                // Search in the left subarray
                m = m - 2;
            } else {
                // Element found
                result.index = i;
                result.found = true;
                return result;
            }
        }
        
        // Check if the element is at offset + 1
        if (m === 0 && offset + 1 < arr.length) {
            result.comparisons++;
            if (arr[offset + 1] === target) {
                result.index = offset + 1;
                result.found = true;
                return result;
            }
        }
        
        return result;
    }
    
    /**
     * Generates Fibonacci numbers up to the given limit
     */
    private static generateFibonacciUpTo(limit: number): number[] {
        if (limit <= 0) return [0];
        
        const fib: number[] = [0, 1];
        
        while (fib[fib.length - 1] < limit) {
            const nextFib = fib[fib.length - 1] + fib[fib.length - 2];
            fib.push(nextFib);
        }
        
        return fib;
    }
    
    /**
     * Performs multiple searches and returns all results
     */
    static searchMultiple(arr: number[], targets: number[]): Map<number, FibonacciSearchResult> {
        const results = new Map<number, FibonacciSearchResult>();
        
        for (const target of targets) {
            results.set(target, this.search(arr, target));
        }
        
        return results;
    }
}
// Basic usage
const sortedArray = [10, 22, 35, 40, 45, 50, 80, 82, 85, 90, 100];
const target = 85;

// Using the basic function
const index = fibonacciSearch(sortedArray, target);
console.log(`Element found at index: ${index}`);

// Using the enhanced class
const result = FibonacciSearch.search(sortedArray, target);
console.log(`Element ${result.found ? 'found' : 'not found'} at index: ${result.index}`);
console.log(`Comparisons made: ${result.comparisons}`);

// Multiple searches
const targets = [10, 50, 85, 200];
const multipleResults = FibonacciSearch.searchMultiple(sortedArray, targets);

multipleResults.forEach((result, target) => {
    console.log(`Target ${target}: ${result.found ? `Found at index ${result.index}` : 'Not found'}`);
});
function testFibonacciSearch(): void {
    const testCases = [
        {
            name: "Empty array",
            arr: [] as number[],
            target: 5,
            expected: -1
        },
        {
            name: "Single element found",
            arr: [5],
            target: 5,
            expected: 0
        },
        {
            name: "Single element not found",
            arr: [5],
            target: 10,
            expected: -1
        },
        {
            name: "Multiple elements found",
            arr: [1, 3, 5, 7, 9, 11, 13, 15],
            target: 7,
            expected: 3
        },
        {
            name: "Multiple elements not found",
            arr: [1, 3, 5, 7, 9, 11, 13, 15],
            target: 8,
            expected: -1
        },
        {
            name: "Large array",
            arr: Array.from({length: 1000}, (_, i) => i * 2), // Even numbers 0-1998
            target: 500,
            expected: 250
        }
    ];

    console.log("Testing Fibonacci Search:\n");

    testCases.forEach((testCase, index) => {
        const result = FibonacciSearch.search(testCase.arr, testCase.target);
        const passed = result.index === testCase.expected;
        
        console.log(`${index + 1}. ${testCase.name}: ${passed ? 'PASS' : 'FAIL'}`);
        if (!passed) {
            console.log(`   Expected: ${testCase.expected}, Got: ${result.index}`);
        }
    });
}

// Run tests
testFibonacciSearch();
