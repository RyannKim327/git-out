/**
 * Performs a binary search on a sorted numeric array.
 * @param arr The sorted array of numbers to search in.
 * @param target The number to search for.
 * @returns The index of the target if found, otherwise -1.
 */
function binarySearchIterative(arr: number[], target: number): number {
    let low = 0;
    let high = arr.length - 1;

    while (low <= high) {
        // Calculate the middle index
        // Using low + (high - low) / 2 prevents potential overflow
        // that (low + high) / 2 might cause if low and high are very large numbers,
        // though less likely in JavaScript due to 64-bit floats.
        const mid = Math.floor(low + (high - low) / 2);

        if (arr[mid] === target) {
            return mid; // Target found at mid index
        } else if (arr[mid] < target) {
            // Target is in the right half, so discard the left half
            low = mid + 1;
        } else {
            // arr[mid] > target
            // Target is in the left half, so discard the right half
            high = mid - 1;
        }
    }

    return -1; // Target not found in the array
}

// --- Usage Examples (Numeric) ---
const sortedNumbers = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];

console.log("--- Iterative Numeric Search ---");
console.log(`Index of 23: ${binarySearchIterative(sortedNumbers, 23)}`); // Expected: 5
console.log(`Index of 5: ${binarySearchIterative(sortedNumbers, 5)}`);   // Expected: 1
console.log(`Index of 91: ${binarySearchIterative(sortedNumbers, 91)}`); // Expected: 9
console.log(`Index of 1: ${binarySearchIterative(sortedNumbers, 1)}`);   // Expected: -1 (not found)
console.log(`Index of 100: ${binarySearchIterative(sortedNumbers, 100)}`); // Expected: -1 (not found)
console.log(`Index of 8 (first element): ${binarySearchIterative([8, 10, 12], 8)}`); // Expected: 0
console.log(`Index of 12 (last element): ${binarySearchIterative([8, 10, 12], 12)}`); // Expected: 2
console.log(`Index in empty array: ${binarySearchIterative([], 5)}`); // Expected: -1
/**
 * Performs a generic binary search on a sorted array using a custom comparator.
 * @param arr The sorted array of type T to search in.
 * @param target The item of type T to search for.
 * @param comparator A function that compares two elements (a, b).
 *                   It should return:
 *                   - A negative number if a < b
 *                   - Zero if a === b
 *                   - A positive number if a > b
 * @returns The index of the target if found, otherwise -1.
 */
function binarySearchGeneric<T>(
    arr: T[],
    target: T,
    comparator: (a: T, b: T) => number
): number {
    let low = 0;
    let high = arr.length - 1;

    while (low <= high) {
        const mid = Math.floor(low + (high - low) / 2);
        const comparisonResult = comparator(arr[mid], target);

        if (comparisonResult === 0) {
            return mid; // Target found
        } else if (comparisonResult < 0) {
            // arr[mid] < target, search in the right half
            low = mid + 1;
        } else {
            // arr[mid] > target, search in the left half
            high = mid - 1;
        }
    }

    return -1; // Target not found
}

// --- Default Comparators (Helpers) ---
const numberComparator = (a: number, b: number) => a - b;
const stringComparator = (a: string, b: string) => a.localeCompare(b);

// --- Usage Examples (Generic) ---

// 1. Numbers (using the generic function with a number comparator)
const genericNumbers = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
console.log("\n--- Generic Numeric Search ---");
console.log(`Index of 23: ${binarySearchGeneric(genericNumbers, 23, numberComparator)}`); // Expected: 5

// 2. Strings
const sortedStrings = ["apple", "banana", "grape", "orange", "pear"];
console.log("\n--- Generic String Search ---");
console.log(`Index of 'grape': ${binarySearchGeneric(sortedStrings, "grape", stringComparator)}`); // Expected: 2
console.log(`Index of 'kiwi': ${binarySearchGeneric(sortedStrings, "kiwi", stringComparator)}`);   // Expected: -1

// 3. Custom Objects (e.g., searching by an 'id' property)
interface User {
    id: number;
    name: string;
}

const users: User[] = [
    { id: 101, name: "Alice" },
    { id: 105, name: "Bob" },
    { id: 110, name: "Charlie" },
    { id: 115, name: "David" },
];

// Comparator for User objects by their 'id'
const userIdComparator = (a: User, b: User): number => a.id - b.id;

console.log("\n--- Generic Object Search (by ID) ---");
const targetUser = { id: 110, name: "Charlie" }; // The name doesn't matter for the search logic
const foundIndex = binarySearchGeneric(users, targetUser, userIdComparator);
console.log(`Index of user with ID 110: ${foundIndex}`); // Expected: 2
if (foundIndex !== -1) {
    console.log(`Found user:`, users[foundIndex]); // Expected: { id: 110, name: 'Charlie' }
}
console.log(`Index of user with ID 103: ${binarySearchGeneric(users, { id: 103, name: "Eve" }, userIdComparator)}`); // Expected: -1
/**
 * Performs a recursive binary search on a sorted numeric array.
 * @param arr The sorted array of numbers to search in.
 * @param target The number to search for.
 * @param low The starting index of the current search interval (default: 0).
 * @param high The ending index of the current search interval (default: arr.length - 1).
 * @returns The index of the target if found, otherwise -1.
 */
function binarySearchRecursive(
    arr: number[],
    target: number,
    low: number = 0,
    high: number = arr.length - 1
): number {
    // Base case 1: Target not found
    if (low > high) {
        return -1;
    }

    const mid = Math.floor(low + (high - low) / 2);

    // Base case 2: Target found
    if (arr[mid] === target) {
        return mid;
    }

    // Recursive step
    if (arr[mid] < target) {
        // Search in the right half
        return binarySearchRecursive(arr, target, mid + 1, high);
    } else {
        // arr[mid] > target, search in the left half
        return binarySearchRecursive(arr, target, low, mid - 1);
    }
}

// --- Usage Examples (Recursive) ---
const sortedNumbersRecursive = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];

console.log("\n--- Recursive Numeric Search ---");
console.log(`Index of 23: ${binarySearchRecursive(sortedNumbersRecursive, 23)}`); // Expected: 5
console.log(`Index of 5: ${binarySearchRecursive(sortedNumbersRecursive, 5)}`);   // Expected: 1
console.log(`Index of 91: ${binarySearchRecursive(sortedNumbersRecursive, 91)}`); // Expected: 9
console.log(`Index of 1: ${binarySearchRecursive(sortedNumbersRecursive, 1)}`);   // Expected: -1
console.log(`Index in empty array: ${binarySearchRecursive([], 5)}`); // Expected: -1
