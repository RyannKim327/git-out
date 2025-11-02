let numbers: number[] = [5, 2, 9, 1, 5, 6, 3];

numbers.sort((a, b) => a - b); // Ascending order

console.log(numbers); // [1, 2, 3, 5, 5, 6, 9]
numbers.sort((a, b) => b - a); // Descending order

console.log(numbers); // [9, 6, 5, 5, 3, 2, 1]
function sortNumbers(numbers: number[]): number[] {
    return [...numbers].sort((a, b) => a - b);
}

// Usage
const unsorted: number[] = [42, 17, 8, 99, 3];
const sorted = sortNumbers(unsorted);
console.log(sorted); // [3, 8, 17, 42, 99]
console.log(unsorted); // Original array unchanged
function sortNumericArray(arr: (number | string)[]): number[] {
    return arr
        .filter(item => typeof item === 'number')
        .sort((a, b) => a - b) as number[];
}

// Usage
const mixed: (number | string)[] = [5, 'apple', 2, 'banana', 8];
const numbersOnly = sortNumericArray(mixed);
console.log(numbersOnly); // [2, 5, 8]
interface Item {
    id: number;
    value: number;
}

const items: Item[] = [
    { id: 1, value: 100 },
    { id: 3, value: 50 },
    { id: 2, value: 200 }
];

// Sort by value
items.sort((a, b) => a.value - b.value);
console.log(items); 
// [{ id: 3, value: 50 }, { id: 1, value: 100 }, { id: 2, value: 200 }]

// Sort by id
items.sort((a, b) => a.id - b.id);
