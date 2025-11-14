const numbers: number[] = [5, 3, 8, 1, 2];

// ascending
numbers.sort((a, b) => a - b);
console.log(numbers); // [1, 2, 3, 5, 8]

// descending
numbers.sort((a, b) => b - a);
console.log(numbers); // [8, 5, 3, 2, 1]
