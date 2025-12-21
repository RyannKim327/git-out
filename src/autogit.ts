function isSortedAscending<T>(arr: T[]): boolean {
    return arr.every((value, index) => 
        index === 0 || value >= arr[index - 1]
    );
}

// Usage
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, 3, 2, 4, 5];

console.log(isSortedAscending(numbers)); // true
console.log(isSortedAscending(mixed));   // false
function isSortedAscending<T>(arr: T[]): boolean {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            return false;
        }
    }
    return true;
}
function isSortedAscending<T>(
    arr: T[], 
    compareFn: (a: T, b: T) => number = (a, b) => (a > b ? 1 : a < b ? -1 : 0)
): boolean {
    for (let i = 1; i < arr.length; i++) {
        if (compareFn(arr[i], arr[i - 1]) < 0) {
            return false;
        }
    }
    return true;
}

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

const isPeopleSorted = isSortedAscending(people, (a, b) => a.age - b.age);
console.log(isPeopleSorted); // true
const isSortedAscending = <T>(arr: T[]): boolean => 
    arr.slice(1).every((value, i) => value >= arr[i]);

// Usage
console.log(isSortedAscending([1, 2, 3, 2, 5])); // false
function isSortedAscending<T>(arr: T[]): boolean {
    if (arr.length <= 1) return true;
    
    return arr.every((value, index) => 
        index === 0 || value >= arr[index - 1]
    );
}

// Test cases
console.log(isSortedAscending([]));        // true (empty array)
console.log(isSortedAscending([1]));       // true (single element)
console.log(isSortedAscending([1, 1, 1])); // true (all equal)
console.log(isSortedAscending([5, 4, 3])); // false (descending)
function isSortedAscending<T extends number | string | Date>(
    arr: T[]
): boolean {
    if (arr.length <= 1) return true;
    
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            return false;
        }
    }
    return true;
}

// Works with numbers, strings, and Dates
console.log(isSortedAscending([1, 2, 3, 4]));           // true
console.log(isSortedAscending(['a', 'b', 'c']));        // true
console.log(isSortedAscending([
    new Date('2023-01-01'),
    new Date('2023-01-02')
]));                                                    // true
