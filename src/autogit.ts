function fibonacciSearch(arr: number[], target: number): number {
    // Initialize Fibonacci numbers
    let fibMMm2 = 0; // (m-2)'th Fibonacci number
    let fibMMm1 = 1; // (m-1)'th Fibonacci number
    let fibM = fibMMm2 + fibMMm1; // m'th Fibonacci number

    // Find the smallest Fibonacci number greater than or equal to array length
    while (fibM < arr.length) {
        fibMMm2 = fibMMm1;
        fibMMm1 = fibM;
        fibM = fibMMm2 + fibMMm1;
    }

    // Marks the eliminated range from front
    let offset = -1;

    while (fibM > 1) {
        // Check if fibMMm2 is a valid location
        const i = Math.min(offset + fibMMm2, arr.length - 1);

        // If target is greater than value at index fibMMm2,
        // cut the subarray from offset to i
        if (arr[i] < target) {
            fibM = fibMMm1;
            fibMMm1 = fibMMm2;
            fibMMm2 = fibM - fibMMm1;
            offset = i;
        }
        // If target is less than value at index fibMMm2,
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
    if (fibMMm1 === 1 && arr[offset + 1] === target) {
        return offset + 1;
    }

    // Element not found
    return -1;
}
interface FibonacciSearchResult {
    index: number;
    iterations: number;
    comparisons: number;
}

function fibonacciSearchEnhanced<T>(
    arr: T[],
    target: T,
    compareFn: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): FibonacciSearchResult {
    if (arr.length === 0) {
        return { index: -1, iterations: 0, comparisons: 0 };
    }

    let iterations = 0;
    let comparisons = 0;

    // Initialize Fibonacci numbers
    let fibMMm2 = 0;
    let fibMMm1 = 1;
    let fibM = fibMMm2 + fibMMm1;

    // Find the smallest Fibonacci number greater than or equal to array length
    while (fibM < arr.length) {
        fibMMm2 = fibMMm1;
        fibMMm1 = fibM;
        fibM = fibMMm2 + fibMMm1;
        iterations++;
    }

    let offset = -1;

    while (fibM > 1) {
        iterations++;
        
        const i = Math.min(offset + fibMMm2, arr.length - 1);
        comparisons++;
        
        const comparison = compareFn(arr[i], target);

        if (comparison < 0) {
            // Target is greater, search in the right subarray
            fibM = fibMMm1;
            fibMMm1 = fibMMm2;
            fibMMm2 = fibM - fibMMm1;
            offset = i;
        } else if (comparison > 0) {
            // Target is smaller, search in the left subarray
            fibM = fibMMm2;
            fibMMm1 = fibMMm1 - fibMMm2;
            fibMMm2 = fibM - fibMMm1;
        } else {
            // Element found
            return { index: i, iterations, comparisons };
        }
    }

    // Check the last element
    if (fibMMm1 === 1 && offset + 1 < arr.length) {
        comparisons++;
        if (compareFn(arr[offset + 1], target) === 0) {
            return { index: offset + 1, iterations, comparisons };
        }
    }

    return { index: -1, iterations, comparisons };
}
// Example 1: Basic usage with numbers
const numbers = [10, 22, 35, 40, 45, 50, 80, 82, 85, 90, 100];
console.log(fibonacciSearch(numbers, 85)); // Output: 8

// Example 2: Enhanced version with custom objects
interface Person {
    id: number;
    name: string;
    age: number;
}

const people: Person[] = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 },
    { id: 3, name: "Charlie", age: 35 },
    { id: 4, name: "David", age: 40 }
];

// Search by age
const result = fibonacciSearchEnhanced(
    people,
    { id: 3, name: "Charlie", age: 35 },
    (a, b) => a.age - b.age
);
console.log(result); // Output: { index: 2, iterations: 3, comparisons: 3 }

// Example 3: With strings
const fruits = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
const fruitResult = fibonacciSearchEnhanced(fruits, 'cherry');
console.log(fruitResult.index); // Output: 2

// Example 4: Performance comparison
function testPerformance() {
    const largeArray = Array.from({ length: 10000 }, (_, i) => i * 2);
    const target = 5000;
    
    console.time('Fibonacci Search');
    const result = fibonacciSearchEnhanced(largeArray, target);
    console.timeEnd('Fibonacci Search');
    
    console.log('Result:', result);
}

testPerformance();
