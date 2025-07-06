const numbers: number[] = [5, 2, 9, 1, 5, 6];

// Sort in ascending order
numbers.sort((a, b) => a - b);

console.log(numbers); // Output: [1, 2, 5, 5, 6, 9]
numbers.sort((a, b) => b - a);
console.log(numbers); // Output: [9, 6, 5, 5, 2, 1]
