function fibonacciSearch(arr: number[], target: number): number {
    const n = arr.length;

    // Initialize Fibonacci numbers
    let fibMm2 = 0;  // (m-2)'th Fibonacci number
    let fibMm1 = 1;  // (m-1)'th Fibonacci number
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
        const i = Math.min(offset + fibMm2, n - 1);

        if (arr[i] < target) {
            // Move the three Fibonacci down one
            fibM = fibMm1;
            fibMm1 = fibMm2;
            fibMm2 = fibM - fibMm1;
            offset = i;
        } else if (arr[i] > target) {
            // Move the three Fibonacci down two
            fibM = fibMm2;
            fibMm1 = fibMm1 - fibMm2;
            fibMm2 = fibM - fibMm1;
        } else {
            // Found the element
            return i;
        }
    }

    // Checking if the last element matches the target
    if (fibMm1 && arr[offset + 1] === target) {
        return offset + 1;
    }

    // Element not found
    return -1;
}

// Example usage:
const sortedArray = [10, 22, 35, 40, 45, 50, 60, 70, 80, 90, 100];
console.log(fibonacciSearch(sortedArray, 35)); // Output: 2
console.log(fibonacciSearch(sortedArray, 55)); // Output: -1
