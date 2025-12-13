function binarySearch<T>(array: T[], target: T): number {
    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (array[mid] === target) {
            return mid; // Found the target
        } else if (array[mid] < target) {
            left = mid + 1; // Search in right half
        } else {
            right = mid - 1; // Search in left half
        }
    }
    
    return -1; // Target not found
}
function binarySearchRecursive<T>(
    array: T[], 
    target: T, 
    left: number = 0, 
    right: number = array.length - 1
): number {
    if (left > right) {
        return -1; // Base case: not found
    }
    
    const mid = Math.floor((left + right) / 2);
    
    if (array[mid] === target) {
        return mid;
    } else if (array[mid] < target) {
        return binarySearchRecursive(array, target, mid + 1, right);
    } else {
        return binarySearchRecursive(array, target, left, mid - 1);
    }
}
function binarySearchWithComparator<T>(
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
// Example with numbers
const numbers = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
console.log(binarySearch(numbers, 7)); // Output: 3
console.log(binarySearch(numbers, 12)); // Output: -1

// Example with strings
const strings = ["apple", "banana", "cherry", "date", "elderberry"];
console.log(binarySearch(strings, "cherry")); // Output: 2

// Example with custom objects
interface Person {
    id: number;
    name: string;
}

const people: Person[] = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
    { id: 4, name: "Diana" },
];

// Search by ID using comparator
const result = binarySearchWithComparator(
    people, 
    { id: 3 } as Person, 
    (a, b) => a.id - b.id
);
console.log(result); // Output: 2
// Find first occurrence of target (for arrays with duplicates)
function binarySearchFirst<T>(array: T[], target: T): number {
    let left = 0;
    let right = array.length - 1;
    let result = -1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (array[mid] === target) {
            result = mid;
            right = mid - 1; // Continue searching left for first occurrence
        } else if (array[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}

// Find last occurrence of target
function binarySearchLast<T>(array: T[], target: T): number {
    let left = 0;
    let right = array.length - 1;
    let result = -1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (array[mid] === target) {
            result = mid;
            left = mid + 1; // Continue searching right for last occurrence
        } else if (array[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}
