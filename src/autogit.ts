function binarySearch<T>(array: T[], target: T): number {
    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midValue = array[mid];

        if (midValue === target) {
            return mid;
        } else if (midValue < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1; // Not found
}
function binarySearch<T>(
    array: T[], 
    target: T, 
    comparator?: (a: T, b: T) => number
): number {
    const compare = comparator || ((a: T, b: T) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });

    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const comparison = compare(array[mid], target);

        if (comparison === 0) {
            return mid;
        } else if (comparison < 0) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1;
}
// Example 1: Basic usage with numbers
const numbers = [1, 3, 5, 7, 9, 11, 13, 15];
console.log(binarySearch(numbers, 7)); // Output: 3
console.log(binarySearch(numbers, 10)); // Output: -1

// Example 2: With custom objects
interface User {
    id: number;
    name: string;
}

const users: User[] = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
    { id: 4, name: "Diana" }
];

// Search by ID
const userComparator = (a: User, b: User) => a.id - b.id;
console.log(binarySearch(users, { id: 3 } as User, userComparator)); // Output: 2

// Example 3: With strings
const fruits = ["apple", "banana", "cherry", "date", "elderberry"];
console.log(binarySearch(fruits, "cherry")); // Output: 2

// Example 4: Custom comparator for case-insensitive search
const caseInsensitiveCompare = (a: string, b: string) => 
    a.toLowerCase().localeCompare(b.toLowerCase());

console.log(binarySearch(fruits, "CHERRY", caseInsensitiveCompare)); // Output: 2
function binarySearchRecursive<T>(
    array: T[], 
    target: T, 
    left: number = 0, 
    right: number = array.length - 1,
    comparator?: (a: T, b: T) => number
): number {
    const compare = comparator || ((a: T, b: T) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });

    if (left > right) return -1;

    const mid = Math.floor((left + right) / 2);
    const comparison = compare(array[mid], target);

    if (comparison === 0) {
        return mid;
    } else if (comparison < 0) {
        return binarySearchRecursive(array, target, mid + 1, right, compare);
    } else {
        return binarySearchRecursive(array, target, left, mid - 1, compare);
    }
}
function safeBinarySearch<T>(
    array: T[], 
    target: T, 
    comparator?: (a: T, b: T) => number
): number {
    // Validate input
    if (!Array.isArray(array)) {
        throw new Error("First argument must be an array");
    }

    if (array.length === 0) return -1;

    // Check if array is sorted
    const compare = comparator || ((a: T, b: T) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });

    for (let i = 1; i < array.length; i++) {
        if (compare(array[i - 1], array[i]) > 0) {
            throw new Error("Array must be sorted for binary search");
        }
    }

    return binarySearch(array, target, compare);
}
