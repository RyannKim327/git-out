/**
 * Generic QuickSort that returns a new sorted array.
 *
 * @param arr        The array to sort.
 * @param compareFn  Optional comparator (a, b) => number.
 *                   Should return <0 if a < b, 0 if equal, >0 if a > b.
 * @returns          A new array containing the sorted elements.
 */
export function quickSort<T>(
  arr: readonly T[],
  compareFn: (a: T, b: T) => number = defaultCompare
): T[] {
  // Base case: arrays of length 0 or 1 are already sorted.
  if (arr.length <= 1) {
    return Array.from(arr);
  }

  // Choose a pivot – here we pick the middle element for simplicity.
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = arr[pivotIndex];

  // Partition the rest of the array.
  const left: T[] = [];
  const right: T[] = [];

  for (let i = 0; i < arr.length; i++) {
    if (i === pivotIndex) continue; // skip the pivot itself

    const cmp = compareFn(arr[i], pivot);
    if (cmp <= 0) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  // Recursively sort sub‑arrays and concatenate.
  return [...quickSort(left, compareFn), pivot, ...quickSort(right, compareFn)];
}

/**
 * Default comparator that works for numbers and strings.
 */
function defaultCompare<T>(a: T, b: T): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}
// Numbers
const nums = [9, -3, 5, 2, 6, 8, -6, 1, 3];
const sortedNums = quickSort(nums);
console.log(sortedNums); // [-6, -3, 1, 2, 3, 5, 6, 8, 9]

// Strings
const words = ['pear', 'apple', 'orange', 'banana'];
const sortedWords = quickSort(words);
console.log(sortedWords); // ['apple', 'banana', 'orange', 'pear']

// Custom objects – supply a comparator
type Person = { name: string; age: number };
const people: Person[] = [
  { name: 'Alice', age: 32 },
  { name: 'Bob', age: 24 },
  { name: 'Carol', age: 29 },
];

const sortedByAge = quickSort(people, (a, b) => a.age - b.age);
console.log(sortedByAge);
// [{name:'Bob',age:24}, {name:'Carol',age:29}, {name:'Alice',age:32}]
/**
 * In‑place QuickSort.
 *
 * @param arr        The array to sort (will be mutated).
 * @param compareFn  Optional comparator.
 * @param low        Starting index (default 0).
 * @param high       Ending index (default arr.length - 1).
 */
export function quickSortInPlace<T>(
  arr: T[],
  compareFn: (a: T, b: T) => number = defaultCompare,
  low: number = 0,
  high: number = arr.length - 1
): void {
  if (low < high) {
    const pivotIdx = partition(arr, compareFn, low, high);
    quickSortInPlace(arr, compareFn, low, pivotIdx - 1);
    quickSortInPlace(arr, compareFn, pivotIdx + 1, high);
  }
}

/**
 * Partition routine – moves elements < pivot to the left,
 * > pivot to the right, and returns the final pivot index.
 */
function partition<T>(
  arr: T[],
  compareFn: (a: T, b: T) => number,
  low: number,
  high: number
): number {
  // Choose the last element as pivot (simple, but you can randomize)
  const pivot = arr[high];
  let i = low - 1; // index of smaller element

  for (let j = low; j < high; j++) {
    if (compareFn(arr[j], pivot) <= 0) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
    }
  }

  // Place pivot after the last smaller element
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}
const numbers = [33, 10, 55, 71, 29, 3];
quickSortInPlace(numbers);
console.log(numbers); // [3, 10, 29, 33, 55, 71]

// With a custom comparator (e.g., descending order)
quickSortInPlace(numbers, (a, b) => b - a);
console.log(numbers); // [71, 55, 33, 29, 10, 3]
function randomPivotPartition<T>(
  arr: T[],
  compareFn: (a: T, b: T) => number,
  low: number,
  high: number
): number {
  const randIdx = low + Math.floor(Math.random() * (high - low + 1));
  [arr[randIdx], arr[high]] = [arr[high], arr[randIdx]]; // swap with last
  return partition(arr, compareFn, low, high);
}

// Then call quickSortInPlace using randomPivotPartition instead of partition.
// quicksort.ts --------------------------------------------------------------

export function quickSort<T>(
  arr: readonly T[],
  compareFn: (a: T, b: T) => number = defaultCompare
): T[] {
  if (arr.length <= 1) return Array.from(arr);

  const pivotIdx = Math.floor(arr.length / 2);
  const pivot = arr[pivotIdx];
  const left: T[] = [];
  const right: T[] = [];

  for (let i = 0; i < arr.length; i++) {
    if (i === pivotIdx) continue;
    const cmp = compareFn(arr[i], pivot);
    if (cmp <= 0) left.push(arr[i]);
    else right.push(arr[i]);
  }

  return [...quickSort(left, compareFn), pivot, ...quickSort(right, compareFn)];
}

export function quickSortInPlace<T>(
  arr: T[],
  compareFn: (a: T, b: T) => number = defaultCompare,
  low: number = 0,
  high: number = arr.length - 1
): void {
  if (low < high) {
    const pi = partition(arr, compareFn, low, high);
    quickSortInPlace(arr, compareFn, low, pi - 1);
    quickSortInPlace(arr, compareFn, pi + 1, high);
  }
}

/* ---------- helpers ---------- */

function partition<T>(arr: T[], compareFn: (a: T, b: T) => number, low: number, high: number): number {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (compareFn(arr[j], pivot) <= 0) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

function defaultCompare<T>(a: T, b: T): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

// ---------------------------------------------------------------------------

// demo.ts (or just paste into a REPL)

import { quickSort, quickSortInPlace } from './quicksort';

const nums = [5, 2, 9, 1, 5, 6];
console.log('functional:', quickSort(nums)); // [1,2,5,5,6,9]

const mutable = [...nums];
quickSortInPlace(mutable);
console.log('in‑place:', mutable); // [1,2,5,5,6,9]
