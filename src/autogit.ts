function binarySearch(array: number[], target: number): number {
    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (array[mid] === target) {
            return mid; // Found the target
        } else if (array[mid] < target) {
            left = mid + 1; // Search right half
        } else {
            right = mid - 1; // Search left half
        }
    }
    
    return -1; // Target not found
}

// Usage
const numbers = [1, 3, 5, 7, 9, 11, 13, 15];
console.log(binarySearch(numbers, 7));  // Output: 3
console.log(binarySearch(numbers, 10)); // Output: -1
function binarySearchRecursive(
    array: number[], 
    target: number, 
    left = 0, 
    right = array.length - 1
): number {
    if (left > right) {
        return -1; // Base case: target not found
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

// Usage
console.log(binarySearchRecursive(numbers, 9));  // Output: 4
function genericBinarySearch<T>(
    array: T[], 
    target: T, 
    compareFn: (a: T, b: T) => number = (a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }
): number {
    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const comparison = compareFn(array[mid], target);
        
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

// Usage with numbers
console.log(genericBinarySearch(numbers, 11));

// Usage with strings
const strings = ['apple', 'banana', 'cherry', 'date'];
console.log(genericBinarySearch(strings, 'cherry'));

// Usage with custom objects
interface User {
    id: number;
    name: string;
}

const users: User[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
];

console.log(genericBinarySearch(
    users, 
    { id: 2, name: 'Bob' },
    (a, b) => a.id - b.id
)); // Output: 1
function findInsertPosition(array: number[], target: number): number {
    let left = 0;
    let right = array.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (array[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return left; // Position where target should be inserted
}

// Usage
console.log(findInsertPosition([1, 3, 5, 7], 4)); // Output: 2
// Handle empty array
binarySearch([], 5); // Returns -1

// Handle array with one element
binarySearch([5], 5); // Returns 0

// Handle duplicates (returns first occurrence)
// For precise duplicate handling, you might need a modified version
