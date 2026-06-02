/**
 * Performs a Fibonacci Search on a sorted array of numbers (or any comparable type).
 * @param arr  Sorted array to search.
 * @param key  Value to find.
 * @returns    Index of the key, or -1 if it’s not there.
 */
export function fibonacciSearch<T>(arr: T[], key: T, compare: (a: T, b: T) => number = (a, b) => ((a as any) > (b as any) ? 1 : ((a as any) < (b as any) ? -1 : 0))): number {
    const n = arr.length;

    // 1. Generate fibonacci numbers up to the smallest one > n
    let fibMm2 = 0; // (m-2)th Fibonacci number
    let fibMm1 = 1; // (m-1)th Fibonacci number
    let fibM = fibMm2 + fibMm1; // mth Fibonacci number

    while (fibM < n) {
        fibMm2 = fibMm1;
        fibMm1 = fibM;
        fibM = fibMm2 + fibMm1;
    }

    // 2. Mark the offset (the part of the array that's been eliminated)
    let offset = -1;

    // 3. While there is something to inspect
    while (fibM > 1) {
        // Compute the index to probe
        const i = Math.min(offset + fibMm2, n - 1);

        const cmp = compare(arr[i], key);

        if (cmp < 0) {
            // Move three Fibonacci numbers down
            fibM = fibMm1;
            fibMm1 = fibMm2;
            fibMm2 = fibM - fibMm1;
            offset = i;
        } else if (cmp > 0) {
            // Move two Fibonacci numbers down
            fibM = fibMm2;
            fibMm1 = fibMm1 - fibMm2;
            fibMm2 = fibM - fibMm1;
        } else {
            return i; // Found
        }
    }

    // If the last element is the key
    if (fibMm1 && offset + 1 < n && compare(arr[offset + 1], key) === 0) {
        return offset + 1;
    }

    return -1; // Not found
}
const sortedNums = [2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

// Simple numeric comparison works out of the box
console.log(fibonacciSearch(sortedNums, 34)); // → 6
console.log(fibonacciSearch(sortedNums, 7));  // → -1

// For strings
const fruits = ['apple', 'banana', 'cherry', 'date', 'fig', 'grape'];
console.log(fibonacciSearch(fruits, 'date')); // → 3
