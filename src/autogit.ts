const numbers: number[] = [5, 2, 9, 1, 7];
const max = Math.max(...numbers);
console.log(max); // Output: 9
const numbers: number[] = [5, 2, 9, 1, 7];
const max = Math.max.apply(null, numbers);
console.log(max); // Output: 9
const numbers: number[] = [5, 2, 9, 1, 7];
const max = numbers.reduce((a, b) => Math.max(a, b));
console.log(max); // Output: 9
function findMax(arr: number[]): number | null {
    if (arr.length === 0) return null;
    return Math.max(...arr);
}

const numbers: number[] = [5, 2, 9, 1, 7];
const max = findMax(numbers);
console.log(max); // Output: 9

const emptyArray: number[] = [];
console.log(findMax(emptyArray)); // Output: null
interface Item {
    value: number;
    name: string;
}

const items: Item[] = [
    { value: 5, name: "A" },
    { value: 9, name: "B" },
    { value: 3, name: "C" }
];

// Find max value
const maxValue = Math.max(...items.map(item => item.value));
console.log(maxValue); // Output: 9

// Find object with max value
const maxObject = items.reduce((max, item) => 
    item.value > max.value ? item : max
);
console.log(maxObject); // Output: { value: 9, name: "B" }
