/**
 * Heap‑sort entry point.
 *
 * @param arr   The array to sort (will be sorted **in‑place**).
 * @param compare Optional comparator. Return <0 if a<b, 0 if equal, >0 if a>b.
 *                If omitted, the < and > operators are used (works for numbers & strings).
 * @returns The same array reference, now sorted.
 */
export function heapSort<T>(arr: T[], compare?: (a: T, b: T) => number): T[] {
  // Use the supplied comparator or fall back to the default JS comparison.
  const cmp = compare ?? defaultCompare;

  const n = arr.length;

  // 1️⃣ Build the max‑heap (bottom‑up).
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, cmp);
  }

  // 2️⃣ Repeatedly extract the max element and fix the heap.
  for (let end = n - 1; end > 0; end--) {
    // Swap the root (max) with the last element of the current heap.
    [arr[0], arr[end]] = [arr[end], arr[0]];
    // Restore heap property for the reduced heap.
    heapify(arr, end, 0, cmp);
  }

  return arr;
}

/**
 * Ensure the subtree rooted at `i` obeys the heap property.
 *
 * @param arr   The whole array.
 * @param heapSize  Number of elements that belong to the heap (0 … heapSize‑1 are valid).
 * @param i     Index of the root of the subtree to heapify.
 * @param cmp   Comparator function.
 */
function heapify<T>(
  arr: T[],
  heapSize: number,
  i: number,
  cmp: (a: T, b: T) => number
): void {
  let largest = i;               // Assume current node is the largest.
  const left = 2 * i + 1;        // Index of left child.
  const right = 2 * i + 2;       // Index of right child.

  // If left child exists and is greater than current largest → update.
  if (left < heapSize && cmp(arr[left], arr[largest]) > 0) {
    largest = left;
  }

  // Same for right child.
  if (right < heapSize && cmp(arr[right], arr[largest]) > 0) {
    largest = right;
  }

  // If the largest element is not the root, swap and continue heapifying.
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, heapSize, largest, cmp);
  }
}

/**
 * Default comparator that works for numbers, strings, and any type that
 * implements the `<` / `>` operators.
 */
function defaultCompare<T>(a: T, b: T): number {
  if (a === b) return 0;
  // The `<` and `>` operators coerce to primitive values, which is fine for
  // numbers, strings, booleans, etc.
  return a < b ? -1 : 1;
}
import { heapSort } from "./heapSort";

const nums = [5, 2, 9, 1, 5, 6];
heapSort(nums);               // → [1, 2, 5, 5, 6, 9]
console.log(nums);
const words = ["pear", "apple", "orange", "banana"];
heapSort(words);              // → ["apple", "banana", "orange", "pear"]
interface Person {
  name: string;
  age: number;
}

const people: Person[] = [
  { name: "Alice", age: 32 },
  { name: "Bob",   age: 24 },
  { name: "Carol", age: 29 },
];

// Sort by age ascending
heapSort(people, (a, b) => a.age - b.age);

console.log(people);
// → [{Bob,24}, {Carol,29}, {Alice,32}]
const sorted = heapSort([...originalArray]); // spread creates a shallow copy
// heapSort.ts --------------------------------------------------------------
export function heapSort<T>(arr: T[], compare?: (a: T, b: T) => number): T[] {
  const cmp = compare ?? defaultCompare;
  const n = arr.length;

  // Build max‑heap.
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, cmp);
  }

  // Extract elements from heap one by one.
  for (let end = n - 1; end > 0; end--) {
    [arr[0], arr[end]] = [arr[end], arr[0]];
    heapify(arr, end, 0, cmp);
  }

  return arr;
}

function heapify<T>(arr: T[], heapSize: number, i: number, cmp: (a: T, b: T) => number): void {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < heapSize && cmp(arr[left], arr[largest]) > 0) largest = left;
  if (right < heapSize && cmp(arr[right], arr[largest]) > 0) largest = right;

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, heapSize, largest, cmp);
  }
}

function defaultCompare<T>(a: T, b: T): number {
  if (a === b) return 0;
  return a < b ? -1 : 1;
}

// --------------------------------------------------------------------------
// demo.ts (or any file that imports heapSort)
import { heapSort } from "./heapSort";

const numbers = [7, 3, 5, 2, 9, 1];
console.log("Before:", numbers);
heapSort(numbers);
console.log("After :", numbers); // [1,2,3,5,7,9]

// Sorting objects:
interface Point { x: number; y: number; }
const points: Point[] = [
  { x: 5, y: 2 },
  { x: 1, y: 8 },
  { x: 3, y: 4 },
];

// Sort by distance from origin (ascending)
heapSort(points, (a, b) => {
  const da = a.x * a.x + a.y * a.y;
  const db = b.x * b.x + b.y * b.y;
  return da - db;
});

console.log(points);
