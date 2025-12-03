const numbers: number[] = [5, 2, 9, 1, 5, 6];
numbers.sort((a, b) => a - b);
console.log(numbers); // Output: [1, 2, 5, 5, 6, 9]
const numbers: number[] = [5, 2, 9, 1, 5, 6];
numbers.sort((a, b) => b - a);
console.log(numbers); // Output: [9, 6, 5, 5, 2, 1]
const users = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 35 },
];

users.sort((a, b) => a.age - b.age); // Sort by age ascending
console.log(users); // [Bob (25), Alice (30), Charlie (35)]
