function fibonacciSearch(arr: number[], target: number): number {
    const n = arr.length;
    
    // Initialize Fibonacci numbers
    let fibMMm2 = 0;  // (m-2)'th Fibonacci number
    let fibMMm1 = 1;  // (m-1)'th Fibonacci number
    let fibM = fibMMm2 + fibMMm1;  // m'th Fibonacci number

    // Find the smallest Fibonacci number >= n
    while (fibM < n) {
        fibMMm2 = fibMMm1;
        fibMMm1 = fibM;
        fibM = fibMMm2 + fibMMm1;
    }

    let offset = -1;

    while (fibM > 1) {
        // Check if fibMMm2 is a valid location
        const i = Math.min(offset + fibMMm2, n - 1);

        // If target is greater than value at index fibMMm2,
        // cut the subarray from offset to i
        if (arr[i] < target) {
            fibM = fibMMm1;
            fibMMm1 = fibMMm2;
            fibMMm2 = fibM - fibMMm1;
            offset = i;
        }
        // If target is less than value at index fibMMm2,
        // cut the subarray after index i+1
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
    if (fibMMm1 === 1 && arr[offset + 1] === target) {
        return offset + 1;
    }

    // Element not found
    return -1;
}

// Enhanced version with detailed logging for educational purposes
function fibonacciSearchWithLogging(arr: number[], target: number): number {
    console.log(`Searching for ${target} in array: [${arr.join(', ')}]`);
    
    const n = arr.length;
    let fibMMm2 = 0;
    let fibMMm1 = 1;
    let fibM = fibMMm2 + fibMMm1;

    console.log(`Initial Fibonacci numbers: fibMMm2=${fibMMm2}, fibMMm1=${fibMMm1}, fibM=${fibM}`);

    // Find smallest Fibonacci number >= n
    while (fibM < n) {
        fibMMm2 = fibMMm1;
        fibMMm1 = fibM;
        fibM = fibMMm2 + fibMMm1;
        console.log(`Updated Fibonacci numbers: fibMMm2=${fibMMm2}, fibMMm1=${fibMMm1}, fibM=${fibM}`);
    }

    let offset = -1;
    console.log(`Initial offset: ${offset}`);

    while (fibM > 1) {
        const i = Math.min(offset + fibMMm2, n - 1);
        console.log(`Checking index ${i}: value = ${arr[i]}`);

        if (arr[i] < target) {
            console.log(`${arr[i]} < ${target}, moving right`);
            fibM = fibMMm1;
            fibMMm1 = fibMMm2;
            fibMMm2 = fibM - fibMMm1;
            offset = i;
            console.log(`New offset: ${offset}, Fibonacci: [${fibMMm2}, ${fibMMm1}, ${fibM}]`);
        } else if (arr[i] > target) {
            console.log(`${arr[i]} > ${target}, moving left`);
            fibM = fibMMm2;
            fibMMm1 = fibMMm1 - fibMMm2;
            fibMMm2 = fibM - fibMMm1;
            console.log(`Fibonacci: [${fibMMm2}, ${fibMMm1}, ${fibM}]`);
        } else {
            console.log(`Found ${target} at index ${i}`);
            return i;
        }
    }

    if (fibMMm1 === 1 && offset + 1 < n && arr[offset + 1] === target) {
        console.log(`Found ${target} at index ${offset + 1}`);
        return offset + 1;
    }

    console.log(`${target} not found`);
    return -1;
}

// Example usage and test cases
function testFibonacciSearch() {
    const sortedArray = [10, 22, 35, 40, 45, 50, 80, 82, 85, 90, 100];
    const targets = [45, 10, 100, 82, 60];

    console.log('=== Standard Fibonacci Search ===');
    targets.forEach(target => {
        const result = fibonacciSearch(sortedArray, target);
        console.log(`Target ${target} found at index: ${result}`);
    });

    console.log('\n=== Fibonacci Search with Detailed Logging ===');
    fibonacciSearchWithLogging(sortedArray, 45);
}

// Run the test
testFibonacciSearch();

// Export for use in other modules
export { fibonacciSearch, fibonacciSearchWithLogging };
const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const target = 7;

const result = fibonacciSearch(array, target);
console.log(`Element found at index: ${result}`); // Output: 6
