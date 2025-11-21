let numbers: number[] = [42, 5, 18, 100, 7];

// Ascending order
numbers.sort((a, b) => a - b);
console.log(numbers); // [5, 7, 18, 42, 100]

// Descending order
numbers.sort((a, b) => b - a);
console.log(numbers); // [100, 42, 18, 7, 5]
