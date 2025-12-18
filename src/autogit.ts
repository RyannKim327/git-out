/**
 * Fibonacci Search
 *
 * @param arr   Sorted array (ascending) to search in.
 * @param key   Value to find.
 * @returns     Index of `key` in `arr` or -1 if not present.
 *
 * The function works for any type that can be compared with <, >, ===.
 * For custom objects you can pass a comparator function.
 */
export function fibonacciSearch<T>(
  arr: readonly T[],
  key: T,
  compareFn?: (a: T, b: T) => number
): number {
  // ---------- Helper: default comparator ----------
  const cmp = compareFn
    ? compareFn
    : (a: T, b: T) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      };

  const n = arr.length;
  if (n === 0) return -1;

  // ---------- 1️⃣ Build the smallest Fibonacci number >= n ----------
  let fibMm2 = 0; // (m-2)'th Fibonacci No.
  let fibMm1 = 1; // (m-1)'th Fibonacci No.
  let fibM = fibMm2 + fibMm1; // m'th Fibonacci

  while (fibM < n) {
    fibMm2 = fibMm1;
    fibMm1 = fibM;
    fibM = fibMm2 + fibMm1;
  }

  // ---------- 2️⃣ offset marks the eliminated front part ----------
  let offset = -1;

  // ---------- 3️⃣ Main loop ----------
  while (fibM > 1) {
    // Check if fibMm2 is a valid location
    const i = Math.min(offset + fibMm2, n - 1);
    const comparison = cmp(arr[i], key);

    if (comparison < 0) {
      // Move three Fibonacci numbers down
      fibM = fibMm1;
      fibMm1 = fibMm2;
      fibMm2 = fibM - fibMm1;
      offset = i; // key is greater, cut the subarray from offset to i
    } else if (comparison > 0) {
      // Move two Fibonacci numbers down
      fibM = fibMm2;
      fibMm1 = fibMm1 - fibMm2;
      fibMm2 = fibM - fibMm1;
      // offset stays the same
    } else {
      // Found!
      return i;
    }
  }

  // ---------- 4️⃣ One element left (fibMm1 == 1) ----------
  if (fibMm1 && offset + 1 < n && cmp(arr[offset + 1], key) === 0) {
    return offset + 1;
  }

  // ---------- 5️⃣ Not found ----------
  return -1;
}
import { fibonacciSearch } from "./fibonacciSearch";

// Simple numeric array
const nums = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
console.log(fibonacciSearch(nums, 7));   // → 3
console.log(fibonacciSearch(nums, 2));   // → -1

// Using a custom comparator (e.g., objects sorted by `id`)
type Person = { id: number; name: string };
const people: Person[] = [
  { id: 10, name: "Alice" },
  { id: 20, name: "Bob" },
  { id: 30, name: "Carol" },
  { id: 40, name: "Dave" },
];

const cmpById = (a: Person, b: Person) => a.id - b.id;

const target = { id: 30, name: "" }; // name is irrelevant for search
console.log(fibonacciSearch(people, target, cmpById)); // → 2
import { fibonacciSearch } from "./fibonacciSearch";

describe("fibonacciSearch", () => {
  test("finds existing numbers", () => {
    const arr = [2, 4, 6, 8, 10, 12, 14];
    expect(fibonacciSearch(arr, 8)).toBe(3);
    expect(fibonacciSearch(arr, 2)).toBe(0);
    expect(fibonacciSearch(arr, 14)).toBe(6);
  });

  test("returns -1 for missing values", () => {
    const arr = [1, 3, 5, 7];
    expect(fibonacciSearch(arr, 0)).toBe(-1);
    expect(fibonacciSearch(arr, 4)).toBe(-1);
    expect(fibonacciSearch(arr, 8)).toBe(-1);
  });

  test("works with custom comparator", () => {
    type Item = { key: string };
    const data: Item[] = [{ key: "a" }, { key: "c" }, { key: "e" }, { key: "g" }];
    const cmp = (a: Item, b: Item) => a.key.localeCompare(b.key);
    expect(fibonacciSearch(data, { key: "e" }, cmp)).toBe(2);
    expect(fibonacciSearch(data, { key: "b" }, cmp)).toBe(-1);
  });

  test("handles empty array", () => {
    expect(fibonacciSearch([], 5)).toBe(-1);
  });
});
// Import the function
import { fibonacciSearch } from "./fibonacciSearch";

// Search a sorted numeric array
const idx = fibonacciSearch([10, 20, 30, 40, 50], 30); // → 2
