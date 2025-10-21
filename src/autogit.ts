const numbers: number[] = [1, 5, 3, 9, 2, 8];
const maxValue = Math.max(...numbers);
console.log(maxValue); // Output: 9
const numbers: number[] = [1, 5, 3, 9, 2, 8];
const maxValue = Math.max.apply(null, numbers);
console.log(maxValue); // Output: 9
const numbers: number[] = [1, 5, 3, 9, 2, 8];
const maxValue = numbers.reduce((max, current) => 
    current > max ? current : max, numbers[0]
);
console.log(maxValue); // Output: 9
const numbers: number[] = [1, 5, 3, 9, 2, 8];

let maxValue = numbers[0];
for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > maxValue) {
        maxValue = numbers[i];
    }
}
console.log(maxValue); // Output: 9
function findMax(arr: number[]): number | null {
    if (arr.length === 0) return null;
    return Math.max(...arr);
}

const numbers: number[] = [1, 5, 3, 9, 2, 8];
const emptyArray: number[] = [];

console.log(findMax(numbers)); // Output: 9
console.log(findMax(emptyArray)); // Output: null
function findMax<T>(arr: T[]): T | null {
    if (arr.length === 0) return null;
    return arr.reduce((max, current) => 
        current > max ? current : max
    );
}

const numbers = [1, 5, 3, 9, 2, 8];
const strings = ["apple", "banana", "cherry"];

console.log(findMax(numbers)); // Output: 9
console.log(findMax(strings)); // Output: "cherry"
