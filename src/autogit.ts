function binarySearch(arr: number[], target: number): number {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        // Prevent potential overflow (though not crucial in TS)
        const mid = Math.floor(left + (right - left) / 2);

        if (arr[mid] === target) {
            return mid;  // Target found
        } else if (arr[mid] < target) {
            left = mid + 1;  // Search right half
        } else {
            right = mid - 1;  // Search left half
        }
    }

    return -1;  // Target not found
}
function binarySearchGeneric<T>(
    arr: T[],
    target: T,
    compareFn: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): number {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);
        const comparison = compareFn(arr[mid], target);

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
const numbers = [1, 3, 5, 7, 9];
console.log(binarySearch(numbers, 5));  // Output: 2
console.log(binarySearch(numbers, 2));  // Output: -1
interface Person {
    id: number;
    name: string;
}

const people: Person[] = [
    { id: 101, name: "Alice" },
    { id: 203, name: "Bob" },
    { id: 305, name: "Charlie" }
];

// Search by ID
const index = binarySearchGeneric(
    people,
    { id: 203 } as Person,
    (a, b) => a.id - b.id
);

console.log(index);  // Output: 1
// Test suite
console.log(binarySearch([], 5) === -1);                // Empty array
console.log(binarySearch([5], 5) === 0);                // Single element (found)
console.log(binarySearch([1, 2, 3, 4], 3) === 2);       // Even-length array
console.log(binarySearch([1, 2, 3, 4, 5], 2) === 1);    // Odd-length array
console.log(binarySearch([1, 2, 3, 4], 5) === -1);      // Target larger than max
