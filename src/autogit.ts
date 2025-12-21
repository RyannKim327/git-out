/**
 * Swaps two elements in an array.
 */
function swap<T>(arr: T[], i: number, j: number): void {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

/**
 * Returns true if a should be placed before b according to the comparator.
 * By default we use a < b (i.e. a "min‑heap" comparator). For heap‑sort we need a
 * max‑heap, so we invert the result in the heapify routine.
 */
type Comparator<T> = (a: T, b: T) => boolean;
/**
 * Restores the heap property for the subtree rooted at `i`.
 *
 * @param arr          The array that stores the heap.
 * @param heapSize     Number of elements that belong to the heap (0 … heapSize‑1 are valid).
 * @param i            Index of the root of the subtree to heapify.
 * @param compare      Comparator that returns true when a should be *higher* in the heap.
 *                     For a max‑heap we pass (a, b) => a > b.
 */
function heapify<T>(arr: T[], heapSize: number, i: number, compare: Comparator<T>): void {
  let largest = i;               // Assume current node is the largest
  const left = 2 * i + 1;        // Left child index
  const right = 2 * i + 2;       // Right child index

  // If left child exists and is larger than current largest → update
  if (left < heapSize && compare(arr[left], arr[largest])) {
    largest = left;
  }

  // Same for right child
  if (right < heapSize && compare(arr[right], arr[largest])) {
    largest = right;
  }

  // If the largest is not the root, swap and continue heapifying
  if (largest !== i) {
    swap(arr, i, largest);
    heapify(arr, heapSize, largest, compare);
  }
}
/**
 * Turns `arr` into a max‑heap in‑place.
 */
function buildMaxHeap<T>(arr: T[], compare: Comparator<T>): void {
  const n = arr.length;
  // Start from the last parent node and heapify downwards.
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, compare);
  }
}
/**
 * Heap‑Sort implementation.
 *
 * @param arr        The array to sort. It will be sorted **in‑place**.
 * @param compare    Optional comparator. If omitted, the natural `<` / `>` order is used.
 *                   The comparator must return true when `a` should be considered *greater*
 *                   than `b` for a max‑heap (i.e. a > b for numbers).
 *
 * @returns The same array reference, now sorted in ascending order.
 */
export function heapSort<T>(arr: T[], compare?: Comparator<T>): T[] {
  // Default comparator for numbers / strings (ascending order)
  const defaultCompare = (a: T, b: T) => (a as any) > (b as any);
  const cmp = compare ?? defaultCompare;

  // 1️⃣ Build a max‑heap from the unsorted array
  buildMaxHeap(arr, cmp);

  // 2️⃣ Repeatedly extract the maximum element and shrink the heap
  for (let end = arr.length - 1; end > 0; end--) {
    // Move current max (root) to the end of the unsorted region
    swap(arr, 0, end);
    // Restore heap property for the reduced heap (size = end)
    heapify(arr, end, 0, cmp);
  }

  return arr; // sorted in ascending order
}
// Example 1 – sorting numbers (default comparator)
const numbers = [9, 4, 1, 7, 3, 6, 2];
heapSort(numbers);
console.log(numbers); // [1, 2, 3, 4, 6, 7, 9]

// Example 2 – sorting strings
const words = ['pear', 'apple', 'orange', 'banana'];
heapSort(words);
console.log(words); // ['apple', 'banana', 'orange', 'pear']

// Example 3 – sorting objects with a custom comparator
type Person = { name: string; age: number };
const people: Person[] = [
  { name: 'Alice', age: 32 },
  { name: 'Bob', age: 24 },
  { name: 'Charlie', age: 28 },
];

// Sort by age descending (oldest first)
heapSort(people, (a, b) => a.age > b.age);
console.log(people);
// [
//   { name: 'Alice', age: 32 },
//   { name: 'Charlie', age: 28 },
//   { name: 'Bob', age: 24 }
// ]
function heapSort<T>(arr: T[], compare?: (a: T, b: T) => boolean): T[] {
  const defaultCmp = (a: T, b: T) => (a as any) > (b as any);
  const cmp = compare ?? defaultCmp;

  // build max‑heap
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    heapify(arr, arr.length, i, cmp);
  }

  // extract elements
  for (let end = arr.length - 1; end > 0; end--) {
    swap(arr, 0, end);
    heapify(arr, end, 0, cmp);
  }
  return arr;
}
