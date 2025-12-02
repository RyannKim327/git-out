function binarySearch<T>(array: T[], target: T): number {
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
function binarySearch<T>(
    array: T[], 
    target: T, 
    comparator?: (a: T, b: T) => number
): number {
    let left = 0;
    let right = array.length - 1;
    
    // Default comparator if none provided
    const compare = comparator || ((a: T, b: T) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const comparison = compare(array[mid], target);
        
        if (comparison === 0) {
            return mid; // Found exact match
        } else if (comparison < 0) {
            left = mid + 1; // Search right half
        } else {
            right = mid - 1; // Search left half
        }
    }
    
    return -1; // Target not found
}
// Example 1: Basic usage with numbers
const numbers = [1, 3, 5, 7, 9, 11, 13];
console.log(binarySearch(numbers, 7)); // Output: 3
console.log(binarySearch(numbers, 8)); // Output: -1

// Example 2: With custom objects
interface User {
    id: number;
    name: string;
}

const users: User[] = [
    { id: 1, name: "Alice" },
    { id: 3, name: "Bob" },
    { id: 5, name: "Charlie" }
];

// Search by ID using custom comparator
const userIndex = binarySearch(
    users,
    { id: 3 } as User, // Target object
    (a, b) => a.id - b.id // Compare by ID
);
console.log(userIndex); // Output: 1

// Example 3: With strings
const fruits = ["apple", "banana", "cherry", "date"];
console.log(binarySearch(fruits, "cherry")); // Output: 2
function findInsertionPosition<T>(array: T[], target: T): number {
    let left = 0;
    let right = array.length;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        if (array[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left;
}

// Usage
const sortedArray = [1, 3, 5, 7];
console.log(findInsertionPosition(sortedArray, 4)); // Output: 2
// Test function
function testBinarySearch() {
    const testArray = [2, 4, 6, 8, 10, 12, 14];
    
    // Test cases
    console.assert(binarySearch(testArray, 6) === 2, "Should find element at index 2");
    console.assert(binarySearch(testArray, 14) === 6, "Should find last element");
    console.assert(binarySearch(testArray, 2) === 0, "Should find first element");
    console.assert(binarySearch(testArray, 7) === -1, "Should return -1 for missing element");
    console.assert(binarySearch([], 5) === -1, "Should handle empty array");
}

testBinarySearch();
