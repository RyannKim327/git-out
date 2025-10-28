function binarySearch<T>(arr: T[], target: T): number {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        }
        
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}
function binarySearch<T>(
    arr: T[], 
    target: T, 
    comparator?: (a: T, b: T) => number
): number {
    let left = 0;
    let right = arr.length - 1;
    
    const compare = comparator || ((a: T, b: T) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const comparison = compare(arr[mid], target);
        
        if (comparison === 0) {
            return mid;
        }
        
        if (comparison < 0) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}
function binarySearchRecursive<T>(
    arr: T[], 
    target: T, 
    left: number = 0, 
    right: number = arr.length - 1
): number {
    if (left > right) return -1;
    
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
        return mid;
    }
    
    if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, right);
    } else {
        return binarySearchRecursive(arr, target, left, mid - 1);
    }
}
function findFirstOccurrence<T>(arr: T[], target: T): number {
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

function findLastOccurrence<T>(arr: T[], target: T): number {
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
// Basic usage
const numbers = [1, 3, 5, 7, 9, 11, 13];
console.log(binarySearch(numbers, 7)); // Output: 3
console.log(binarySearch(numbers, 6)); // Output: -1

// With custom comparator
interface Person {
    id: number;
    name: string;
}

const people: Person[] = [
    { id: 1, name: "Alice" },
    { id: 3, name: "Bob" },
    { id: 5, name: "Charlie" }
];

const result = binarySearch(people, { id: 3 } as Person, 
    (a, b) => a.id - b.id
);
console.log(result); // Output: 1

// Finding boundaries
const duplicates = [1, 2, 2, 2, 3, 4, 5];
console.log(findFirstOccurrence(duplicates, 2)); // Output: 1
console.log(findLastOccurrence(duplicates, 2));  // Output: 3
class BinarySearch<T> {
    static search(
        arr: T[], 
        target: T, 
        comparator?: (a: T, b: T) => number
    ): number {
        // Implementation here
    }

    static recursiveSearch(
        arr: T[], 
        target: T, 
        left: number = 0, 
        right: number = arr.length - 1
    ): number {
        // Recursive implementation
    }
}
