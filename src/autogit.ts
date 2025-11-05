function isSortedAscending<T>(arr: T[]): boolean {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i - 1] > arr[i]) {
            return false;
        }
    }
    return true;
}

// Usage
const numbers = [1, 2, 3, 5, 8];
const mixed = [1, 3, 2, 4];
console.log(isSortedAscending(numbers)); // true
console.log(isSortedAscending(mixed));   // false
function isSortedAscending<T>(arr: T[]): boolean {
    return arr.every((value, index) => 
        index === 0 || arr[index - 1] <= value
    );
}

// Usage
const arr1 = [1, 2, 3, 4];
const arr2 = [1, 3, 2, 4];
console.log(isSortedAscending(arr1)); // true
console.log(isSortedAscending(arr2)); // false
function isSortedAscending<T>(arr: T[], compareFn?: (a: T, b: T) => number): boolean {
    const comparator = compareFn || ((a: T, b: T) => (a as any) - (b as any));
    
    for (let i = 1; i < arr.length; i++) {
        if (comparator(arr[i - 1], arr[i]) > 0) {
            return false;
        }
    }
    return true;
}

// Usage with numbers
const numbers = [1, 2, 3, 4];
console.log(isSortedAscending(numbers)); // true

// Usage with custom comparator for objects
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 35 }
];

const isPeopleSorted = isSortedAscending(people, (a, b) => a.age - b.age);
console.log(isPeopleSorted); // true
const isSortedAscending = <T>(arr: T[]): boolean => 
    arr.slice(1).every((val, i) => arr[i] <= val);

// Usage
const sortedArr = [1, 2, 3, 4, 5];
const unsortedArr = [1, 3, 2, 4];
console.log(isSortedAscending(sortedArr));   // true
console.log(isSortedAscending(unsortedArr)); // false
function isSortedAscending<T>(arr: T[]): boolean {
    if (arr.length <= 1) return true;
    
    for (let i = 1; i < arr.length; i++) {
        if (arr[i - 1] > arr[i]) {
            return false;
        }
    }
    return true;
}

// Edge cases
console.log(isSortedAscending([]));        // true
console.log(isSortedAscending([1]));       // true
console.log(isSortedAscending([1, 1]));    // true (non-strict)
