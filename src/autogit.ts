function fibonacciSearch(arr: number[], key: number): number {
    let n = arr.length;
    // Initialize fibonacci numbers
    let fibMm2 = 0; // (m-2)'th Fibonacci number
    let fibMm1 = 1; // (m-1)'th Fibonacci number
    let fibM = fibMm2 + fibMm1; // m'th Fibonacci number

    // Find the smallest Fibonacci number greater than or equal to n
    while (fibM < n) {
        fibMm2 = fibMm1;
        fibMm1 = fibM;
        fibM = fibMm2 + fibMm1;
    }

    // Marks the eliminated range from front
    let offset = -1;

    while (fibM > 1) {
        // Check if fibMm2 is a valid location
        let i = Math.min(offset + fibMm2, n - 1);

        if (arr[i] < key) {
            // Move three Fibonacci numbers down
            fibM = fibMm1;
            fibMm1 = fibMm2;
            fibMm2 = fibM - fibMm1;
            offset = i;
        } else if (arr[i] > key) {
            // Move two Fibonacci numbers down
            fibM = fibMm2;
            fibMm1 = fibMm1 - fibMm2;
            fibMm2 = fibM - fibMm1;
        } else {
            // Found
            return i;
        }
    }

    // Check if the last element is the key
    if (fibMm1 && arr[offset + 1] === key) {
        return offset + 1;
    }

    // Not found
    return -1;
}

// Example usage:
const arr = [1, 3, 5, 7, 9, 11, 13, 17, 23, 29, 31];
const key = 13;
console.log(fibonacciSearch(arr, key)); // Output: 6
