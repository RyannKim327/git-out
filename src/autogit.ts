const numbers: number[] = [5, 3, 10, 1];
numbers.sort((a: number, b: number) => a - b);
console.log(numbers); // Output: [1, 3, 5, 10]
const numbers: number[] = [5, 3, 10, 1];
numbers.sort((a: number, b: number) => b - a);
console.log(numbers); // Output: [10, 5, 3, 1]
// Sort numbers in-place (ascending)
const data: number[] = [40, 100, 1, 5, 25];
data.sort((a, b) => a - b);
console.log(data); // Output: [1, 5, 25, 40, 100]

// Create a sorted copy (descending) without mutating original
const originalData = [40, 100, 1, 5, 25];
const sortedData = [...originalData].sort((a, b) => b - a);
console.log(sortedData); // Output: [100, 40, 25, 5, 1]
