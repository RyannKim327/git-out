// Sort in ascending order
let numbers: number[] = [5, 2, 9, 1, 5, 6];
numbers.sort((a, b) => a - b);
console.log(numbers); // [1, 2, 5, 5, 6, 9]

// Sort in descending order
numbers.sort((a, b) => b - a);
console.log(numbers); // [9, 6, 5, 5, 2, 1]
function sortNumbers(numbers: number[]): number[] {
    // Create a copy to avoid mutating original array
    return [...numbers].sort((a, b) => a - b);
}

// Usage
const myNumbers: number[] = [42, 17, 8, 23, 5, 99];
const sortedNumbers: number[] = sortNumbers(myNumbers);

console.log('Original:', myNumbers);    // [42, 17, 8, 23, 5, 99]
console.log('Sorted:', sortedNumbers);  // [5, 8, 17, 23, 42, 99]
let numbers: number[] = [5, 2, 9, 1, 5, 6];
numbers.sort(); // Works for numbers, but explicit compare is preferred
