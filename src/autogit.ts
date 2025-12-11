const numbers: number[] = [1, 5, 3, 9, 2, 8];

// Find maximum value
const max: number = Math.max(...numbers);
console.log(max); // Output: 9
const numbers: number[] = [1, 5, 3, 9, 2, 8];

// Find maximum value
const max: number = Math.max.apply(null, numbers);
console.log(max); // Output: 9
const numbers: number[] = [1, 5, 3, 9, 2, 8];

// Find maximum value
const max: number = numbers.reduce((a, b) => Math.max(a, b));
console.log(max); // Output: 9

// Or more explicitly:
const max2: number = numbers.reduce((max, current) => {
    return current > max ? current : max;
}, -Infinity);
console.log(max2); // Output: 9
const numbers: number[] = [1, 5, 3, 9, 2, 8];

function findMax(arr: number[]): number {
    let max = -Infinity;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

const max: number = findMax(numbers);
console.log(max); // Output: 9
function safeMax(arr: number[]): number | null {
    if (arr.length === 0) return null;
    return Math.max(...arr);
}

const emptyArray: number[] = [];
const numbers: number[] = [1, 5, 3, 9, 2, 8];

console.log(safeMax(emptyArray)); // Output: null
console.log(safeMax(numbers));    // Output: 9
interface Product {
    id: number;
    price: number;
    name: string;
}

const products: Product[] = [
    { id: 1, price: 10, name: "Item A" },
    { id: 2, price: 25, name: "Item B" },
    { id: 3, price: 15, name: "Item C" }
];

// Find maximum price
const maxPrice: number = Math.max(...products.map(p => p.price));
console.log(maxPrice); // Output: 25

// Or find the object with maximum price
const productWithMaxPrice: Product = products.reduce((max, product) => 
    product.price > max.price ? product : max
);
console.log(productWithMaxPrice); // Output: { id: 2, price: 25, name: "Item B" }
const max = Math.max(...yourArray);
