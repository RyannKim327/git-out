function fibonacciSearch<T>(arr: T[], target: T): number {
    if (arr.length === 0) return -1;

    // Initialize Fibonacci numbers
    let fibMMm2 = 0; // F(m-2)
    let fibMMm1 = 1; // F(m-1)
    let fibM = fibMMm2 + fibMMm1; // F(m)

    // Find the smallest Fibonacci number >= arr.length
    while (fibM < arr.length) {
        fibMMm2 = fibMMm1;
        fibMMm1 = fibM;
        fibM = fibMMm2 + fibMMm1;
    }

    let offset = -1;

    while (fibM > 1) {
        // Check if fibMMm2 is a valid index
        const i = Math.min(offset + fibMMm2, arr.length - 1);

        if (arr[i] < target) {
            // Move the Fibonacci window down
            fibM = fibMMm1;
            fibMMm1 = fibMMm2;
            fibMMm2 = fibM - fibMMm1;
            offset = i;
        } else if (arr[i] > target) {
            // Move the Fibonacci window down twice
            fibM = fibMMm2;
            fibMMm1 -= fibMMm2;
            fibMMm2 = fibM - fibMMm1;
        } else {
            return i;
        }
    }

    // Check last element
    if (fibMMm1 && arr[offset + 1] === target) {
        return offset + 1;
    }

    return -1;
}
// Sorted array is required
const sortedArray = [10, 22, 35, 40, 45, 50, 80, 82, 85, 90, 100];
const targets = [10, 22, 100, 50, 95]; 

targets.forEach(target => {
    const index = fibonacciSearch(sortedArray, target);
    console.log(`Index of ${target}: ${index}`);
});
