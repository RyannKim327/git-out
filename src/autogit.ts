/**
 * @fileoverview A TypeScript implementation of the Heap Sort algorithm.
 * Heap sort is a comparison-based sorting algorithm that uses a binary heap data structure.
 * It is an in-place algorithm and has a time complexity of O(n log n) in all cases (best, average, worst).
 */

/**
 * Interface for elements that can be compared.
 * If not provided, a default comparator for primitive types will be used.
 */
interface Sortable {
  // A generic type T that extends Sortable can be used,
  // or we can strictly define `T extends number | string` for default.
  // For maximum flexibility, the comparator handles the comparison logic.
}

/**
 * A type for the comparison function.
 * It should return:
 * - a negative number if a < b
 * - a positive number if a > b
 * - zero if a === b
 */
type Comparator<T> = (a: T, b: T) => number;

/**
 * Swaps two elements in an array.
 * @param arr The array to modify.
 * @param i Index of the first element.
 * @param j Index of the second element.
 */
function swap<T>(arr: T[], i: number, j: number): void {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

/**
 * The main function to heapify a subtree rooted with node `i` which is an index
 * in `arr[]`. `n` is size of heap.
 * This function ensures that the subtree at `i` satisfies the max-heap property.
 *
 * @param arr The array representing the heap.
 * @param n The size of the heap (the effective end of the array to consider).
 * @param i The root index of the subtree to heapify.
 * @param comparator The function to compare two elements.
 */
function heapify<T>(arr: T[], n: number, i: number, comparator: Comparator<T>): void {
  let largest = i; // Initialize largest as root
  const left = 2 * i + 1; // left child = 2*i + 1
  const right = 2 * i + 2; // right child = 2*i + 2

  // If left child is larger than root
  if (left < n && comparator(arr[left], arr[largest]) > 0) {
    largest = left;
  }

  // If right child is larger than largest so far
  if (right < n && comparator(arr[right], arr[largest]) > 0) {
    largest = right;
  }

  // If largest is not root
  if (largest !== i) {
    swap(arr, i, largest);
    // Recursively heapify the affected sub-tree
    heapify(arr, n, largest, comparator);
  }
}

/**
 * Sorts an array using the Heap Sort algorithm.
 * This function sorts the array in-place.
 *
 * @param arr The array to be sorted.
 * @param comparator An optional comparison function. If not provided,
 *                   a default comparator for numbers/strings will be used
 *                   (ascending order).
 * @returns The sorted array (same instance as input `arr`).
 */
function heapSort<T>(arr: T[], comparator?: Comparator<T>): T[] {
  const n = arr.length;

  // --- Default Comparator ---
  // If no comparator is provided, use a default one for primitive types.
  const activeComparator: Comparator<T> = comparator || ((a, b) => {
    if (typeof a === 'number' && typeof b === 'number') {
      return a - b;
    }
    if (typeof a === 'string' && typeof b === 'string') {
      return a.localeCompare(b);
    }
    // Fallback for non-comparable types, might throw or return arbitrary.
    // In a real-world scenario, you'd want to enforce `T extends number | string`
    // or always require a comparator for complex types.
    console.warn("No comparator provided for non-numeric/string types. Results may be unpredictable.");
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  // --- Build max heap ---
  // Start from the last non-leaf node and heapify downwards.
  // The last non-leaf node is at index floor(n/2) - 1.
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, activeComparator);
  }

  // --- Extract elements one by one from heap ---
  // After building the max heap, the largest element is at arr[0].
  // We swap it with the last element, reduce the heap size, and heapify again.
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    swap(arr, 0, i);

    // Call heapify on the reduced heap
    heapify(arr, i, 0, activeComparator);
  }

  return arr; // The array is sorted in-place.
}

// --- Usage Examples ---

console.log("--- Heap Sort Examples ---");

// Example 1: Sorting numbers in ascending order (default comparator)
let numbers1 = [4, 10, 3, 5, 1];
console.log("Original numbers (asc):", numbers1);
heapSort(numbers1);
console.log("Sorted numbers (asc):", numbers1); // Expected: [1, 3, 4, 5, 10]

let numbers2 = [99, -5, 0, 100, 7, -20];
console.log("Original numbers (asc):", numbers2);
heapSort(numbers2);
console.log("Sorted numbers (asc):", numbers2); // Expected: [-20, -5, 0, 7, 99, 100]

// Example 2: Sorting numbers in descending order (custom comparator)
let numbersDesc = [4, 10, 3, 5, 1];
console.log("Original numbers (desc):", numbersDesc);
heapSort(numbersDesc, (a, b) => b - a); // b - a for descending order
console.log("Sorted numbers (desc):", numbersDesc); // Expected: [10, 5, 4, 3, 1]

// Example 3: Sorting strings (default comparator uses localeCompare)
let strings1 = ["banana", "apple", "cherry", "date"];
console.log("Original strings (asc):", strings1);
heapSort(strings1);
console.log("Sorted strings (asc):", strings1); // Expected: ["apple", "banana", "cherry", "date"]

// Example 4: Sorting objects by a property
interface Person {
  name: string;
  age: number;
}

let people: Person[] = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 35 },
  { name: "David", age: 25 },
];

console.log("Original people (by age, asc):", JSON.stringify(people));
heapSort(people, (a, b) => a.age - b.age);
console.log("Sorted people (by age, asc):", JSON.stringify(people));
// Expected: [{"name":"Bob","age":25},{"name":"David","age":25},{"name":"Alice","age":30},{"name":"Charlie","age":35}]

console.log("Original people (by name, asc):", JSON.stringify(people));
heapSort(people, (a, b) => a.name.localeCompare(b.name));
console.log("Sorted people (by name, asc):", JSON.stringify(people));
// Expected: [{"name":"Alice","age":30},{"name":"Bob","age":25},{"name":"Charlie","age":35},{"name":"David","age":25}]
