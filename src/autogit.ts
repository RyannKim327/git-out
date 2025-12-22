/**
 * Sorts an array in place using the QuickSort algorithm.
 *
 * @param arr        The array to sort (will be mutated).
 * @param compareFn  Optional comparator. Should return:
 *                    - a negative number if a < b
 *                    - zero if a == b
 *                    - a positive number if a > b
 *                  If omitted, the default < > operators are used (works for numbers & strings).
 * @returns The same array reference (now sorted).
 */
function quickSortInPlace<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[]
function quickSort<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
  const copy = arr.slice();          // shallow copy
  return quickSortInPlace(copy, compareFn);
}
function defaultCompare<T>(a: T, b: T): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}
function partition<T>(arr: T[], low: number, high: number, compare: (a: T, b: T) => number): number {
  // Randomly pick a pivot and move it to the end (high)
  const pivotIdx = low + Math.floor(Math.random() * (high - low + 1));
  [arr[pivotIdx], arr[high]] = [arr[high], arr[pivotIdx]];
  const pivot = arr[high];

  let i = low; // index of the smaller element
  for (let j = low; j < high; j++) {
    if (compare(arr[j], pivot) < 0) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }
  // Place pivot after the last smaller element
  [arr[i], arr[high]] = [arr[high], arr[i]];
  return i; // pivot's final position
}
function quickSortRecursive<T>(arr: T[], low: number, high: number, compare: (a: T, b: T) => number): void {
  if (low < high) {
    const pi = partition(arr, low, high, compare);
    quickSortRecursive(arr, low, pi - 1, compare);
    quickSortRecursive(arr, pi + 1, high, compare);
  }
}
function quickSortInPlace<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
  if (!Array.isArray(arr)) {
    throw new TypeError('First argument must be an array');
  }
  const compare = compareFn ?? defaultCompare;
  quickSortRecursive(arr, 0, arr.length - 1, compare);
  return arr;
}
function quickSort<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
  return quickSortInPlace(arr.slice(), compareFn);
}
// ---------- QuickSort.ts ----------
/**
 * Default comparator that works for numbers, strings, and any type that
 * implements the < and > operators.
 */
function defaultCompare<T>(a: T, b: T): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

/**
 * Lomuto partition with a random pivot.
 */
function partition<T>(
  arr: T[],
  low: number,
  high: number,
  compare: (a: T, b: T) => number
): number {
  // Random pivot
  const pivotIdx = low + Math.floor(Math.random() * (high - low + 1));
  [arr[pivotIdx], arr[high]] = [arr[high], arr[pivotIdx]];
  const pivot = arr[high];

  let i = low;
  for (let j = low; j < high; j++) {
    if (compare(arr[j], pivot) < 0) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }
  [arr[i], arr[high]] = [arr[high], arr[i]];
  return i;
}

/**
 * Recursive quicksort driver.
 */
function quickSortRecursive<T>(
  arr: T[],
  low: number,
  high: number,
  compare: (a: T, b: T) => number
): void {
  if (low < high) {
    const pi = partition(arr, low, high, compare);
    quickSortRecursive(arr, low, pi - 1, compare);
    quickSortRecursive(arr, pi + 1, high, compare);
  }
}

/**
 * In‑place quicksort. Mutates the supplied array.
 */
export function quickSortInPlace<T>(
  arr: T[],
  compareFn?: (a: T, b: T) => number
): T[] {
  if (!Array.isArray(arr)) {
    throw new TypeError('First argument must be an array');
  }
  const compare = compareFn ?? defaultCompare;
  quickSortRecursive(arr, 0, arr.length - 1, compare);
  return arr;
}

/**
 * Immutable version – returns a new sorted array.
 */
export function quickSort<T>(
  arr: T[],
  compareFn?: (a: T, b: T) => number
): T[] {
  return quickSortInPlace(arr.slice(), compareFn);
}
import { quickSort, quickSortInPlace } from './QuickSort';

const nums = [5, 2, 9, 1, 5, 6];
console.log('Immutable:', quickSort(nums)); // [1,2,5,5,6,9]
console.log('Original unchanged:', nums);   // still [5,2,9,1,5,6]

quickSortInPlace(nums);
console.log('In‑place mutated:', nums);     // [1,2,5,5,6,9]
const words = ['banana', 'apple', 'cherry'];
console.log(quickSort(words)); // ['apple','banana','cherry']
type Person = { name: string; age: number };

const people: Person[] = [
  { name: 'Alice', age: 32 },
  { name: 'Bob',   age: 24 },
  { name: 'Carol', age: 29 },
];

// Sort by age ascending
const byAge = (a: Person, b: Person) => a.age - b.age;

console.log(quickSort(people, byAge));
/*
[
  { name: 'Bob',   age: 24 },
  { name: 'Carol', age: 29 },
  { name: 'Alice', age: 32 }
]
*/
const descending = (a: number, b: number) => b - a;
console.log(quickSort([3, 1, 4, 1, 5, 9], descending)); // [9,5,4,3,1,1]
