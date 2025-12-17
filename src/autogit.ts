/**
 * Sorts a numeric array in ascending order using Bubble Sort.
 *
 * @param arr - The array to sort. The function mutates the original array.
 * @returns The same array reference, now sorted.
 *
 * Time‑complexity: O(n²) worst‑case, O(n) best‑case (already sorted with early‑exit).
 */
export function bubbleSort(arr: number[]): number[] {
  const n = arr.length;

  // Outer loop – each pass pushes the next largest element to its final spot.
  for (let i = 0; i < n - 1; i++) {
    // Track whether we made any swaps this pass.
    let swapped = false;

    // Inner loop – compare adjacent pairs up to the unsorted portion.
    // After i passes, the last i elements are already sorted, so we can stop at n‑i‑1.
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap using destructuring (ES6) – works in TS too.
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }

    // If no swaps happened, the array is already sorted → exit early.
    if (!swapped) break;
  }

  return arr;
}
import { bubbleSort } from "./bubbleSort";

const unsorted = [5, 2, 9, 1, 5, 6];
console.log(bubbleSort(unsorted)); // → [1, 2, 5, 5, 6, 9]
/**
 * Generic Bubble Sort.
 *
 * @param arr - The array to sort (mutated in‑place).
 * @param compare - Comparator that returns a negative number if a < b,
 *                  zero if a === b, and a positive number if a > b.
 * @returns The sorted array (same reference).
 */
export function bubbleSortGeneric<T>(
  arr: T[],
  compare: (a: T, b: T) => number = (a, b) => (a as any) - (b as any)
): T[] {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      if (compare(arr[j], arr[j + 1]) > 0) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }

    if (!swapped) break;
  }

  return arr;
}
// Sorting strings (lexicographically)
const words = ["banana", "apple", "cherry"];
bubbleSortGeneric(words, (a, b) => a.localeCompare(b));
console.log(words); // ["apple", "banana", "cherry"]

// Sorting objects by a numeric property
type Person = { name: string; age: number };
const people: Person[] = [
  { name: "Alice", age: 32 },
  { name: "Bob", age: 24 },
  { name: "Carol", age: 29 },
];

bubbleSortGeneric(people, (a, b) => a.age - b.age);
console.log(people);
// [{name:"Bob",age:24},{name:"Carol",age:29},{name:"Alice",age:32}]
// bubbleSort.ts
export function bubbleSort(arr: number[]): number[] {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}

export function bubbleSortGeneric<T>(
  arr: T[],
  compare: (a: T, b: T) => number = (a, b) => (a as any) - (b as any)
): T[] {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (compare(arr[j], arr[j + 1]) > 0) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}
