/**
 * Returns a negative number if a < b,
 * zero if a === b,
 * a positive number if a > b.
 *
 * By default it works for numbers and strings.
 * You can pass a custom comparator for complex objects.
 */
type Comparator<T> = (a: T, b: T) => number;

function defaultComparator<T>(a: T, b: T): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}
/**
 * Sorts `arr` in place using the quicksort algorithm.
 *
 * @param arr        The array to sort.
 * @param compare    Optional comparator; defaults to numeric/string order.
 * @param left       Left index of the sub‑array (internal use).
 * @param right      Right index of the sub‑array (internal use).
 */
export function quickSort<T>(
  arr: T[],
  compare: Comparator<T> = defaultComparator,
  left: number = 0,
  right: number = arr.length - 1
): void {
  // Base case – nothing to do
  if (left >= right) return;

  // Partition the sub‑array and get the pivot's final index
  const pivotIndex = partition(arr, compare, left, right);

  // Recursively sort the two halves
  quickSort(arr, compare, left, pivotIndex - 1);
  quickSort(arr, compare, pivotIndex + 1, right);
}

/**
 * Partition step – moves elements ≤ pivot to the left,
 * > pivot to the right, and returns the final pivot index.
 */
function partition<T>(
  arr: T[],
  compare: Comparator<T>,
  left: number,
  right: number
): number {
  // Choose the rightmost element as pivot (you can randomise here)
  const pivot = arr[right];
  let i = left - 1; // Index of the smaller element

  for (let j = left; j < right; j++) {
    if (compare(arr[j], pivot) <= 0) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
    }
  }

  // Place pivot after the last smaller element
  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
  return i + 1;
}
export function quickSortCopy<T>(
  source: T[],
  compare: Comparator<T> = defaultComparator
): T[] {
  const copy = [...source];          // shallow copy
  quickSort(copy, compare);          // reuse the in‑place implementation
  return copy;
}
import { quickSort, quickSortCopy } from "./quicksort";

const nums = [9, -3, 5, 2, 6, 8, -6, 1, 3];
quickSort(nums);               // mutates `nums`
console.log(nums); // [-6, -3, 1, 2, 3, 5, 6, 8, 9]

// Or a non‑mutating call:
const sorted = quickSortCopy([4, 2, 7, 1, 5]);
console.log(sorted); // [1, 2, 4, 5, 7]
const words = ["banana", "apple", "cherry", "date"];
quickSort(words);
console.log(words); // ["apple", "banana", "cherry", "date"]
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
quickSort(people, (a, b) => a.age - b.age);
console.log(people);
// → [{name:"Bob",age:24}, {name:"Carol",age:29}, {name:"Alice",age:32}]
// Random pivot selection
const randomIdx = left + Math.floor(Math.random() * (right - left + 1));
[arr[randomIdx], arr[right]] = [arr[right], arr[randomIdx]];
const pivot = arr[right];
// quicksort.ts
type Comparator<T> = (a: T, b: T) => number;

function defaultComparator<T>(a: T, b: T): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

export function quickSort<T>(
  arr: T[],
  compare: Comparator<T> = defaultComparator,
  left: number = 0,
  right: number = arr.length - 1
): void {
  if (left >= right) return;

  const pivotIndex = partition(arr, compare, left, right);
  quickSort(arr, compare, left, pivotIndex - 1);
  quickSort(arr, compare, pivotIndex + 1, right);
}

function partition<T>(
  arr: T[],
  compare: Comparator<T>,
  left: number,
  right: number
): number {
  // ---- Randomised pivot (optional) ----
  // const randIdx = left + Math.floor(Math.random() * (right - left + 1));
  // [arr[randIdx], arr[right]] = [arr[right], arr[randIdx]];
  // -------------------------------------

  const pivot = arr[right];
  let i = left - 1;

  for (let j = left; j < right; j++) {
    if (compare(arr[j], pivot) <= 0) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
  return i + 1;
}

/**
 * Returns a new sorted array, leaving the original untouched.
 */
export function quickSortCopy<T>(
  source: T[],
  compare: Comparator<T> = defaultComparator
): T[] {
  const copy = [...source];
  quickSort(copy, compare);
  return copy;
}
