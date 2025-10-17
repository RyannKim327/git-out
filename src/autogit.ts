function binarySearch(arr: number[], target: number): number {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid; // Target found
        } else if (arr[mid] < target) {
            left = mid + 1; // Search right half
        } else {
            right = mid - 1; // Search left half
        }
    }
    
    return -1; // Target not found
}
function binarySearchGeneric<T>(
    arr: T[], 
    target: T, 
    compareFn: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): number {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const comparison = compareFn(arr[mid], target);
        
        if (comparison === 0) {
            return mid; // Target found
        } else if (comparison < 0) {
            left = mid + 1; // Search right half
        } else {
            right = mid - 1; // Search left half
        }
    }
    
    return -1; // Target not found
}
function binarySearchRecursive(
    arr: number[], 
    target: number, 
    left: number = 0, 
    right: number = arr.length - 1
): number {
    if (left > right) {
        return -1; // Base case: target not found
    }
    
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
        return mid;
    } else if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, right);
    } else {
        return binarySearchRecursive(arr, target, left, mid - 1);
    }
}
function findInsertionPosition(arr: number[], target: number): number {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid; // Exact match
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return left; // Position where target should be inserted
}
// Example usage
const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];

// Basic binary search
console.log(binarySearch(sortedArray, 7));  // Output: 3
console.log(binarySearch(sortedArray, 10)); // Output: -1

// Generic binary search with numbers
console.log(binarySearchGeneric(sortedArray, 7)); // Output: 3

// Generic binary search with strings
const stringArray = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
console.log(binarySearchGeneric(stringArray, 'cherry')); // Output: 2

// Custom comparison for objects
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

console.log(
    binarySearchGeneric(people, { id: 3, name: 'Charlie' }, (a, b) => a.id - b.id)
); // Output: 2

// Finding insertion position
console.log(findInsertionPosition(sortedArray, 8)); // Output: 4 (between 7 and 9)
console.log(findInsertionPosition(sortedArray, 20)); // Output: 10 (at the end)
// Edge cases
console.log(binarySearch([], 5)); // Empty array
console.log(binarySearch([5], 5)); // Single element array
console.log(binarySearch([5], 3)); // Single element, not found
console.log(binarySearch([1, 3, 5], 1)); // First element
console.log(binarySearch([1, 3, 5], 5)); // Last element
