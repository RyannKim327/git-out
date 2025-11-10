function isSortedAscending<T>(arr: T[]): boolean {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i - 1] > arr[i]) {
            return false;
        }
    }
    return true;
}

// Usage
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, 3, 2, 4, 5];

console.log(isSortedAscending(numbers)); // true
console.log(isSortedAscending(mixed));   // false
function isSortedAscending<T>(arr: T[]): boolean {
    return arr.every((value, index, array) => 
        index === 0 || value >= array[index - 1]
    );
}

// Usage
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, 3, 2, 4, 5];

console.log(isSortedAscending(numbers)); // true
console.log(isSortedAscending(mixed));   // false
function isSortedAscending<T>(
    arr: T[], 
    compare: (a: T, b: T) => number = (a, b) => (a as any) - (b as any)
): boolean {
    for (let i = 1; i < arr.length; i++) {
        if (compare(arr[i - 1], arr[i]) > 0) {
            return false;
        }
    }
    return true;
}

// Usage with numbers
const numbers = [1, 2, 3, 4, 5];
console.log(isSortedAscending(numbers)); // true

// Usage with strings
const strings = ["apple", "banana", "cherry"];
console.log(isSortedAscending(strings, (a, b) => a.localeCompare(b))); // true

// Usage with custom objects
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 35 }
];

console.log(isSortedAscending(people, (a, b) => a.age - b.age)); // true
const isSortedAscending = <T>(arr: T[]): boolean => 
    arr.slice(1).every((item, i) => item >= arr[i]);

// Usage
console.log(isSortedAscending([1, 2, 3, 4])); // true
console.log(isSortedAscending([1, 3, 2, 4])); // false
function isSortedAscending<T>(arr: T[]): boolean {
    // Handle empty array and single-element array
    if (arr.length <= 1) return true;
    
    for (let i = 1; i < arr.length; i++) {
        if (arr[i - 1] > arr[i]) {
            return false;
        }
    }
    return true;
}

// Test cases
console.log(isSortedAscending([]));        // true
console.log(isSortedAscending([1]));       // true
console.log(isSortedAscending([1, 1]));    // true (equal values are considered sorted)
console.log(isSortedAscending([1, 2, 2])); // true
