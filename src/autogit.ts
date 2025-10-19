const numbers: number[] = [1, 5, 2, 8, 3, 9, 4];
const maxValue = Math.max(...numbers);
console.log(maxValue); // Output: 9
const numbers: number[] = [1, 5, 2, 8, 3, 9, 4];
const maxValue = Math.max.apply(null, numbers);
console.log(maxValue); // Output: 9
const numbers: number[] = [1, 5, 2, 8, 3, 9, 4];
const maxValue = numbers.reduce((max, current) => {
  return current > max ? current : max;
}, numbers[0]);
console.log(maxValue); // Output: 9
function findMax(arr: number[]): number | null {
  if (arr.length === 0) {
    return null; // or throw an error, or return -Infinity
  }
  return Math.max(...arr);
}

// Usage
const emptyArray: number[] = [];
const numbers: number[] = [1, 5, 2, 8, 3, 9, 4];

console.log(findMax(emptyArray)); // Output: null
console.log(findMax(numbers));    // Output: 9
function safeMax(arr: number[]): number {
  if (arr.length === 0) {
    throw new Error("Cannot find maximum of empty array");
  }
  return Math.max(...arr);
}

// Usage with try-catch
try {
  const max = safeMax([1, 5, 2, 8, 3, 9, 4]);
  console.log(max); // Output: 9
} catch (error) {
  console.error(error.message);
}
interface Product {
  id: number;
  price: number;
  name: string;
}

const products: Product[] = [
  { id: 1, price: 100, name: "Laptop" },
  { id: 2, price: 50, name: "Mouse" },
  { id: 3, price: 200, name: "Monitor" }
];

// Find maximum price
const maxPrice = Math.max(...products.map(product => product.price));
console.log(maxPrice); // Output: 200

// Or find the product with maximum price
const productWithMaxPrice = products.reduce((max, product) => {
  return product.price > max.price ? product : max;
});
console.log(productWithMaxPrice); // Output: { id: 3, price: 200, name: "Monitor" }
const maxValue = Math.max(...array);
