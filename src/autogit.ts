const numbers: number[] = [1, 5, 3, 9, 2, 8];
const max: number = Math.max(...numbers);
console.log(max); // Output: 9
const numbers: number[] = [1, 5, 3, 9, 2, 8];
const max: number = Math.max.apply(null, numbers);
console.log(max); // Output: 9
const numbers: number[] = [1, 5, 3, 9, 2, 8];
const max: number = numbers.reduce((a, b) => Math.max(a, b), -Infinity);
console.log(max); // Output: 9
const numbers: number[] = []; // empty array
const max: number | null = numbers.length > 0 ? Math.max(...numbers) : null;
console.log(max); // Output: null
interface Product {
  id: number;
  price: number;
}

const products: Product[] = [
  { id: 1, price: 100 },
  { id: 2, price: 200 },
  { id: 3, price: 150 }
];

// Find maximum price
const maxPrice: number = Math.max(...products.map(p => p.price));
console.log(maxPrice); // Output: 200

// Or using reduce
const maxPriceReduce: number = products.reduce(
  (max, product) => product.price > max ? product.price : max, 
  -Infinity
);
function findMax<T extends number>(array: T[]): T | null {
  if (array.length === 0) return null;
  return Math.max(...array) as T;
}

// Usage
const numbers = [1, 5, 3, 9, 2, 8];
const result = findMax(numbers);
console.log(result); // Output: 9

const empty: number[] = [];
console.log(findMax(empty)); // Output: null
function findMaxLargeArray(arr: number[]): number {
  let max = -Infinity;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}
