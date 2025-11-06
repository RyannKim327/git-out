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
interface Comparable {
    compareTo(other: any): number;
}

function binarySearchGeneric<T extends Comparable>(
    arr: T[], 
    target: T
): number {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const comparison = arr[mid].compareTo(target);
        
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
function binarySearchRecursive(
    arr: number[], 
    target: number, 
    left: number = 0, 
    right: number = arr.length - 1
): number {
    if (left > right) return -1;

    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
        return mid;
    } else if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, right);
    } else {
        return binarySearchRecursive(arr, target, left, mid - 1);
    }
}
function binarySearchWithComparator<T>(
    arr: T[], 
    target: T, 
    comparator: (a: T, b: T) => number
): number {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const comparison = comparator(arr[mid], target);
        
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

// Example usage with objects
interface User {
    id: number;
    name: string;
}

const users: User[] = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" }
];

const userComparator = (a: User, b: User) => a.id - b.id;
const result = binarySearchWithComparator(users, { id: 2, name: "Bob" }, userComparator);
function findInsertPosition(arr: number[], target: number): number {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return left; // Position where target should be inserted
}
class BinarySearch {
    // Standard implementation
    static search(arr: number[], target: number): number {
        let left = 0;
        let right = arr.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            
            if (arr[mid] === target) {
                return mid;
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return -1;
    }

    // Check if array is sorted (precondition)
    static isSorted(arr: number[]): boolean {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < arr[i - 1]) return false;
        }
        return true;
    }
}

// Usage example
const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15];

if (BinarySearch.isSorted(sortedArray)) {
    console.log(BinarySearch.search(sortedArray, 7));  // Output: 3
    console.log(BinarySearch.search(sortedArray, 10)); // Output: -1
} else {
    console.log("Array is not sorted!");
}
const mid = left + Math.floor((right - left) / 2);
