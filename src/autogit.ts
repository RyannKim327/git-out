const numbers: number[] = [1, 5, 3, 9, 2, 8];
const max = Math.max(...numbers);
console.log(max); // Output: 9
const numbers: number[] = [1, 5, 3, 9, 2, 8];
const max = Math.max.apply(null, numbers);
console.log(max); // Output: 9
const numbers: number[] = [1, 5, 3, 9, 2, 8];
const max = numbers.reduce((a, b) => Math.max(a, b), -Infinity);
console.log(max); // Output: 9
const numbers: number[] = [1, 5, 3, 9, 2, 8];
let max = numbers[0];
for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > max) {
        max = numbers[i];
    }
}
console.log(max); // Output: 9
function findMax<T extends number>(arr: T[]): T {
    return Math.max(...arr);
}

const numbers = [1, 5, 3, 9, 2, 8];
const max = findMax(numbers);
console.log(max); // Output: 9
function findMaxSafe(arr: number[]): number | null {
    if (arr.length === 0) return null;
    return Math.max(...arr);
}

const numbers: number[] = [1, 5, 3, 9, 2, 8];
const empty: number[] = [];
console.log(findMaxSafe(numbers)); // Output: 9
console.log(findMaxSafe(empty));   // Output: null
