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
    
    return -1; // Not found
}
function binarySearchRecursive<T>(
    arr: T[], 
    target: T, 
    left: number = 0, 
    right: number = arr.length - 1
): number {
    if (left > right) {
        return -1;
    }
    
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
function binarySearchWithComparator<T>(
    arr: T[],
    target: T,
    comparator: (a: T, b: T) => number = (a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }
): number {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const comparison = comparator(arr[mid], target);
        
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
// Basic usage
const numbers = [1, 3, 5, 7, 9, 11, 13];
console.log(binarySearch(numbers, 7)); // 3
console.log(binarySearch(numbers, 8)); // -1

// With custom objects
interface User {
    id: number;
    name: string;
}

const users: User[] = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
    { id: 4, name: "David" }
];

// Search by id
const userComparator = (a: User, b: User) => a.id - b.id;
const sortedUsers = users.sort((a, b) => a.id - b.id);

console.log(binarySearchWithComparator(
    sortedUsers,
    { id: 3, name: "" } as User,
    userComparator
)); // 2

// String search
const names = ["apple", "banana", "cherry", "date"];
console.log(binarySearch(names, "cherry")); // 2
// Returns index if found, -1 if not
const index = sortedArray.indexOf(target);

// For objects, use findIndex with comparator
const userIndex = sortedUsers.findIndex(user => user.id === targetId);
