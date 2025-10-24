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

// Usage
const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15, 17];
console.log(binarySearch(sortedArray, 9)); // Output: 4
console.log(binarySearch(sortedArray, 10)); // Output: -1
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
        return mid; // Target found
    } else if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, right);
    } else {
        return binarySearchRecursive(arr, target, left, mid - 1);
    }
}

// Usage
console.log(binarySearchRecursive(sortedArray, 7)); // Output: 3
function binarySearchGeneric<T>(
    arr: T[],
    target: T,
    compareFn: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
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

// Usage with numbers
console.log(binarySearchGeneric(sortedArray, 11));

// Usage with strings
const stringArray = ["apple", "banana", "cherry", "date", "elderberry"];
console.log(binarySearchGeneric(stringArray, "cherry")); // Output: 2

// Usage with custom objects
interface Person {
    id: number;
    name: string;
}

const people: Person[] = [
    { id: 1, name: "Alice" },
    { id: 3, name: "Bob" },
    { id: 5, name: "Charlie" },
    { id: 7, name: "Diana" }
];

console.log(binarySearchGeneric(people, { id: 5, name: "Charlie" }, 
    (a, b) => a.id - b.id)); // Output: 2
function findInsertPosition(arr: number[], target: number): number {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid; // Exact match found
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return left; // Insertion position
}

// Usage
console.log(findInsertPosition([1, 3, 5, 7, 9], 6)); // Output: 3
console.log(findInsertPosition([1, 3, 5, 7, 9], 3)); // Output: 1
function findFirstOccurrence(arr: number[], target: number): number {
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

function findLastOccurrence(arr: number[], target: number): number {
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

// Usage
const arrWithDuplicates = [1, 2, 2, 2, 3, 4, 4, 5];
console.log(findFirstOccurrence(arrWithDuplicates, 2)); // Output: 1
console.log(findLastOccurrence(arrWithDuplicates, 2)); // Output: 3
// Empty array
binarySearch([], 5); // Returns -1

// Single element
binarySearch([5], 5); // Returns 0
binarySearch([5], 3); // Returns -1

// Non-existent element
binarySearch([1, 2, 3, 4], 5); // Returns -1
