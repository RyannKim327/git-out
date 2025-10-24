function isSortedAscending<T>(arr: T[]): boolean {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            return false;
        }
    }
    return true;
}

// Usage examples
console.log(isSortedAscending([1, 2, 3, 4, 5])); // true
console.log(isSortedAscending([1, 3, 2, 4, 5])); // false
console.log(isSortedAscending([])); // true (empty arrays are considered sorted)
console.log(isSortedAscending([1])); // true (single element arrays are sorted)
function isSortedAscending<T>(arr: T[]): boolean {
    return arr.every((value, index, array) => 
        index === 0 || value >= array[index - 1]
    );
}

// Usage
console.log(isSortedAscending([1, 2, 3, 4, 5])); // true
console.log(isSortedAscending([1, 3, 2, 4, 5])); // false
function isSortedAscending<T>(arr: T[]): arr is T[] {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            return false;
        }
    }
    return true;
}

// This can be useful for type narrowing
const numbers = [1, 2, 3, 4, 5];
if (isSortedAscending(numbers)) {
    // TypeScript knows numbers is sorted here
    console.log("Array is sorted!");
}
function isSorted<T>(
    arr: T[], 
    compare: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): boolean {
    for (let i = 1; i < arr.length; i++) {
        if (compare(arr[i - 1], arr[i]) > 0) {
            return false;
        }
    }
    return true;
}

// Usage with default comparator (ascending)
console.log(isSorted([1, 2, 3, 4, 5])); // true

// Usage with custom comparator for descending order check
console.log(isSorted([5, 4, 3, 2, 1], (a, b) => b - a)); // true
function isSortedAscending(arr: number[]): boolean {
    return arr.slice(1).every((val, i) => val >= arr[i]);
}

// Usage
console.log(isSortedAscending([1, 2, 3, 4, 5])); // true
console.log(isSortedAscending([1, 3, 2, 4, 5])); // false
