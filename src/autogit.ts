const numbers: number[] = [1, 5, 3, 9, 2];
const maxValue = Math.max(...numbers);
console.log(maxValue); // Output: 9
const numbers: number[] = [1, 5, 3, 9, 2];
const maxValue = Math.max.apply(null, numbers);
console.log(maxValue); // Output: 9
const numbers: number[] = [1, 5, 3, 9, 2];
const maxValue = numbers.reduce((max, current) => Math.max(max, current), -Infinity);
console.log(maxValue); // Output: 9
const numbers: number[] = [1, 5, 3, 9, 2];
let maxValue = -Infinity;

for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > maxValue) {
        maxValue = numbers[i];
    }
}

console.log(maxValue); // Output: 9
function findMax(arr: number[]): number | null {
    if (arr.length === 0) {
        return null;
    }
    return Math.max(...arr);
}

const numbers: number[] = [1, 5, 3, 9, 2];
const emptyArray: number[] = [];

console.log(findMax(numbers)); // Output: 9
console.log(findMax(emptyArray)); // Output: null
interface Product {
    name: string;
    price: number;
}

const products: Product[] = [
    { name: "Laptop", price: 999 },
    { name: "Phone", price: 699 },
    { name: "Tablet", price: 399 }
];

// Find product with maximum price
const maxPriceProduct = products.reduce((max, product) => 
    product.price > max.price ? product : max
);

console.log(maxPriceProduct); // Output: { name: "Laptop", price: 999 }
const maxValue = Math.max(...yourArray);
