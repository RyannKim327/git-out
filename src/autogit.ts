function binarySearch<T>(arr: T[], target: T): number {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midValue = arr[mid];

        if (midValue === target) {
            return mid;
        } else if (midValue < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1; // Not found
}
interface BinarySearchResult {
    index: number;
    found: boolean;
}

function binarySearch<T>(
    arr: T[], 
    target: T, 
    compareFn?: (a: T, b: T) => number
): BinarySearchResult {
    if (arr.length === 0) {
        return { index: -1, found: false };
    }

    let left = 0;
    let right = arr.length - 1;
    const comparator = compareFn || defaultComparator;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const comparison = comparator(arr[mid], target);

        if (comparison === 0) {
            return { index: mid, found: true };
        } else if (comparison < 0) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return { index: -1, found: false };
}

function defaultComparator<T>(a: T, b: T): number {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
}
function binarySearchRecursive<T>(
    arr: T[], 
    target: T, 
    left: number = 0, 
    right: number = arr.length - 1,
    compareFn?: (a: T, b: T) => number
): number {
    if (left > right) return -1;

    const comparator = compareFn || defaultComparator;
    const mid = Math.floor((left + right) / 2);
    const comparison = comparator(arr[mid], target);

    if (comparison === 0) {
        return mid;
    } else if (comparison < 0) {
        return binarySearchRecursive(arr, target, mid + 1, right, comparator);
    } else {
        return binarySearchRecursive(arr, target, left, mid - 1, comparator);
    }
}
// Example with numbers
const numbers = [1, 3, 5, 7, 9, 11, 13, 15];
console.log(binarySearch(numbers, 7)); // { index: 3, found: true }
console.log(binarySearch(numbers, 8)); // { index: -1, found: false }

// Example with strings
const strings = ['apple', 'banana', 'cherry', 'date'];
console.log(binarySearch(strings, 'cherry')); // { index: 2, found: true }

// Example with custom comparator
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Charlie', age: 35 }
];

const personComparator = (a: Person, b: Person) => a.age - b.age;
console.log(binarySearch(people, { age: 30 }, personComparator)); // { index: 1, found: true }
class BinarySearch<T> {
    private arr: T[];
    private compareFn: (a: T, b: T) => number;

    constructor(arr: T[], compareFn?: (a: T, b: T) => number) {
        this.arr = arr;
        this.compareFn = compareFn || defaultComparator;
    }

    search(target: T): number {
        let left = 0;
        let right = this.arr.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            const comparison = this.compareFn(this.arr[mid], target);

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

    // Additional utility methods
    exists(target: T): boolean {
        return this.search(target) !== -1;
    }

    getIndex(target: T): number {
        return this.search(target);
    }
}

// Usage
const searchInstance = new BinarySearch(numbers);
console.log(searchInstance.search(7)); // 3
console.log(searchInstance.exists(8)); // false
