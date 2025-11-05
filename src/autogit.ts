function binarySearch<T>(arr: T[], target: T): number {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid; // Found the target
        } else if (arr[mid] < target) {
            left = mid + 1; // Search right half
        } else {
            right = mid - 1; // Search left half
        }
    }
    
    return -1; // Target not found
}

// Usage examples
const numbers = [1, 3, 5, 7, 9, 11, 13, 15];
console.log(binarySearch(numbers, 7));  // Output: 3
console.log(binarySearch(numbers, 10)); // Output: -1

const strings = ["apple", "banana", "cherry", "date", "elderberry"];
console.log(binarySearch(strings, "cherry")); // Output: 2
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

// Usage
console.log(binarySearchRecursive(numbers, 9)); // Output: 4
function binarySearchWithComparator<T>(
    arr: T[],
    target: T,
    comparator: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
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

// Custom objects example
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

// Search by id
const result = binarySearchWithComparator(
    people, 
    { id: 5, name: "" } as Person, 
    (a, b) => a.id - b.id
);
console.log(result); // Output: 2
function lowerBound<T>(arr: T[], target: T): number {
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

// Usage with duplicates
const duplicates = [1, 2, 2, 2, 3, 4, 5];
console.log(lowerBound(duplicates, 2)); // Output: 1 (first occurrence of 2)
class BinarySearch<T> {
    constructor(private arr: T[]) {
        // Ensure array is sorted
        if (!this.isSorted(arr)) {
            throw new Error("Array must be sorted for binary search");
        }
    }
    
    private isSorted(arr: T[]): boolean {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < arr[i - 1]) {
                return false;
            }
        }
        return true;
    }
    
    search(target: T): number {
        return this.iterativeSearch(target);
    }
    
    private iterativeSearch(target: T): number {
        let left = 0;
        let right = this.arr.length - 1;
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            
            if (this.arr[mid] === target) {
                return mid;
            } else if (this.arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return -1;
    }
    
    // Find insertion point for maintaining sorted order
    findInsertionPoint(target: T): number {
        let left = 0;
        let right = this.arr.length;
        
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            
            if (this.arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        return left;
    }
}

// Usage
const searcher = new BinarySearch([1, 3, 5, 7, 9]);
console.log(searcher.search(5)); // Output: 2
console.log(searcher.findInsertionPoint(6)); // Output: 3
type SearchResult = {
    index: number;
    found: boolean;
    value?: any;
};

function binarySearchSafe<T>(
    arr: T[],
    target: T
): SearchResult {
    // Input validation
    if (!Array.isArray(arr)) {
        throw new Error("First argument must be an array");
    }
    
    if (arr.length === 0) {
        return { index: -1, found: false };
    }
    
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return { 
                index: mid, 
                found: true, 
                value: arr[mid] 
            };
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return { index: -1, found: false };
}
