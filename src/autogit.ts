/**
 * QuickSort for an array of numbers.
 * Returns a **new** sorted array (does not mutate the input).
 */
export function quickSort(arr: number[]): number[] {
  // Base case – arrays with 0 or 1 element are already sorted
  if (arr.length <= 1) {
    return arr.slice(); // copy to keep the function pure
  }

  // 1️⃣ Choose a pivot – here we simply take the last element
  const pivot = arr[arr.length - 1];

  // 2️⃣ Partition
  const left: number[] = [];
  const right: number[] = [];

  for (let i = 0; i < arr.length - 1; i++) {
    const cur = arr[i];
    if (cur <= pivot) {
      left.push(cur);
    } else {
      right.push(cur);
    }
  }

  // 3️⃣ Recursively sort sub‑arrays and concatenate
  return [...quickSort(left), pivot, ...quickSort(right)];
}
const unsorted = [9, -3, 5, 2, 6, 8, -6, 1, 3];
const sorted = quickSort(unsorted);
console.log(sorted); // [-6, -3, 1, 2, 3, 5, 6, 8, 9]
type Comparator<T> = (a: T, b: T) => number;

/**
 * Generic quicksort.
 *
 * @param arr   The array to sort (will **not** be mutated)
 * @param cmp   Comparator returning:
 *                < 0 if a < b
 *                = 0 if a == b
 *                > 0 if a > b
 * @returns     A new sorted array
 */
export function quickSortGeneric<T>(arr: T[], cmp: Comparator<T>): T[] {
  if (arr.length <= 1) {
    return arr.slice();
  }

  // Random pivot to avoid pathological O(n²) cases
  const pivotIndex = Math.floor(Math.random() * arr.length);
  const pivot = arr[pivotIndex];

  const left: T[] = [];
  const right: T[] = [];

  // Partition (skip the pivot itself)
  for (let i = 0; i < arr.length; i++) {
    if (i === pivotIndex) continue;
    const cur = arr[i];
    if (cmp(cur, pivot) <= 0) {
      left.push(cur);
    } else {
      right.push(cur);
    }
  }

  // Recursively sort and concatenate
  return [
    ...quickSortGeneric(left, cmp),
    pivot,
    ...quickSortGeneric(right, cmp),
  ];
}
const nums = [4, 2, 7, 1, 3];
const sortedNums = quickSortGeneric(nums, (a, b) => a - b);
console.log(sortedNums); // [1, 2, 3, 4, 7]
interface Person {
  name: string;
  age: number;
}

const people: Person[] = [
  { name: "Alice", age: 32 },
  { name: "Bob",   age: 24 },
  { name: "Carol", age: 29 },
];

const sortedByAge = quickSortGeneric(people, (a, b) => a.age - b.age);
console.log(sortedByAge);
/*
[
  { name: "Bob",   age: 24 },
  { name: "Carol", age: 29 },
  { name: "Alice", age: 32 }
]
*/
const words = ["Banana", "apple", "Cherry", "date"];
const sortedWords = quickSortGeneric(words, (a, b) =>
  a.localeCompare(b, undefined, { sensitivity: "base" })
);
console.log(sortedWords); // ["apple", "Banana", "Cherry", "date"]
/**
 * In‑place quicksort (mutates the input array).
 *
 * @param arr   The array to sort
 * @param cmp   Comparator function
 * @param lo    Starting index (default 0)
 * @param hi    Ending index (default arr.length - 1)
 */
export function quickSortInPlace<T>(
  arr: T[],
  cmp: Comparator<T>,
  lo = 0,
  hi = arr.length - 1
): void {
  if (lo >= hi) return;

  // Partition using Lomuto scheme
  const pivotIdx = partition(arr, cmp, lo, hi);

  // Recursively sort the two halves
  quickSortInPlace(arr, cmp, lo, pivotIdx - 1);
  quickSortInPlace(arr, cmp, pivotIdx + 1, hi);
}

/** Helper: Lomuto partition */
function partition<T>(arr: T[], cmp: Comparator<T>, lo: number, hi: number): number {
  // Choose a random pivot and move it to the end
  const randIdx = lo + Math.floor(Math.random() * (hi - lo + 1));
  [arr[randIdx], arr[hi]] = [arr[hi], arr[randIdx]];
  const pivot = arr[hi];

  let i = lo; // place for the next "smaller-or-equal" element
  for (let j = lo; j < hi; j++) {
    if (cmp(arr[j], pivot) <= 0) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }
  // Put pivot into its final place
  [arr[i], arr[hi]] = [arr[hi], arr[i]];
  return i;
}
const data = [5, 3, 8, 4, 2];
quickSortInPlace(data, (a, b) => a - b);
console.log(data); // [2, 3, 4, 5, 8]
import { quickSortGeneric, quickSortInPlace } from "./quicksort";

// ---- Test 1: numbers (pure) ----
const nums = [10, -1, 5, 3, 8];
console.log("pure:", quickSortGeneric(nums, (a, b) => a - b));

// ---- Test 2: objects (pure) ----
type Item = { id: number; label: string };
const items: Item[] = [
  { id: 3, label: "c" },
  { id: 1, label: "a" },
  { id: 2, label: "b" },
];
console.log(
  "objects:",
  quickSortGeneric(items, (a, b) => a.id - b.id)
);

// ---- Test 3: in‑place ----
const mutable = [7, 2, 9, 4];
quickSortInPlace(mutable, (a, b) => a - b);
console.log("in‑place:", mutable);
