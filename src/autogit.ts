const numbers: number[] = [1, 2, 3, 4, 3, 5];
const valueToRemove: number = 3;

// Using filter() to create a new array without the specified value
const updatedNumbers: number[] = numbers.filter(item => item !== valueToRemove);

console.log("Original numbers:", numbers);          // [1, 2, 3, 4, 3, 5]
console.log("Updated numbers (filtered):", updatedNumbers); // [1, 2, 4, 5]
const colors: string[] = ['red', 'green', 'blue', 'green', 'yellow'];
const colorToRemove: string = 'green';

const indexToRemove: number = colors.indexOf(colorToRemove);

if (indexToRemove > -1) { // Only splice if the element is found
    colors.splice(indexToRemove, 1); // Remove 1 element at the found index
}

console.log("Original colors (modified):", colors); // ['red', 'blue', 'green', 'yellow']
interface Product {
    id: number;
    name: string;
    price: number;
}

const products: Product[] = [
    { id: 1, name: 'Laptop', price: 1200 },
    { id: 2, name: 'Mouse', price: 25 },
    { id: 3, name: 'Keyboard', price: 75 },
    { id: 4, name: 'Monitor', price: 300 },
];

const productIdToRemove: number = 2;

// Filter out the product with the matching ID
const remainingProducts: Product[] = products.filter(product => product.id !== productIdToRemove);

console.log("Original products:", products);
/*
[
  { id: 1, name: 'Laptop', price: 1200 },
  { id: 2, name: 'Mouse', price: 25 },
  { id: 3, name: 'Keyboard', price: 75 },
  { id: 4, name: 'Monitor', price: 300 }
]
*/
console.log("Remaining products:", remainingProducts);
/*
[
  { id: 1, name: 'Laptop', price: 1200 },
  { id: 3, name: 'Keyboard', price: 75 },
  { id: 4, name: 'Monitor', price: 300 }
]
*/
const fruits: string[] = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
const indexToRemove: number = 2; // Remove 'cherry' (at index 2)

// Check if the index is valid to prevent errors or unexpected behavior
if (indexToRemove >= 0 && indexToRemove < fruits.length) {
    const removedElements: string[] = fruits.splice(indexToRemove, 1); // Remove 1 element at indexToRemove
    console.log("Removed elements:", removedElements); // ['cherry']
}

console.log("Fruits after removal:", fruits); // ['apple', 'banana', 'date', 'elderberry']
