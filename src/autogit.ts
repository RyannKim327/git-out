let numbers: number[] = [3, 1, 4, 1, 5, 9, 2, 6];

// Sorts the array in-place (modifies the original array)
numbers.sort((a, b) => a - b);

console.log("Ascending:", numbers); // Output: Ascending: [1, 1, 2, 3, 4, 5, 6, 9]
let numbersDesc: number[] = [3, 1, 4, 1, 5, 9, 2, 6];

// Sorts the array in-place
numbersDesc.sort((a, b) => b - a);

console.log("Descending:", numbersDesc); // Output: Descending: [9, 6, 5, 4, 3, 2, 1, 1]
let originalNumbers: number[] = [3, 1, 4, 1, 5, 9, 2, 6];

// Create a new array, then sort it
const sortedNumbersAsc = [...originalNumbers].sort((a, b) => a - b);
const sortedNumbersDesc = [...originalNumbers].sort((a, b) => b - a);

console.log("Original:", originalNumbers);       // Output: Original: [3, 1, 4, 1, 5, 9, 2, 6] (unchanged)
console.log("Immutable Ascending:", sortedNumbersAsc); // Output: Immutable Ascending: [1, 1, 2, 3, 4, 5, 6, 9]
console.log("Immutable Descending:", sortedNumbersDesc); // Output: Immutable Descending: [9, 6, 5, 4, 3, 2, 1, 1]
let anotherOriginalNumbers: number[] = [3, 1, 4, 1, 5, 9, 2, 6];

// Create a new array using slice(), then sort it
const sortedNumbersSlice = anotherOriginalNumbers.slice().sort((a, b) => a - b);

console.log("Original (after slice):", anotherOriginalNumbers); // Output: Original (after slice): [3, 1, 4, 1, 5, 9, 2, 6]
console.log("Sorted via slice():", sortedNumbersSlice);       // Output: Sorted via slice(): [1, 1, 2, 3, 4, 5, 6, 9]
let wrongNumbers: number[] = [1, 10, 2, 20, 3];

wrongNumbers.sort(); // DO NOT DO THIS FOR NUMBERS!

console.log("Incorrect Sort:", wrongNumbers);
// Output: Incorrect Sort: [1, 10, 2, 20, 3]  <-- This is WRONG! '10' comes before '2' because '1' comes before '2' lexicographically.
// Expected: [1, 2, 3, 10, 20]
