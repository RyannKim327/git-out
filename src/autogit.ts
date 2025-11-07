function binarySearch<T>(array: T[], target: T): number {
    let low = 0;
    let high = array.length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const guess = array[mid];

        if (guess === target) {
            return mid; // Target found
        }

        if (guess < target) {
            low = mid + 1; // Search right half
        } else {
            high = mid - 1; // Search left half
        }
    }

    return -1; // Target not found
}

// Example usage:
const numbers = [1, 3, 5, 7, 9];
console.log(binarySearch(numbers, 3)); // Output: 1
console.log(binarySearch(numbers, 10)); // Output: -1

const strings = ['apple', 'banana', 'orange'];
console.log(binarySearch(strings, 'orange')); // Output: 2
function binarySearchWithComparator<T>(
    array: T[],
    target: T,
    comparator: (a: T, b: T) => number
): number {
    let low = 0;
    let high = array.length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const comparison = comparator(array[mid], target);

        if (comparison === 0) return mid;
        if (comparison < 0) low = mid + 1;
        else high = mid - 1;
    }

    return -1;
}

// Example with custom comparator for objects:
const users = [
    { id: 1, name: 'Alice' },
    { id: 3, name: 'Bob' },
    { id: 5, name: 'Charlie' }
];

const comparator = (a: { id: number }, b: { id: number }) => a.id - b.id;
console.log(binarySearchWithComparator(users, { id: 3 }, comparator)); // Output: 1
