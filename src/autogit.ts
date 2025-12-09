const numbers: number[] = [5, 2, 9, 1, 5, 6];

// 1. Ascending
numbers.sort((a, b) => a - b);
console.log(numbers); // [1, 2, 5, 5, 6, 9]

// 2. Descending
numbers.sort((a, b) => b - a);
console.log(numbers); // [9, 6, 5, 5, 2, 1]
