/**
 * Performs a binary search on a sorted array of numbers.
 * @param arr The sorted array to search within.
 * @param target The number to search for.
 * @returns The index of the target if found, otherwise -1.
 */
function binarySearch(arr: number[], target: number): number {
    let low = 0;
    let high = arr.length - 1;

    while (low <= high) {
        // Calculate the middle index.
        // Using low + (high - low) / 2 prevents potential overflow
        // that (low + high) / 2 might cause with very large low/high values
        // in some languages/contexts, though less common in JavaScript.
        const mid = Math.floor(low + (high - low) / 2);

        if (arr[mid] === target) {
            return mid; // Target found at mid index
        } else if (arr[mid] < target) {
            low = mid + 1; // Target is in the right half, so discard left half and mid
        } else { // arr[mid] > target
            high = mid - 1; // Target is in the left half, so discard right half and mid
        }
    }

    return -1; // Target not found in the array
}

// --- Example Usage ---
const sortedNumbers = [-5, 0, 3, 5, 8, 10, 12, 15, 20];

console.log(`Searching for 10: ${binarySearch(sortedNumbers, 10)}`); // Expected: 5 (index)
console.log(`Searching for -5: ${binarySearch(sortedNumbers, -5)}`); // Expected: 0
console.log(`Searching for 20: ${binarySearch(sortedNumbers, 20)}`); // Expected: 8
console.log(`Searching for 7: ${binarySearch(sortedNumbers, 7)}`);   // Expected: -1 (not found)
console.log(`Searching for 50: ${binarySearch(sortedNumbers, 50)}`); // Expected: -1
console.log(`Searching for 0 on empty array []: ${binarySearch([], 0)}`); // Expected: -1

const singleElementArray = [7];
console.log(`Searching for 7 on [7]: ${binarySearch(singleElementArray, 7)}`); // Expected: 0
console.log(`Searching for 5 on [7]: ${binarySearch(singleElementArray, 5)}`); // Expected: -1
/**
 * A type for a comparator function, similar to Array.prototype.sort's callback.
 * It returns:
 *   - a negative number if a < b
 *   - 0 if a === b
 *   - a positive number if a > b
 */
type Comparator<T> = (a: T, b: T) => number;

/**
 * Performs a binary search on a sorted array using a custom comparator.
 * @param arr The sorted array to search within.
 * @param target The item to search for.
 * @param comparator A function that compares two elements.
 * @returns The index of the target if found, otherwise -1.
 */
function genericBinarySearch<T>(
    arr: readonly T[], // Use readonly for immutability best practice
    target: T,
    comparator: Comparator<T>
): number {
    let low = 0;
    let high = arr.length - 1;

    while (low <= high) {
        const mid = Math.floor(low + (high - low) / 2);
        const comparisonResult = comparator(arr[mid], target);

        if (comparisonResult === 0) {
            return mid; // Target found
        } else if (comparisonResult < 0) {
            low = mid + 1; // arr[mid] < target, so target is in the right half
        } else { // comparisonResult > 0
            high = mid - 1; // arr[mid] > target, so target is in the left half
        }
    }

    return -1; // Target not found
}

// --- Example Usage with different types ---

// 1. Numbers (using a standard number comparator)
const numberComparator: Comparator<number> = (a, b) => a - b;
const sortedNumbersGeneric = [-5, 0, 3, 5, 8, 10, 12, 15, 20];
console.log("\n--- Generic Binary Search (Numbers) ---");
console.log(`Searching for 10: ${genericBinarySearch(sortedNumbersGeneric, 10, numberComparator)}`); // Expected: 5
console.log(`Searching for 7: ${genericBinarySearch(sortedNumbersGeneric, 7, numberComparator)}`);   // Expected: -1

// 2. Strings (using a standard string comparator)
const stringComparator: Comparator<string> = (a, b) => a.localeCompare(b);
const sortedStrings = ["apple", "banana", "grape", "orange", "pear"];
console.log("\n--- Generic Binary Search (Strings) ---");
console.log(`Searching for "grape": ${genericBinarySearch(sortedStrings, "grape", stringComparator)}`); // Expected: 2
console.log(`Searching for "kiwi": ${genericBinarySearch(sortedStrings, "kiwi", stringComparator)}`);   // Expected: -1

// 3. Objects (comparing by a specific property, e.g., 'id')
interface User {
    id: number;
    name: string;
    age: number;
}

const userByIdComparator: Comparator<User> = (a, b) => a.id - b.id;
const sortedUsers: User[] = [
    { id: 1, name: "Alice", age: 30 },
    { id: 5, name: "Bob", age: 24 },
    { id: 10, name: "Charlie", age: 35 },
    { id: 12, name: "David", age: 29 },
];

console.log("\n--- Generic Binary Search (Objects by ID) ---");
// Note: When searching for objects, the target must match the structure the comparator expects.
// If you want to search by a simple ID, you'd need to adapt the target or the comparator.
// Here, we search for a "dummy" user object that only needs to have an `id` for comparison.
const targetUser: User = { id: 10, name: "", age: 0 }; // Only id matters for comparison
console.log(`Searching for user with ID 10: ${genericBinarySearch(sortedUsers, targetUser, userByIdComparator)}`); // Expected: 2
const targetUserNotFound: User = { id: 7, name: "", age: 0 };
console.log(`Searching for user with ID 7: ${genericBinarySearch(sortedUsers, targetUserNotFound, userByIdComparator)}`); // Expected: -1

// If you want to search for a specific property (like just an ID), you'd typically wrap it:
function findUserById(users: readonly User[], id: number): User | undefined {
    const tempUser: User = { id, name: "", age: 0 }; // Create a dummy object for comparison
    const index = genericBinarySearch(users, tempUser, userByIdComparator);
    return index !== -1 ? users[index] : undefined;
}
console.log(`\nFinding user object by ID 12:`, findUserById(sortedUsers, 12));
console.log(`Finding user object by ID 8 (not found):`, findUserById(sortedUsers, 8));
/**
 * Recursively performs a binary search on a sorted array using a custom comparator.
 * @param arr The sorted array to search within.
 * @param target The item to search for.
 * @param comparator A function that compares two elements.
 * @param low The starting index of the current search segment (default: 0).
 * @param high The ending index of the current search segment (default: arr.length - 1).
 * @returns The index of the target if found, otherwise -1.
 */
function recursiveBinarySearch<T>(
    arr: readonly T[],
    target: T,
    comparator: Comparator<T>,
    low: number = 0,
    high: number = arr.length - 1
): number {
    // Base Case: If low exceeds high, the target is not in the array
    if (low > high) {
        return -1;
    }

    const mid = Math.floor(low + (high - low) / 2);
    const comparisonResult = comparator(arr[mid], target);

    if (comparisonResult === 0) {
        return mid; // Target found
    } else if (comparisonResult < 0) {
        // Target is in the right half, recurse
        return recursiveBinarySearch(arr, target, comparator, mid + 1, high);
    } else { // comparisonResult > 0
        // Target is in the left half, recurse
        return recursiveBinarySearch(arr, target, comparator, low, mid - 1);
    }
}

// --- Example Usage ---
console.log("\n--- Recursive Binary Search ---");
const sortedNumbersRecursive = [2, 4, 6, 8, 10, 12, 14, 16];
console.log(`Searching for 12: ${recursiveBinarySearch(sortedNumbersRecursive, 12, numberComparator)}`); // Expected: 5
console.log(`Searching for 7: ${recursiveBinarySearch(sortedNumbersRecursive, 7, numberComparator)}`);   // Expected: -1
