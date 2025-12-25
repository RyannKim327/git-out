class FibonacciSearch {
    /**
     * Generates Fibonacci numbers up to a given length
     */
    private generateFibonacci(n: number): number[] {
        if (n <= 0) return [0];
        if (n === 1) return [0, 1];
        
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
    search<T>(arr: T[], target: T): number {
        if (arr.length === 0) return -1;

        // Generate Fibonacci numbers
        const fib = this.generateFibonacci(arr.length);
        let fibM2 = fib[fib.length - 2];  // (m-2)'th Fibonacci number
        let fibM1 = fib[fib.length - 1];  // (m-1)'th Fibonacci number
        let fibM = fibM2 + fibM1;         // m'th Fibonacci number

        let offset = -1;

        while (fibM > 1) {
            // Check if fibM2 is a valid location
            const i = Math.min(offset + fibM2, arr.length - 1);

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
                // Element found
                return i;
            }
        }

        // Compare the last element
        if (fibM1 === 1 && arr[offset + 1] === target) {
            return offset + 1;
        }

        return -1;
    }

    /**
     * Alternative implementation with more detailed logging for educational purposes
     */
    searchWithLogging<T>(arr: T[], target: T): number {
        console.log(`Searching for ${target} in array:`, arr);
        
        if (arr.length === 0) {
            console.log("Array is empty");
            return -1;
        }

        const fib = this.generateFibonacci(arr.length);
        console.log("Fibonacci sequence:", fib);

        let fibM2 = fib[fib.length - 2];
        let fibM1 = fib[fib.length - 1];
        let fibM = fibM2 + fibM1;
        let offset = -1;

        let step = 0;
        console.log(`Initial: fibM2=${fibM2}, fibM1=${fibM1}, fibM=${fibM}, offset=${offset}`);

        while (fibM > 1) {
            step++;
            const i = Math.min(offset + fibM2, arr.length - 1);
            console.log(`\nStep ${step}: i=${i}, arr[${i}]=${arr[i]}`);

            if (arr[i] < target) {
                console.log(`${arr[i]} < ${target} - searching right subarray`);
                fibM = fibM1;
                fibM1 = fibM2;
                fibM2 = fibM - fibM1;
                offset = i;
            } else if (arr[i] > target) {
                console.log(`${arr[i]} > ${target} - searching left subarray`);
                fibM = fibM2;
                fibM1 = fibM1 - fibM2;
                fibM2 = fibM - fibM1;
            } else {
                console.log(`Found at index ${i}`);
                return i;
            }

            console.log(`Updated: fibM2=${fibM2}, fibM1=${fibM1}, fibM=${fibM}, offset=${offset}`);
        }

        if (fibM1 === 1 && offset + 1 < arr.length && arr[offset + 1] === target) {
            console.log(`Found at index ${offset + 1}`);
            return offset + 1;
        }

        console.log("Target not found");
        return -1;
    }
}

// Example usage
const fibonacciSearch = new FibonacciSearch();

// Test with numbers
const numbers = [10, 22, 35, 40, 45, 50, 80, 82, 85, 90, 100];
console.log("Fibonacci Search Example:");
console.log("Array:", numbers);

// Search for existing elements
console.log("\nSearching for 45:", fibonacciSearch.search(numbers, 45));
console.log("Searching for 100:", fibonacciSearch.search(numbers, 100));
console.log("Searching for 10:", fibonacciSearch.search(numbers, 10));

// Search for non-existing element
console.log("Searching for 99:", fibonacciSearch.search(numbers, 99));

// Test with detailed logging
console.log("\n=== Detailed Search ===");
fibonacciSearch.searchWithLogging(numbers, 45);

// Test with strings
const strings = ["apple", "banana", "cherry", "date", "elderberry"];
console.log("\nString array:", strings);
console.log("Searching for 'cherry':", fibonacciSearch.search(strings, "cherry"));

// Generic interface for the search function
interface Searchable<T> {
    search(arr: T[], target: T): number;
}

// Using the FibonacciSearch as a Searchable implementation
const stringSearcher: Searchable<string> = fibonacciSearch;
console.log("Searching for 'date' using interface:", stringSearcher.search(strings, "date"));
