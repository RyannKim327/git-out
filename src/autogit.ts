function binarySearchRecursive<T>(
    arr: T[],
    target: T,
    low: number = 0,
    high: number = arr.length - 1
): number {
    // Base case: element not found
    if (low > high) {
        return -1;
    }

    // Calculate middle index
    const mid = Math.floor((low + high) / 2);

    // Base case: element found
    if (arr[mid] === target) {
        return mid;
    }

    // Recursive cases
    if (arr[mid] < target) {
        // Search right half
        return binarySearchRecursive(arr, target, mid + 1, high);
    } else {
        // Search left half
        return binarySearchRecursive(arr, target, low, mid - 1);
    }
}
function binarySearchRecursive<T>(
    arr: T[],
    target: T,
    comparator: (a: T, b: T) => number = (a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    },
    low: number = 0,
    high: number = arr.length - 1
): number {
    if (low > high) {
        return -1;
    }

    const mid = Math.floor((low + high) / 2);
    const comparison = comparator(arr[mid], target);

    if (comparison === 0) {
        return mid;
    } else if (comparison < 0) {
        return binarySearchRecursive(arr, target, comparator, mid + 1, high);
    } else {
        return binarySearchRecursive(arr, target, comparator, low, mid - 1);
    }
}
// Example usage with numbers
const numbers = [1, 3, 5, 7, 9, 11, 13, 15];
console.log(binarySearchRecursive(numbers, 7)); // Output: 3
console.log(binarySearchRecursive(numbers, 10)); // Output: -1

// Example usage with strings
const strings = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
console.log(binarySearchRecursive(strings, 'cherry')); // Output: 2

// Example with custom comparator for objects
interface Person {
    id: number;
    name: string;
}

const people: Person[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
    { id: 4, name: 'Diana' },
];

// Search by id
const result = binarySearchRecursive(
    people,
    { id: 3 } as Person, // Target object
    (a, b) => a.id - b.id // Comparator function
);
console.log(result); // Output: 2

// Search by name
const resultByName = binarySearchRecursive(
    people.sort((a, b) => a.name.localeCompare(b.name)), // Sort first!
    { name: 'Bob' } as Person,
    (a, b) => a.name.localeCompare(b.name)
);
console.log(resultByName); // Output: 1
function binarySearchRecursive<T>(
    arr: T[],
    target: T,
    low: number = 0,
    high: number = arr.length - 1
): number {
    // Early return for empty array
    if (arr.length === 0) {
        return -1;
    }

    const mid = Math.floor((low + high) / 2);

    if (arr[mid] === target) {
        return mid;
    }

    if (low >= high) {
        return -1;
    }

    if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, high);
    } else {
        return binarySearchRecursive(arr, target, low, mid - 1);
    }
}
