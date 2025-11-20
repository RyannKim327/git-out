const numbers: number[] = [1, 5, 3, 9, 2];
const maxValue: number = Math.max(...numbers);
console.log(maxValue); // Output: 9
const numbers: number[] = [1, 5, 3, 9, 2];
const maxValue: number = Math.max.apply(null, numbers);
console.log(maxValue); // Output: 9
const numbers: number[] = [1, 5, 3, 9, 2];
const maxValue: number = numbers.reduce((max, current) => 
    Math.max(max, current), -Infinity
);
console.log(maxValue); // Output: 9
const numbers: number[] = [1, 5, 3, 9, 2];
let maxValue: number = numbers[0];

for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > maxValue) {
        maxValue = numbers[i];
    }
}
console.log(maxValue); // Output: 9
const numbers: number[] = [];
const maxValue: number | null = numbers.length > 0 
    ? Math.max(...numbers) 
    : null;
console.log(maxValue); // Output: null
function findMax(numbers: number[]): number | null {
    if (numbers.length === 0) return null;
    return Math.max(...numbers);
}

const numbers: number[] = [1, 5, 3, 9, 2];
const maxValue = findMax(numbers);
console.log(maxValue); // Output: 9
interface Item {
    value: number;
    name: string;
}

const items: Item[] = [
    { value: 10, name: 'A' },
    { value: 25, name: 'B' },
    { value: 15, name: 'C' }
];

const maxValue: number = Math.max(...items.map(item => item.value));
console.log(maxValue); // Output: 25
