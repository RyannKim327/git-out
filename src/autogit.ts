const numbers: number[] = [1, 5, 3, 9, 2, 8];
const max = Math.max(...numbers);
console.log(max); // 9
const numbers: number[] = [1, 5, 3, 9, 2, 8];
const max = Math.max.apply(null, numbers);
console.log(max); // 9
const numbers: number[] = [1, 5, 3, 9, 2, 8];
const max = numbers.reduce((a, b) => Math.max(a, b), -Infinity);
console.log(max); // 9
function findMax(arr: number[]): number | undefined {
    if (arr.length === 0) return undefined;
    return Math.max(...arr);
}

const numbers: number[] = [1, 5, 3, 9, 2, 8];
const empty: number[] = [];

console.log(findMax(numbers)); // 9
console.log(findMax(empty));   // undefined
interface Product {
    name: string;
    price: number;
}

const products: Product[] = [
    { name: "Laptop", price: 1000 },
    { name: "Mouse", price: 25 },
    { name: "Keyboard", price: 75 }
];

// Find maximum price
const maxPrice = Math.max(...products.map(p => p.price));
console.log(maxPrice); // 1000

// Or using reduce to get the entire object
const maxProduct = products.reduce((max, product) => 
    product.price > max.price ? product : max
);
console.log(maxProduct); // { name: "Laptop", price: 1000 }
function findMaxFast(arr: number[]): number {
    let max = -Infinity;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) max = arr[i];
    }
    return max;
}
function findMax<T>(arr: T[], compareFn: (a: T, b: T) => number): T | undefined {
    if (arr.length === 0) return undefined;
    return arr.reduce((max, current) => compareFn(current, max) > 0 ? current : max);
}

// Usage
const numbers = [1, 5, 3, 9, 2, 8];
const maxNumber = findMax(numbers, (a, b) => a - b);

const strings = ["apple", "zebra", "banana"];
const maxString = findMax(strings, (a, b) => a.localeCompare(b));
