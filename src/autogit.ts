const numbers: number[] = [10, 2, 20, 5, 1];

// Sort ascending (mutates the original array)
numbers.sort((a: number, b: number) => a - b);
console.log(numbers); // Output: [1, 2, 5, 10, 20]
const numbers: number[] = [10, 2, 20, 5, 1];

// Sort descending (mutates the original array)
numbers.sort((a: number, b: number) => b - a);
console.log(numbers); // Output: [20, 10, 5, 2, 1]
const originalArray: number[] = [3, 1, 4, 1, 5, 9];
const sortedArray = [...originalArray].sort((a, b) => a - b);

console.log(originalArray); // [3, 1, 4, 1, 5, 9] (unchanged)
console.log(sortedArray);   // [1, 1, 3, 4, 5, 9]
