function binarySearch<T>(array: T[], target: T): number {
    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const current = array[mid];

        if (current === target) {
            return mid; // Found the target
        } else if (current < target) {
            left = mid + 1; // Search right half
        } else {
            right = mid - 1; // Search left half
        }
    }

    return -1; // Target not found
}
function binarySearch<T>(
    array: T[],
    target: T,
    comparator?: (a: T, b: T) => number
): number {
    let left = 0;
    let right = array.length - 1;
    
    // Default comparator for primitive types
    const compare = comparator || ((a: T, b: T) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const comparison = compare(array[mid], target);

        if (comparison === 0) {
            return mid; // Found the target
        } else if (comparison < 0) {
            left = mid + 1; // Search right half
        } else {
            right = mid - 1; // Search left half
        }
    }

    return -1; // Target not found
}
// Example with numbers
const numbers = [1, 3, 5, 7, 9, 11, 13];
console.log(binarySearch(numbers, 7)); // Output: 3
console.log(binarySearch(numbers, 12)); // Output: -1

// Example with strings
const strings = ["apple", "banana", "cherry", "date"];
console.log(binarySearch(strings, "cherry")); // Output: 2

// Example with custom objects
interface Person {
    id: number;
    name: string;
}

const people: Person[] = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" }
];

// Custom comparator for objects
const personComparator = (a: Person, b: Person) => a.id - b.id;
console.log(binarySearch(people, { id: 2, name: "" }, personComparator)); // Output: 1
function binarySearchRecursive<T>(
    array: T[],
    target: T,
    left: number = 0,
    right: number = array.length - 1,
    comparator?: (a: T, b: T) => number
): number {
    if (left > right) return -1;

    const mid = Math.floor((left + right) / 2);
    const compare = comparator || ((a: T, b: T) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });

    const comparison = compare(array[mid], target);

    if (comparison === 0) {
        return mid;
    } else if (comparison < 0) {
        return binarySearchRecursive(array, target, mid + 1, right, comparator);
    } else {
        return binarySearchRecursive(array, target, left, mid - 1, comparator);
    }
}
function findInsertionPosition<T>(
    array: T[],
    target: T,
    comparator?: (a: T, b: T) => number
): number {
    let left = 0;
    let right = array.length;
    
    const compare = comparator || ((a: T, b: T) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });

    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        const comparison = compare(array[mid], target);

        if (comparison < 0) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }

    return left;
}
