const numbers = [10, 2, 5];
numbers.sort(); 
console.log(numbers); // Output: [10, 2, 5] (incorrect numerical order!)
const numbers: number[] = [10, 2, 5];
numbers.sort((a, b) => a - b);
console.log(numbers); // Output: [2, 5, 10]
const numbers: number[] = [10, 2, 5];
numbers.sort((a, b) => b - a);
console.log(numbers); // Output: [10, 5, 2]
// Define an array with type annotation
const numbers: number[] = [4, -2, 10, 7, 3];

// Ascending order
const ascending = [...numbers].sort((a, b) => a - b);
console.log('Ascending:', ascending); // [-2, 3, 4, 7, 10]

// Descending order
const descending = [...numbers].sort((a, b) => b - a);
console.log('Descending:', descending); // [10, 7, 4, 3, -2]
