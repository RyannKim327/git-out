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
     * @param arr Sorted array to search
     * @param target Value to find
     * @returns Index of the target or -1 if not found
     */
    search<T>(arr: T[], target: T): number {
        if (arr.length === 0) return -1;

        const n = arr.length;
        const fib = this.generateFibonacci(n);
        
        let fibM2 = fib[fib.length - 3]; // (m-2)'th Fibonacci number
        let fibM1 = fib[fib.length - 2]; // (m-1)'th Fibonacci number
        let fibM = fib[fib.length - 1];  // m'th Fibonacci number
        
        let offset = -1;
        let i = 0;

        while (fibM > 1) {
            // Prevent index out of bounds
            i = Math.min(offset + fibM2, n - 1);

            if (arr[i] < target) {
                // Target is in the right subarray
                fibM = fibM1;
                fibM1 = fibM2;
                fibM2 = fibM - fibM1;
                offset = i;
            } else if (arr[i] > target) {
                // Target is in the left subarray
                fibM = fibM2;
                fibM1 = fibM1 - fibM2;
                fibM2 = fibM - fibM1;
            } else {
                // Target found
                return i;
            }
        }

        // Check last element
        if (fibM1 && arr[offset + 1] === target) {
            return offset + 1;
        }

        return -1;
    }

    /**
     * Alternative implementation with more detailed logging
     */
    searchWithLogging<T>(arr: T[], target: T): number {
        console.log(`Searching for ${target} in array:`, arr);
        
        if (arr.length === 0) {
            console.log("Array is empty");
            return -1;
        }

        const n = arr.length;
        const fib = this.generateFibonacci(n);
        console.log(`Fibonacci sequence: ${fib}`);
        
        let fibM2 = fib[fib.length - 3];
        let fibM1 = fib[fib.length - 2];
        let fibM = fib[fib.length - 1];
        let offset = -1;
        let i = 0;
        let steps = 0;

        while (fibM > 1) {
            steps++;
            i = Math.min(offset + fibM2, n - 1);
            
            console.log(`Step ${steps}: offset=${offset}, i=${i}, fibM2=${fibM2}, arr[${i}]=${arr[i]}`);

            if (arr[i] < target) {
                console.log(`  ${arr[i]} < ${target} - searching right subarray`);
                fibM = fibM1;
                fibM1 = fibM2;
                fibM2 = fibM - fibM1;
                offset = i;
            } else if (arr[i] > target) {
                console.log(`  ${arr[i]} > ${target} - searching left subarray`);
                fibM = fibM2;
                fibM1 = fibM1 - fibM2;
                fibM2 = fibM - fibM1;
            } else {
                console.log(`  Found at index ${i} in ${steps} steps`);
                return i;
            }
        }

        if (fibM1 && offset + 1 < n && arr[offset + 1] === target) {
            console.log(`Found at index ${offset + 1} in ${steps + 1} steps`);
            return offset + 1;
        }

        console.log(`Not found after ${steps} steps`);
        return -1;
    }
}

// Function-based implementation (alternative approach)
function fibonacciSearch<T>(arr: T[], target: T): number {
    if (arr.length === 0) return -1;

    // Generate Fibonacci numbers
    let fibM2 = 0; // (m-2)'th Fibonacci number
    let fibM1 = 1; // (m-1)'th Fibonacci number
    let fibM = fibM2 + fibM1; // m'th Fibonacci number

    // Find the smallest Fibonacci number greater than or equal to array length
    while (fibM < arr.length) {
        fibM2 = fibM1;
        fibM1 = fibM;
        fibM = fibM2 + fibM1;
    }

    let offset = -1;

    while (fibM > 1) {
        const i = Math.min(offset + fibM2, arr.length - 1);

        if (arr[i] < target) {
            fibM = fibM1;
            fibM1 = fibM2;
            fibM2 = fibM - fibM1;
            offset = i;
        } else if (arr[i] > target) {
            fibM = fibM2;
            fibM1 = fibM1 - fibM2;
            fibM2 = fibM - fibM1;
        } else {
            return i;
        }
    }

    // Compare the last element
    if (fibM1 && arr[offset + 1] === target) {
        return offset + 1;
    }

    return -1;
}

// Example usage and testing
function testFibonacciSearch(): void {
    const searcher = new FibonacciSearch();
    
    // Test cases
    const testArrays = [
        [1, 3, 5, 7, 9, 11, 13, 15, 17, 19],
        [2, 4, 6, 8, 10],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        [100],
        []
    ];

    console.log("=== Fibonacci Search Tests ===\n");

    for (const arr of testArrays) {
        console.log(`Array: [${arr.join(', ')}]`);
        
        // Test existing elements
        for (let i = 0; i < Math.min(3, arr.length); i++) {
            const target = arr[i];
            const result = searcher.search(arr, target);
            console.log(`  Search for ${target}: index ${result} (expected ${i})`);
        }

        // Test non-existing element
        const nonExisting = arr.length > 0 ? arr[arr.length - 1] + 1 : 999;
        const result = searcher.search(arr, nonExisting);
        console.log(`  Search for ${nonExisting}: index ${result} (expected -1)`);
        console.log();
    }

    // Demonstration with logging
    console.log("=== Search with Logging ===");
    const demoArray = [10, 22, 35, 40, 45, 50, 80, 82, 85, 90, 100];
    searcher.searchWithLogging(demoArray, 85);
}

// Run tests
testFibonacciSearch();

export { FibonacciSearch, fibonacciSearch };
