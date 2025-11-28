let numbers: number[] = [5, 2, 8, 1, 9, 3, 7, 4, 6];

// Sorts the array in-place
numbers.sort((a, b) => a - b);

console.log("Ascending order:", numbers);
// Output: Ascending order: [1, 2, 3, 4, 5, 6, 7, 8, 9]
let numbersDesc: number[] = [5, 2, 8, 1, 9, 3, 7, 4, 6];

// Sorts the array in-place
numbersDesc.sort((a, b) => b - a);

console.log("Descending order:", numbersDesc);
// Output: Descending order: [9, 8, 7, 6, 5, 4, 3, 2, 1]
let originalNumbers: number[] = [5, 2, 8, 1, 9];

// Create a new array and then sort it
let sortedAscending: number[] = [...originalNumbers].sort((a, b) => a - b);
let sortedDescending: number[] = [...originalNumbers].sort((a, b) => b - a);

console.log("Original numbers:", originalNumbers);
// Output: Original numbers: [5, 2, 8, 1, 9]

console.log("New sorted ascending:", sortedAscending);
// Output: New sorted ascending: [1, 2, 5, 8, 9]

console.log("New sorted descending:", sortedDescending);
// Output: New sorted descending: [9, 8, 5, 2, 1]
let originalNumbersSlice: number[] = [5, 2, 8, 1, 9];

// Create a new array and then sort it
let sortedAscendingSlice: number[] = originalNumbersSlice.slice().sort((a, b) => a - b);

console.log("Original numbers (slice):", originalNumbersSlice);
// Output: Original numbers (slice): [5, 2, 8, 1, 9]

console.log("New sorted ascending (slice):", sortedAscendingSlice);
// Output: New sorted ascending (slice): [1, 2, 5, 8, 9]
interface Product {
    id: number;
    name: string;
    price: number; // Integer price for this example
}

let products: Product[] = [
    { id: 3, name: "Laptop", price: 1200 },
    { id: 1, name: "Mouse", price: 25 },
    { id: 4, name: "Keyboard", price: 75 },
    { id: 2, name: "Monitor", price: 300 },
];

// Sort by 'id' in ascending order
let productsSortedByIdAsc: Product[] = [...products].sort((a, b) => a.id - b.id);
console.log("Sorted by ID (Ascending):", productsSortedByIdAsc);
/* Output:
[
  { id: 1, name: 'Mouse', price: 25 },
  { id: 2, name: 'Monitor', price: 300 },
  { id: 3, name: 'Laptop', price: 1200 },
  { id: 4, name: 'Keyboard', price: 75 }
]
*/

// Sort by 'price' in descending order
let productsSortedByPriceDesc: Product[] = [...products].sort((a, b) => b.price - a.price);
console.log("Sorted by Price (Descending):", productsSortedByPriceDesc);
/* Output:
[
  { id: 3, name: 'Laptop', price: 1200 },
  { id: 2, name: 'Monitor', price: 300 },
  { id: 4, name: 'Keyboard', price: 75 },
  { id: 1, name: 'Mouse', price: 25 }
]
*/
