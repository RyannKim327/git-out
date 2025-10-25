function isSortedAscending<T>(arr: T[]): boolean {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
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
console.log(isSortedAscending(numbers)); // true
function isSortedAscending<T>(arr: T[]): boolean {
    return arr.slice(1).every((value, index) => 
        value >= arr[index]
    );
}

// Usage
const numbers = [1, 2, 3, 4, 5];
console.log(isSortedAscending(numbers)); // true
function isSorted<T>(
    arr: T[], 
    compare: (a: T, b: T) => boolean = (a, b) => a <= b
): boolean {
    for (let i = 1; i < arr.length; i++) {
        if (!compare(arr[i - 1], arr[i])) {
            return false;
        }
    }
    return true;
}

// Usage for ascending order
const numbers = [1, 2, 3, 4, 5];
console.log(isSorted(numbers)); // true

// You can also check for descending order
console.log(isSorted([5, 4, 3, 2, 1], (a, b) => a >= b)); // true
function isSortedAscending(arr: number[]): boolean {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            return false;
        }
    }
    return true;
}

// Usage
const numbers = [1, 2, 3, 4, 5];
console.log(isSortedAscending(numbers)); // true
// Test edge cases
console.log(isSortedAscending([]));        // true (empty array)
console.log(isSortedAscending([1]));       // true (single element)
console.log(isSortedAscending([1, 1, 1])); // true (equal elements)
console.log(isSortedAscending([1, 2, 2])); // true (non-strict ascending)
