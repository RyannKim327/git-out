const numbers: number[] = [4, 2, 8, 1, 9, 3];
const max: number = Math.max(...numbers);
console.log(max); // Output: 9
const numbers: number[] = [4, 2, 8, 1, 9, 3];
const max: number = Math.max.apply(null, numbers);
console.log(max); // Output: 9
const numbers: number[] = [4, 2, 8, 1, 9, 3];
const max: number = numbers.reduce((a, b) => Math.max(a, b), -Infinity);
console.log(max); // Output: 9
function findMax(arr: number[]): number {
    if (arr.length === 0) throw new Error("Array cannot be empty");
    
    let max: number = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

const numbers: number[] = [4, 2, 8, 1, 9, 3];
console.log(findMax(numbers)); // Output: 9
function getMaxValue(arr: number[]): number | null {
    if (arr.length === 0) return null;
    return Math.max(...arr);
}

const numbers: number[] = [4, 2, 8, 1, 9, 3];
const emptyArray: number[] = [];

console.log(getMaxValue(numbers)); // Output: 9
console.log(getMaxValue(emptyArray)); // Output: null
interface Item {
    id: number;
    value: number;
}

const items: Item[] = [
    { id: 1, value: 10 },
    { id: 2, value: 25 },
    { id: 3, value: 15 }
];

const maxValue: number = Math.max(...items.map(item => item.value));
console.log(maxValue); // Output: 25

// Or get the entire object with max value
const maxItem: Item = items.reduce((max, item) => 
    item.value > max.value ? item : max
);
console.log(maxItem); // Output: { id: 2, value: 25 }
