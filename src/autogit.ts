const numbers: number[] = [1, 5, 2, 9, 3, 7];
const maxValue = Math.max(...numbers);
console.log(maxValue); // Output: 9
const numbers: number[] = [1, 5, 2, 9, 3, 7];
const maxValue = Math.max.apply(null, numbers);
console.log(maxValue); // Output: 9
const numbers: number[] = [1, 5, 2, 9, 3, 7];
const maxValue = numbers.reduce((max, current) => 
    Math.max(max, current), -Infinity
);
console.log(maxValue); // Output: 9
const numbers: number[] = [1, 5, 2, 9, 3, 7];
let maxValue = numbers[0];

for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > maxValue) {
        maxValue = numbers[i];
    }
}
console.log(maxValue); // Output: 9
const numbers: number[] = [];
const maxValue = numbers.length > 0 
    ? Math.max(...numbers) 
    : undefined;

console.log(maxValue); // Output: undefined
function findMax<T extends number>(arr: T[]): T | undefined {
    if (arr.length === 0) return undefined;
    return Math.max(...arr) as T;
}

const numbers = [1, 5, 2, 9, 3, 7];
const max = findMax(numbers);
console.log(max); // Output: 9
interface Product {
    name: string;
    price: number;
}

const products: Product[] = [
    { name: "Laptop", price: 999 },
    { name: "Phone", price: 699 },
    { name: "Tablet", price: 499 }
];

const maxPrice = Math.max(...products.map(p => p.price));
console.log(maxPrice); // Output: 999
