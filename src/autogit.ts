function isSortedAscending<T>(arr: T[]): boolean {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            return false;
        }
    }
    return true;
}

// Example usage
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, 3, 2, 4];
console.log(isSortedAscending(numbers)); // true
console.log(isSortedAscending(mixed));   // false
function isSortedAscending<T>(arr: T[]): boolean {
    return arr.every((value, index) => 
        index === 0 || value >= arr[index - 1]
    );
}

// Example usage
const strings = ["apple", "banana", "cherry"];
const unsortedStrings = ["banana", "apple", "cherry"];
console.log(isSortedAscending(strings)); // true
console.log(isSortedAscending(unsortedStrings)); // false
function isSorted<T>(
    arr: T[], 
    comparator: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): boolean {
    for (let i = 1; i < arr.length; i++) {
        if (comparator(arr[i], arr[i - 1]) < 0) {
            return false;
        }
    }
    return true;
}

// Example usage
const numbers = [1, 2, 3, 4, 5];
const descending = [5, 4, 3, 2, 1];

console.log(isSorted(numbers)); // true (ascending)
console.log(isSorted(descending, (a, b) => b - a)); // true (descending)
const isSortedAscending = <T>(arr: T[]): boolean => 
    arr.slice(1).every((value, index) => value >= arr[index]);

// Example usage
const empty: number[] = [];
const single = [42];
console.log(isSortedAscending(empty)); // true
console.log(isSortedAscending(single)); // true
