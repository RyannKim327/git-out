const numbers: number[] = [3, 1, 4, 1, 5, 9, 2, 6, 5];

// Ascending order
const sortedAscending = numbers.sort((a, b) => a - b);
console.log(sortedAscending); // [1, 1, 2, 3, 4, 5, 5, 6, 9]

// Descending order
const sortedDescending = numbers.sort((a, b) => b - a);
console.log(sortedDescending); // [9, 6, 5, 5, 4, 3, 2, 1, 1]
const numbers: number[] = [3, 1, 4, 1, 5, 9, 2, 6, 5];

// Immutable ascending sort (original array unchanged)
const sortedAscending = [...numbers].sort((a, b) => a - b);

// Immutable descending sort
const sortedDescending = [...numbers].sort((a, b) => b - a);
// Sort even numbers first, then odd numbers
const customSorted = numbers.sort((a, b) => {
    if (a % 2 === 0 && b % 2 !== 0) return -1;
    if (a % 2 !== 0 && b % 2 === 0) return 1;
    return a - b;
});
function sortNumbers(arr: number[], descending = false): number[] {
    return [...arr].sort((a, b) => descending ? b - a : a - b);
}

const numbers: number[] = [3, 1, 4, 1, 5, 9, 2, 6, 5];
const sorted = sortNumbers(numbers); // Ascending
const reversed = sortNumbers(numbers, true); // Descending
function safeSort(arr: number[]): number[] {
    if (!Array.isArray(arr)) {
        throw new Error('Input must be an array');
    }
    if (arr.length === 0) return [];
    
    return [...arr].sort((a, b) => a - b);
}

// Usage
const emptyArray: number[] = [];
const sortedEmpty = safeSort(emptyArray); // []
const numbers: number[] = [64, 34, 25, 12, 22, 11, 90];

// Sort with type annotations
const sortedNumbers: number[] = [...numbers].sort((a: number, b: number) => a - b);

console.log('Original:', numbers); // Unchanged
console.log('Sorted:', sortedNumbers); // [11, 12, 22, 25, 34, 64, 90]
