function fibonacciSearch(arr: number[], target: number): number {
    const n = arr.length;
    
    // Initialize Fibonacci numbers
    let fibM2 = 0; // (m-2)'th Fibonacci number
    let fibM1 = 1; // (m-1)'th Fibonacci number
    let fibM = fibM2 + fibM1; // m'th Fibonacci number

    // Find the smallest Fibonacci number >= n
    while (fibM < n) {
        fibM2 = fibM1;
        fibM1 = fibM;
        fibM = fibM2 + fibM1;
    }

    // Marks the eliminated range from front
    let offset = -1;

    while (fibM > 1) {
        // Check if fibM2 is valid location
        const i = Math.min(offset + fibM2, n - 1);

        // If target is greater than value at index fibM2
        // cut the subarray array from offset to i
        if (arr[i] < target) {
            fibM = fibM1;
            fibM1 = fibM2;
            fibM2 = fibM - fibM1;
            offset = i;
        }
        // If target is less than value at index fibM2
        // cut the subarray after i+1
        else if (arr[i] > target) {
            fibM = fibM2;
            fibM1 = fibM1 - fibM2;
            fibM2 = fibM - fibM1;
        }
        // Element found
        else {
            return i;
        }
    }

    // Compare the last element with target
    if (fibM1 === 1 && arr[offset + 1] === target) {
        return offset + 1;
    }

    // Element not found
    return -1;
}

// Example usage
const sortedArray = [10, 22, 35, 40, 45, 50, 80, 82, 85, 90, 100];
const target = 85;

const result = fibonacciSearch(sortedArray, target);

if (result !== -1) {
    console.log(`Element found at index ${result}`);
} else {
    console.log("Element not found in the array");
}

// Output: Element found at index 8
function fibonacciSearchGeneric<T>(
    arr: T[], 
    target: T, 
    compareFn: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): number {
    const n = arr.length;
    
    let fibM2 = 0;
    let fibM1 = 1;
    let fibM = fibM2 + fibM1;

    while (fibM < n) {
        fibM2 = fibM1;
        fibM1 = fibM;
        fibM = fibM2 + fibM1;
    }

    let offset = -1;

    while (fibM > 1) {
        const i = Math.min(offset + fibM2, n - 1);
        const comparison = compareFn(arr[i], target);

        if (comparison < 0) {
            fibM = fibM1;
            fibM1 = fibM2;
            fibM2 = fibM - fibM1;
            offset = i;
        } else if (comparison > 0) {
            fibM = fibM2;
            fibM1 = fibM1 - fibM2;
            fibM2 = fibM - fibM1;
        } else {
            return i;
        }
    }

    if (fibM1 === 1 && offset + 1 < n && compareFn(arr[offset + 1], target) === 0) {
        return offset + 1;
    }

    return -1;
}

// Example with custom objects
interface Person {
    id: number;
    name: string;
}

const people: Person[] = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
    { id: 4, name: "Diana" }
];

const result2 = fibonacciSearchGeneric(
    people, 
    { id: 3, name: "Charlie" },
    (a, b) => a.id - b.id
);

console.log(`Found at index ${result2}`); // Output: Found at index 2
