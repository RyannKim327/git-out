// bubbleSort.ts

export type Comparator<T> = (a: T, b: T) => number;

/**
 * Sorts an array in place using the Bubble Sort algorithm.
 *
 * @param arr    — The array to sort. It will be modified directly.
 * @param cmp    — Optional comparator. If omitted, number comparison is used.
 *
 * @returns      — The sorted array (same reference as the input).
 */
export function bubbleSort<T>(arr: T[], cmp: Comparator<T> = defaultCmp): T[] {
  const n = arr.length;
  if (n < 2) return arr;          // nothing to do

  // Traditional outer loop: run n‑1 passes
  for (let pass = 0; pass < n - 1; pass++) {
    let swapped = false;

    // Inner loop: compare adjacent elements
    for (let i = 0; i < n - 1 - pass; i++) {
      if (cmp(arr[i], arr[i + 1]) > 0) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]; // swap
        swapped = true;
      }
    }

    // If we made no swaps this pass, the array is sorted
    if (!swapped) break;
  }

  return arr;
}

/** Default numeric comparator */
function defaultCmp(a: number, b: number): number {
  return a - b;
}
import { bubbleSort } from './bubbleSort';

const numbers = [5, 2, 9, 1, 5, 6];
bubbleSort(numbers);
console.log(numbers); // [1, 2, 5, 5, 6, 9]

// Custom comparator – strings, case‑insensitive
const strings = ['Banana', 'apple', 'Cherry'];
bubbleSort(strings, (a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
console.log(strings); // ['apple', 'Banana', 'Cherry']

// Sorting objects
interface Person { name: string; age: number }
const people: Person[] = [
  { name: 'Ali', age: 30 },
  { name: 'Beth', age: 24 },
  { name: 'Carl', age: 38 },
];
bubbleSort(people, (p, q) => p.age - q.age);
console.log(people);
// [{ name: 'Beth', age: 24 }, { name: 'Ali', age: 30 }, { name: 'Carl', age: 38 }]
