function bubbleSort(arr: number[]): number[] {
    const n = arr.length;

    // Outer loop for passes (n-1 passes are sufficient)
    for (let i = 0; i < n - 1; i++) {
        // Inner loop for comparisons and swaps
        // In each pass, the largest unsorted element "bubbles" to its correct position
        // so we can reduce the inner loop's upper bound by 'i'
        for (let j = 0; j < n - 1 - i; j++) {
            // Compare adjacent elements
            if (arr[j] > arr[j + 1]) {
                // Swap them if they are in the wrong order
                // Using destructuring assignment for a concise swap
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

// --- Usage Example ---
const numbers1 = [64, 34, 25, 12, 22, 11, 90];
console.log("Original array (Basic):", numbers1);
bubbleSort(numbers1);
console.log("Sorted array (Basic):", numbers1); // Output: [11, 12, 22, 25, 34, 64, 90]

const numbers2 = [5, 1, 4, 2, 8];
console.log("Original array (Basic):", numbers2);
bubbleSort(numbers2);
console.log("Sorted array (Basic):", numbers2); // Output: [1, 2, 4, 5, 8]
function bubbleSortOptimized(arr: number[]): number[] {
    const n = arr.length;
    let swapped: boolean; // Flag to track if any swaps occurred in a pass

    for (let i = 0; i < n - 1; i++) {
        swapped = false; // Reset flag for each pass
        for (let j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Swap
                swapped = true; // Mark that a swap occurred
            }
        }
        // If no two elements were swapped by inner loop, then break
        if (!swapped) {
            break;
        }
    }
    return arr;
}

// --- Usage Example ---
const numbers3 = [64, 34, 25, 12, 22, 11, 90];
console.log("Original array (Optimized):", numbers3);
bubbleSortOptimized(numbers3);
console.log("Sorted array (Optimized):", numbers3); // Output: [11, 12, 22, 25, 34, 64, 90]

const alreadySorted = [1, 2, 3, 4, 5];
console.log("Original array (Already Sorted):", alreadySorted);
bubbleSortOptimized(alreadySorted); // This will run only one pass due to optimization
console.log("Sorted array (Already Sorted):", alreadySorted); // Output: [1, 2, 3, 4, 5]
function bubbleSortImmutable(inputArray: readonly number[]): number[] {
    // Create a mutable copy of the input array
    const arr = [...inputArray];
    const n = arr.length;
    let swapped: boolean;

    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        for (let j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        if (!swapped) {
            break;
        }
    }
    return arr;
}

// --- Usage Example ---
const originalNumbers = [64, 34, 25, 12, 22, 11, 90];
console.log("Original array (Immutable before sort):", originalNumbers);
const sortedNumbers = bubbleSortImmutable(originalNumbers);
console.log("Original array (Immutable after sort):", originalNumbers); // Output: [64, 34, 25, 12, 22, 11, 90] (unchanged)
console.log("Sorted array (Immutable):", sortedNumbers); // Output: [11, 12, 22, 25, 34, 64, 90]
function bubbleSortGeneric<T>(
    inputArray: readonly T[],
    compareFn: (a: T, b: T) => number // Custom comparison function
): T[] {
    const arr = [...inputArray]; // Work on a copy
    const n = arr.length;
    let swapped: boolean;

    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        for (let j = 0; j < n - 1 - i; j++) {
            // Use the custom comparison function
            if (compareFn(arr[j], arr[j + 1]) > 0) { // If arr[j] should come after arr[j+1]
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }
        if (!swapped) {
            break;
        }
    }
    return arr;
}

// --- Usage Examples for Generic Bubble Sort ---

// 1. Numbers Ascending (default behavior)
const genericNumbers = [64, 34, 25, 12, 22, 11, 90];
const compareNumbersAsc = (a: number, b: number) => a - b;
console.log("Generic Numbers Ascending:", bubbleSortGeneric(genericNumbers, compareNumbersAsc));
// Output: [11, 12, 22, 25, 34, 64, 90]

// 2. Numbers Descending
const genericNumbersDesc = [64, 34, 25, 12, 22, 11, 90];
const compareNumbersDesc = (a: number, b: number) => b - a; // Reverse order
console.log("Generic Numbers Descending:", bubbleSortGeneric(genericNumbersDesc, compareNumbersDesc));
// Output: [90, 64, 34, 25, 22, 12, 11]

// 3. Strings Ascending
const genericStrings = ["banana", "apple", "cherry", "date"];
const compareStringsAsc = (a: string, b: string) => a.localeCompare(b);
console.log("Generic Strings Ascending:", bubbleSortGeneric(genericStrings, compareStringsAsc));
// Output: ["apple", "banana", "cherry", "date"]

// 4. Objects by a property
interface Person {
    name: string;
    age: number;
}

const people: readonly Person[] = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 },
    { name: "David", age: 25 },
];

const comparePeopleByAge = (p1: Person, p2: Person) => p1.age - p2.age;
console.log("Generic People by Age:", bubbleSortGeneric(people, comparePeopleByAge));
/* Output:
[
  { name: 'Bob', age: 25 },
  { name: 'David', age: 25 }, // Order of Bob/David depends on original order due to stable comparison
  { name: 'Alice', age: 30 },
  { name: 'Charlie', age: 35 }
]
*/

const comparePeopleByName = (p1: Person, p2: Person) => p1.name.localeCompare(p2.name);
console.log("Generic People by Name:", bubbleSortGeneric(people, comparePeopleByName));
/* Output:
[
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 35 },
  { name: 'David', age: 25 }
]
*/
