const numbers: number[] = [5, 2, 9, 1, 7, 3];
const maxValue = Math.max(...numbers);
console.log(maxValue); // 9
const numbers: number[] = [5, 2, 9, 1, 7, 3];
const maxValue = Math.max.apply(null, numbers);
console.log(maxValue); // 9
const numbers: number[] = [5, 2, 9, 1, 7, 3];
const maxValue = numbers.reduce((max, current) => {
  return current > max ? current : max;
}, numbers[0]);
console.log(maxValue); // 9
const numbers: number[] = [5, 2, 9, 1, 7, 3];
let maxValue = numbers[0];

for (let i = 1; i < numbers.length; i++) {
  if (numbers[i] > maxValue) {
    maxValue = numbers[i];
  }
}
console.log(maxValue); // 9
function findMax(arr: number[]): number | null {
  if (arr.length === 0) {
    return null;
  }
  return Math.max(...arr);
}

const numbers: number[] = [5, 2, 9, 1, 7, 3];
const emptyArray: number[] = [];

console.log(findMax(numbers)); // 9
console.log(findMax(emptyArray)); // null
interface Product {
  id: number;
  price: number;
  name: string;
}

const products: Product[] = [
  { id: 1, price: 25, name: "Book" },
  { id: 2, price: 50, name: "Pen" },
  { id: 3, price: 15, name: "Notebook" }
];

// Find max price
const maxPrice = Math.max(...products.map(p => p.price));
console.log(maxPrice); // 50

// Or using reduce to get the entire object with max price
const productWithMaxPrice = products.reduce((max, product) => 
  product.price > max.price ? product : max
);
console.log(productWithMaxPrice); // { id: 2, price: 50, name: "Pen" }
function findMax<T>(arr: T[], comparator?: (a: T, b: T) => number): T | null {
  if (arr.length === 0) return null;
  
  if (comparator) {
    return arr.reduce((max, current) => 
      comparator(current, max) > 0 ? current : max
    );
  }
  
  // Default numeric comparison
  return arr.reduce((max, current) => 
    (current as any) > (max as any) ? current : max
  );
}

// Usage
const numbers = [5, 2, 9, 1, 7, 3];
console.log(findMax(numbers)); // 9

const strings = ["apple", "zebra", "banana"];
console.log(findMax(strings)); // "zebra"
