function binarySearch<T>(arr: T[], target: T): number {
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
function binarySearch<T>(
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
function binarySearchRecursive<T>(
    arr: T[], 
    target: T, 
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
// Example with numbers
const numbers = [1, 3, 5, 7, 9, 11, 13, 15, 17];
console.log(binarySearch(numbers, 7)); // 3
console.log(binarySearch(numbers, 10)); // -1 (not found)

// Example with strings
const words = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
console.log(binarySearch(words, 'cherry')); // 2

// Example with custom objects
interface Person {
    id: number;
    name: string;
}

const people: Person[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
];

// Search by ID using comparator
const result = binarySearch(people, { id: 2 } as Person, (a, b) => a.id - b.id);
console.log(result); // 1
function findInsertPosition<T>(arr: T[], target: T): number {
    let left = 0;
    let right = arr.length;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left;
}
