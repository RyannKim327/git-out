const numbers: number[] = [1, 5, 3, 9, 2, 8];
const maxValue = Math.max(...numbers);
console.log(maxValue); // Output: 9
const numbers: number[] = [1, 5, 3, 9, 2, 8];
const maxValue = Math.max.apply(null, numbers);
console.log(maxValue); // Output: 9
const numbers: number[] = [1, 5, 3, 9, 2, 8];
const maxValue = numbers.reduce((max, current) => 
    current > max ? current : max, numbers[0]
);
console.log(maxValue); // Output: 9
function findMax(arr: number[]): number | null {
    if (arr.length === 0) return null;
    return Math.max(...arr);
}

const numbers: number[] = [1, 5, 3, 9, 2, 8];
const emptyArray: number[] = [];
console.log(findMax(numbers)); // Output: 9
console.log(findMax(emptyArray)); // Output: null
interface Product {
    name: string;
    price: number;
}

const products: Product[] = [
    { name: "Laptop", price: 1000 },
    { name: "Phone", price: 500 },
    { name: "Tablet", price: 300 }
];

// Find max price
const maxPrice = Math.max(...products.map(p => p.price));
console.log(maxPrice); // Output: 1000

// Or find the entire object with max price
const productWithMaxPrice = products.reduce((max, product) => 
    product.price > max.price ? product : max
);
console.log(productWithMaxPrice); // Output: { name: "Laptop", price: 1000 }
const mixedArray = [1, "2", 3]; // Error: Type 'string' is not assignable to type 'number'
const maxValue = Math.max(...mixedArray); // TypeScript will show an error
