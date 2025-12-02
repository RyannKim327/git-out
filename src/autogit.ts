function bubbleSortNumbers(arr: number[]): number[] {
    const n = arr.length;
    let swapped: boolean; // Flag to check if any swaps occurred in a pass

    // Outer loop for passes through the array
    // We need n-1 passes at most, because after n-1 passes, the first n-1 elements are sorted,
    // which implies the last element is also in its correct place.
    for (let i = 0; i < n - 1; i++) {
        swapped = false; // Reset the flag for each pass

        // Inner loop for comparing adjacent elements
        // In each pass, the largest unsorted element "bubbles up" to its correct position
        // at the end of the unsorted portion. So, in the next pass, we don't need to check
        // the last 'i' elements, as they are already sorted.
        for (let j = 0; j < n - 1 - i; j++) {
            // Compare adjacent elements
            if (arr[j] > arr[j + 1]) {
                // Swap them if they are in the wrong order
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true; // Mark that a swap occurred
            }
        }

        // If no two elements were swapped by inner loop, then the array is sorted
        // and we can break early. This is an optimization.
        if (!swapped) {
            break;
        }
    }

    return arr; // Return the sorted array (modified in-place)
}

// --- Example Usage (Numbers) ---
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log("Original numbers:", numbers);
const sortedNumbers = bubbleSortNumbers([...numbers]); // Use spread to avoid modifying original array if desired
console.log("Sorted numbers:", sortedNumbers); // Output: [11, 12, 22, 25, 34, 64, 90]

const alreadySorted = [1, 2, 3, 4, 5];
console.log("Original (already sorted):", alreadySorted);
const sortedAlreadySorted = bubbleSortNumbers([...alreadySorted]);
console.log("Sorted (already sorted):", sortedAlreadySorted); // Output: [1, 2, 3, 4, 5]

const emptyArray: number[] = [];
console.log("Original (empty):", emptyArray);
const sortedEmpty = bubbleSortNumbers([...emptyArray]);
console.log("Sorted (empty):", sortedEmpty); // Output: []

const singleElement = [7];
console.log("Original (single element):", singleElement);
const sortedSingle = bubbleSortNumbers([...singleElement]);
console.log("Sorted (single element):", sortedSingle); // Output: [7]
/**
 * Default comparator function for primitive types (numbers, strings).
 * Returns:
 *   -1 if a should come before b
 *    1 if a should come after b
 *    0 if a and b are considered equal
 */
const defaultComparator = <T>(a: T, b: T): number => {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
};

/**
 * Implements the Bubble Sort algorithm.
 *
 * @param arr The array to be sorted. It will be sorted in-place.
 * @param comparator An optional function to compare two elements.
 *                   It should return a negative number if a < b,
 *                   a positive number if a > b, and 0 if a == b.
 *                   If not provided, a default comparator for primitive types is used.
 * @returns The sorted array (the same array instance passed in).
 */
function bubbleSort<T>(
    arr: T[],
    comparator: (a: T, b: T) => number = defaultComparator
): T[] {
    const n = arr.length;
    let swapped: boolean;

    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        for (let j = 0; j < n - 1 - i; j++) {
            // Use the comparator function for comparison
            // If comparator(arr[j], arr[j+1]) > 0, it means arr[j] should come AFTER arr[j+1],
            // so they are in the wrong order and need to be swapped.
            if (comparator(arr[j], arr[j + 1]) > 0) {
                // Swap elements
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) {
            break; // No swaps in this pass, array is sorted
        }
    }

    return arr;
}

// --- Example Usage (Generic) ---

// 1. Sorting strings (alphabetical order using default comparator)
const fruits = ["banana", "apple", "cherry", "date"];
console.log("\nOriginal fruits:", fruits);
const sortedFruits = bubbleSort([...fruits]);
console.log("Sorted fruits:", sortedFruits); // Output: ["apple", "banana", "cherry", "date"]

// 2. Sorting numbers (descending order using a custom comparator)
const scores = [85, 92, 78, 95, 88];
console.log("\nOriginal scores:", scores);
const sortedScoresDesc = bubbleSort([...scores], (a, b) => b - a); // b - a for descending
console.log("Sorted scores (descending):", sortedScoresDesc); // Output: [95, 92, 88, 85, 78]

// 3. Sorting objects (by a specific property)
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 },
    { name: "David", age: 25 },
];

console.log("\nOriginal people:", people);

// Sort by age (ascending)
const peopleSortedByAge = bubbleSort([...people], (a, b) => a.age - b.age);
console.log("Sorted by age (asc):", peopleSortedByAge);
/*
Output:
[
  { name: 'Bob', age: 25 },
  { name: 'David', age: 25 },
  { name: 'Alice', age: 30 },
  { name: 'Charlie', age: 35 }
]
*/

// Sort by name (ascending)
const peopleSortedByName = bubbleSort([...people], (a, b) => a.name.localeCompare(b.name));
console.log("Sorted by name (asc):", peopleSortedByName);
/*
Output:
[
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 35 },
  { name: 'David', age: 25 }
]
*/
