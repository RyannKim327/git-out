const numbers: number[] = [5, 2, 100, 3, 8];

// 1. Ascending
numbers.sort((a, b) => a - b);
console.log(numbers); // [2, 3, 5, 8, 100]

// 2. Descending
numbers.sort((a, b) => b - a);
console.log(numbers); // [100, 8, 5, 3, 2]
