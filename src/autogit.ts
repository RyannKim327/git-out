/**
 * Performs a Fibonacci search on a sorted array.
 * 
 * @param arr - The sorted array to search in (ascending order)
 * @param key - The value to search for
 * @returns The index of the key if found, otherwise -1
 */
function fibonacciSearch(arr: number[], key: number): number {
    const n = arr.length;
    
    // Initialize Fibonacci numbers
    let fib2 = 0;          // (k-2)th Fibonacci number
    let fib1 = 1;          // (k-1)th Fibonacci number
    let fibM = fib2 + fib1; // kth Fibonacci number (smallest Fibonacci >= n)

    // Find the smallest Fibonacci number greater than or equal to n
    while (fibM < n) {
        fib2 = fib1;
        fib1 = fibM;
        fibM = fib2 + fib1;
    }

    let offset = -1; // Marks the start of the eliminated range

    while (fibM > 1) {
        // Check if fib2 is a valid index
        const i = Math.min(offset + fib2, n - 1);

        if (arr[i] < key) {
            // Move the search range to right subarray (1 Fibonacci down)
            fibM = fib1;
            fib1 = fib2;
            fib2 = fibM - fib1;
            offset = i;
        } else if (arr[i] > key) {
            // Move the search range to left subarray (2 Fibonacci down)
            fibM = fib2;
            fib1 = fib1 - fib2;
            fib2 = fibM - fib1;
        } else {
            return i; // Found at index i
        }
    }

    // Compare the last element with remaining Fibonacci number 1
    if (fib1 === 1 && arr[offset + 1] === key) {
        return offset + 1;
    }

    return -1; // Key not found
}
const sortedArray = [10, 22, 35, 40, 45, 50, 80, 82, 85, 90, 100];
const target = 85;

const result = fibonacciSearch(sortedArray, target);
console.log(result); // Output: 8

// Edge case examples
console.log(fibonacciSearch(sortedArray, 10));    // 0 (first element)
console.log(fibonacciSearch(sortedArray, 100));   // 10 (last element)
console.log(fibonacciSearch([], 42));             // -1 (empty array)
console.log(fib
