const numbers: number[] = [10, 2, 5];

// Ascending (smallest to largest)
numbers.sort((a: number, b: number) => a - b);
console.log(numbers); // Output: [2, 5, 10]
const numbers: number[] = [10, 2, 5];

// Descending (largest to smallest)
numbers.sort((a: number, b: number) => b - a);
console.log(numbers); // Output: [10, 5, 2]
const originalNumbers: number[] = [10, 2, 5];

// Create a new sorted array (original remains unchanged)
const sortedNumbers = [...originalNumbers].sort((a, b) => a - b);
console.log(sortedNumbers); // [2, 5, 10]
console.log(originalNumbers); // [10, 2, 5] (unchanged)
