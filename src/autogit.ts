function findMaxWithSpread(arr: number[]): number | undefined {
  if (arr.length === 0) {
    return undefined; // Or throw an error, or return null, depending on desired behavior for empty arrays
  }
  return Math.max(...arr);
}

// Example usage:
const numbers1 = [10, 5, 20, 8, 15];
console.log("Max (spread):", findMaxWithSpread(numbers1)); // Output: Max (spread): 20

const numbers2 = [-1, -5, -2];
console.log("Max (spread, negative):", findMaxWithSpread(numbers2)); // Output: Max (spread, negative): -1

const emptyArray: number[] = [];
console.log("Max (spread, empty):", findMaxWithSpread(emptyArray)); // Output: Max (spread, empty): undefined
function findMaxWithReduce(arr: number[]): number | undefined {
  if (arr.length === 0) {
    return undefined;
  }
  // The first element `arr[0]` is used as the initial `max` value
  return arr.reduce((max, current) => Math.max(max, current));
}

// Example usage:
const numbers3 = [10, 5, 20, 8, 15];
console.log("Max (reduce):", findMaxWithReduce(numbers3)); // Output: Max (reduce): 20

const emptyArray2: number[] = [];
console.log("Max (reduce, empty):", findMaxWithReduce(emptyArray2)); // Output: Max (reduce, empty): undefined
function findMaxWithLoop(arr: number[]): number | undefined {
  if (arr.length === 0) {
    return undefined;
  }

  let max = arr[0]; // Initialize max with the first element

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

// Example usage:
const numbers4 = [10, 5, 20, 8, 15];
console.log("Max (loop):", findMaxWithLoop(numbers4)); // Output: Max (loop): 20

const emptyArray3: number[] = [];
console.log("Max (loop, empty):", findMaxWithLoop(emptyArray3)); // Output: Max (loop, empty): undefined
interface Product {
  id: number;
  price: number;
  name: string;
}

function findMaxObjectProperty<T>(
  arr: T[],
  selector: (item: T) => number // A function that returns the number to compare
): T | undefined {
  if (arr.length === 0) {
    return undefined;
  }

  return arr.reduce((maxItem, currentItem) => {
    return selector(currentItem) > selector(maxItem) ? currentItem : maxItem;
  });
}

// Example usage:
const products: Product[] = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Mouse", price: 25 },
  { id: 3, name: "Keyboard", price: 75 },
  { id: 4, name: "Monitor", price: 300 },
];

const mostExpensiveProduct = findMaxObjectProperty(products, (p) => p.price);
console.log("Most expensive product:", mostExpensiveProduct);
// Output: Most expensive product: { id: 1, name: 'Laptop', price: 1200 }

const productWithLongestName = findMaxObjectProperty(products, (p) => p.name.length);
console.log("Product with longest name:", productWithLongestName);
// Output: Product with longest name: { id: 3, name: 'Keyboard', price: 75 } (or 'Laptop' if lengths were equal and it came first)

const emptyProducts: Product[] = [];
console.log("Max product (empty):", findMaxObjectProperty(emptyProducts, (p) => p.price));
// Output: Max product (empty): undefined
function findMaxIgnoringNullUndefined(
  arr: (number | null | undefined)[]
): number | undefined {
  const numbersOnly = arr.filter(
    (item): item is number => typeof item === "number" && item !== null
  );

  if (numbersOnly.length === 0) {
    return undefined;
  }

  return Math.max(...numbersOnly);
}

// Example usage:
const mixedNumbers = [10, null, 5, undefined, 20, 8, null, 15];
console.log("Max (mixed, filtered):", findMaxIgnoringNullUndefined(mixedNumbers)); // Output: Max (mixed, filtered): 20

const onlyNullUndefined = [null, undefined];
console.log("Max (only null/undefined):", findMaxIgnoringNullUndefined(onlyNullUndefined)); // Output: Max (only null/undefined): undefined
