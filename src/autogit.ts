const numbers = [10, 2, 5];
numbers.sort(); // Returns [10, 2, 5] ❌ (incorrect for numbers)
const numbers: number[] = [10, 2, 5];

// Option 1: Inline comparator
numbers.sort((a, b) => a - b); // [2, 5, 10] ✅

// Option 2: Reusable comparator function
const sortAscending = (a: number, b: number) => a - b;
numbers.sort(sortAscending); // Same result
const numbers: number[] = [10, 2, 5];

// Option 1: Inline comparator
numbers.sort((a, b) => b - a); // [10, 5, 2] ✅

// Option 2: Reusable comparator function
const sortDescending = (a: number, b: number) => b - a;
numbers.sort(sortDescending); // Same result
// Define a number array
const numbers: number[] = [4, 2, 9, 1, 5];

// Sort ascending
const ascending = [...numbers].sort((a, b) => a - b);
console.log(ascending); // [1, 2, 4, 5, 9]

// Sort descending
const descending = [...numbers].sort((a, b) => b - a);
console.log(descending); // [9, 5, 4, 2, 1]
