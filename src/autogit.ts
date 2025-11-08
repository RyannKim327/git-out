/**
 * Swaps two elements in an array.
 * @param arr The array.
 * @param i Index of the first element.
 * @param j Index of the second element.
 */
function swap<T>(arr: T[], i: number, j: number): void {
    [arr[i], arr[j]] = [arr[j], arr[i]];
}

/**
 * Implements the Shell Sort algorithm using Knuth's gap sequence.
 *
 * Shell Sort is an in-place comparison sort that is an optimization of insertion sort.
 * It sorts elements that are far apart and then progressively reduces the gap
 * between elements to be sorted.
 *
 * @param arr The array to be sorted.
 * @param comparator An optional function that defines the sort order.
 *                   It should return a negative value if a comes before b,
 *                   a positive value if b comes before a, and 0 if they are equal.
 *                   Defaults to a standard numeric/string comparison if not provided.
 * @returns The sorted array.
 */
function shellSort<T>(
    arr: T[],
    comparator?: (a: T, b: T) => number
): T[] {
    const n = arr.length;

    // Default comparator for numbers and strings
    if (!comparator) {
        comparator = (a, b) => {
            if (typeof a === 'number' && typeof b === 'number') {
                return a - b;
            }
            if (typeof a === 'string' && typeof b === 'string') {
                return a.localeCompare(b);
            }
            // Fallback for other types or mixed types (might not be meaningful)
            if (String(a) < String(b)) return -1;
            if (String(a) > String(b)) return 1;
            return 0;
        };
    }

    // Determine initial gap (Knuth's sequence: 1, 4, 13, 40, ...)
    let h = 1;
    while (h < n / 3) {
        h = h * 3 + 1;
    }

    // Loop with decreasing gaps
    while (h >= 1) {
        // h-sort the array using an insertion sort-like approach
        for (let i = h; i < n; i++) {
            // Store arr[i] temporarily, as elements might be shifted
            let temp = arr[i];
            let j = i;

            // Shift elements of the h-sorted sublist to the right
            // until the correct position for temp is found
            while (j >= h && comparator(arr[j - h], temp) > 0) {
                arr[j] = arr[j - h];
                j -= h;
            }
            // Place temp (the original arr[i]) in its correct position
            arr[j] = temp;
        }
        // Reduce the gap for the next pass
        h = Math.floor(h / 3);
    }

    return arr;
}

// --- Usage Examples ---

// 1. Sorting an array of numbers
const numbers = [99, 44, 6, 2, 1, 5, 63, 87, 283, 4, 0];
console.log("Original Numbers:", [...numbers]);
shellSort(numbers);
console.log("Sorted Numbers:", numbers); // Expected: [0, 1, 2, 4, 5, 6, 44, 63, 87, 99, 283]

// 2. Sorting an array of strings
const strings = ["banana", "apple", "grape", "orange", "kiwi"];
console.log("\nOriginal Strings:", [...strings]);
shellSort(strings);
console.log("Sorted Strings:", strings); // Expected: ["apple", "banana", "grape", "kiwi", "orange"]

// 3. Sorting an array of custom objects using a custom comparator
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 30 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 35 },
    { name: "David", age: 25 },
    { name: "Eve", age: 28 },
];

console.log("\nOriginal People (by age):", JSON.stringify(people, null, 2));

// Sort by age, then by name for ties
shellSort(people, (a, b) => {
    if (a.age !== b.age) {
        return a.age - b.age; // Sort by age ascending
    }
    return a.name.localeCompare(b.name); // Then by name ascending for ties
});

console.log("Sorted People (by age, then name):", JSON.stringify(people, null, 2));
/* Expected:
[
  { "name": "Bob", "age": 25 },
  { "name": "David", "age": 25 },
  { "name": "Eve", "age": 28 },
  { "name": "Alice", "age": 30 },
  { "name": "Charlie", "age": 35 }
]
*/

// 4. Empty array
const emptyArray: number[] = [];
console.log("\nOriginal Empty Array:", [...emptyArray]);
shellSort(emptyArray);
console.log("Sorted Empty Array:", emptyArray); // Expected: []

// 5. Single element array
const singleElementArray = [42];
console.log("\nOriginal Single Element Array:", [...singleElementArray]);
shellSort(singleElementArray);
console.log("Sorted Single Element Array:", singleElementArray); // Expected: [42]
