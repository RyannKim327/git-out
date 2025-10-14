const numbers: number[] = [1, 5, 3, 9, 2, 8];

const maxValue = Math.max(...numbers);
console.log(maxValue); // 9
const numbers: number[] = [1, 5, 3, 9, 2, 8];

const maxValue = Math.max.apply(null, numbers);
console.log(maxValue); // 9
const numbers: number[] = [1, 5, 3, 9, 2, 8];

const maxValue = numbers.reduce((max, current) => Math.max(max, current));
console.log(maxValue); // 9
function findMax(numbers: number[]): number {
    if (numbers.length === 0) {
        throw new Error('Array is empty');
    }
    
    let max = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] > max) {
            max = numbers[i];
        }
    }
    return max;
}

const numbers: number[] = [1, 5, 3, 9, 2, 8];
const maxValue = findMax(numbers);
console.log(maxValue); // 9
function findMaxSafe(numbers: number[]): number | null {
    if (numbers.length === 0) {
        return null;
    }
    return Math.max(...numbers);
}

const emptyArray: number[] = [];
const nonEmptyArray: number[] = [1, 5, 3, 9];

console.log(findMaxSafe(emptyArray)); // null
console.log(findMaxSafe(nonEmptyArray)); // 9
function findMax<T extends { valueOf(): number }>(array: T[]): T | null {
    if (array.length === 0) {
        return null;
    }
    return array.reduce((max, current) => 
        (current.valueOf() > max.valueOf()) ? current : max
    );
}

// Usage with numbers
const numbers = [1, 5, 3, 9, 2, 8];
const maxNumber = findMax(numbers); // 9

// Usage with objects
interface Item {
    id: number;
    value: number;
}

const items: Item[] = [
    { id: 1, value: 10 },
    { id: 2, value: 25 },
    { id: 3, value: 15 }
];

const maxItem = findMax(items); // { id: 2, value: 25 }
