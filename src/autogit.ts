const numbers: number[] = [1, 5, 2, 8, 3];
const max = Math.max(...numbers);
console.log(max); // Output: 8
const numbers: number[] = [1, 5, 2, 8, 3];
const max = Math.max.apply(null, numbers);
console.log(max); // Output: 8
const numbers: number[] = [1, 5, 2, 8, 3];
const max = numbers.reduce((a, b) => Math.max(a, b));
console.log(max); // Output: 8
function findMax(arr: number[]): number | null {
    if (arr.length === 0) return null;
    return Math.max(...arr);
}

const numbers: number[] = [];
const max = findMax(numbers);
console.log(max); // Output: null
interface Item {
    value: number;
    name: string;
}

const items: Item[] = [
    { value: 10, name: "item1" },
    { value: 25, name: "item2" },
    { value: 15, name: "item3" }
];

const max = items.reduce((maxItem, currentItem) => 
    currentItem.value > maxItem.value ? currentItem : maxItem
);

console.log(max); // Output: { value: 25, name: "item2" }
function findMax<T>(arr: T[], compareFn: (a: T, b: T) => number): T | null {
    if (arr.length === 0) return null;
    
    return arr.reduce((max, current) => 
        compareFn(current, max) > 0 ? current : max
    );
}

// Usage
const numbers = [1, 5, 2, 8, 3];
const maxNumber = findMax(numbers, (a, b) => a - b);
console.log(maxNumber); // Output: 8
