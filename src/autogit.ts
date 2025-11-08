function binarySearch<T>(arr: T[], target: T): number {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midValue = arr[mid];

        if (midValue === target) {
            return mid; // Found the target
        } else if (midValue < target) {
            left = mid + 1; // Search right half
        } else {
            right = mid - 1; // Search left half
        }
    }

    return -1; // Target not found
}
function binarySearchRecursive<T>(arr: T[], target: T): number {
    return recursiveBinarySearch(arr, target, 0, arr.length - 1);
}

function recursiveBinarySearch<T>(
    arr: T[], 
    target: T, 
    left: number, 
    right: number
): number {
    if (left > right) return -1;

    const mid = Math.floor((left + right) / 2);
    const midValue = arr[mid];

    if (midValue === target) {
        return mid;
    } else if (midValue < target) {
        return recursiveBinarySearch(arr, target, mid + 1, right);
    } else {
        return recursiveBinarySearch(arr, target, left, mid - 1);
    }
}
function binarySearchWithComparator<T>(
    arr: T[],
    target: T,
    comparator?: (a: T, b: T) => number
): number {
    const compare = comparator || ((a: T, b: T) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });

    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const comparison = compare(arr[mid], target);

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
// Basic usage with numbers
const numbers = [1, 3, 5, 7, 9, 11, 13, 15];
console.log(binarySearch(numbers, 7)); // Output: 3
console.log(binarySearch(numbers, 10)); // Output: -1

// Usage with strings (alphabetically sorted)
const words = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
console.log(binarySearch(words, 'cherry')); // Output: 2

// Custom objects with comparator
interface Person {
    id: number;
    name: string;
}

const people: Person[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
];

// Search by id
console.log(binarySearchWithComparator(
    people,
    { id: 2, name: '' } as Person,
    (a, b) => a.id - b.id
)); // Output: 1
// Find first occurrence of target
function binarySearchFirst<T>(arr: T[], target: T): number {
    let left = 0;
    let right = arr.length - 1;
    let result = -1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            result = mid;
            right = mid - 1; // Continue searching left
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return result;
}

// Find last occurrence of target
function binarySearchLast<T>(arr: T[], target: T): number {
    let left = 0;
    let right = arr.length - 1;
    let result = -1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            result = mid;
            left = mid + 1; // Continue searching right
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return result;
}
