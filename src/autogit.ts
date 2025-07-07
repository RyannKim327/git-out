const numbers: number[] = [5, 10, 15, 20, 25];

// Find the maximum value using Math.max and spread operator
const maxValue = Math.max(...numbers);

console.log(maxValue); // Output: 25
const numbers: number[] = [5, 10, 15, 20, 25];

let maxValue: number = numbers[0]; // Start with the first element

// Loop through the array to find the maximum value
for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > maxValue) {
        maxValue = numbers[i];
    }
}

console.log(maxValue); // Output: 25
const numbers: number[] = [5, 10, 15, 20, 25];

// Use reduce to find the maximum value
const maxValue = numbers.reduce((max, current) => {
    return current > max ? current : max;
}, numbers[0]);

console.log(maxValue); // Output: 25
const numbers: number[] = [5, 10, 15, 20, 25];

let maxValue: number = numbers[0]; // Initialize with the first element

// Use forEach to find the maximum value
numbers.forEach((number) => {
    if (number > maxValue) {
        maxValue = number;
    }
});

console.log(maxValue); // Output: 25
function findMax(array: number[]): number {
    if (array.length === 0) {
        throw new Error("Array must not be empty");
    }
    return Math.max(...array);
}

const numbers: number[] = [5, 10, 15, 20, 25];
console.log(findMax(numbers)); // Output: 25
