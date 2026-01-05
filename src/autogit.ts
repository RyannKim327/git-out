/**
 * Fibonacci Search
 *
 * @param arr   Sorted array (ascending order) to search in.
 * @param key   Value to find.
 * @returns     Index of `key` in `arr` or -1 if not found.
 *
 * The function works for any type that can be compared with <, >, ===.
 * For custom objects you can pass a comparator function.
 */
export function fibonacciSearch<T>(
  arr: readonly T[],
  key: T,
  compareFn?: (a: T, b: T) => number
): number {
  // ---------- 1️⃣  Helper: default comparator ----------
  const cmp = compareFn
    ? compareFn
    : (a: T, b: T) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      };

  const n = arr.length;
  if (n === 0) return -1;

  // ---------- 2️⃣  Generate the smallest Fibonacci number >= n ----------
  // fibM  = F(k)   (the smallest Fibonacci number >= n)
  // fibMm1 = F(k-1)
  // fibMm2 = F(k-2)
  let fibM = 0;      // F(k)
  let fibMm1 = 1;    // F(k-1)
  let fibMm2 = 0;    // F(k-2)

  // Build up fibM until it is >= n
  while (fibM < n) {
    const next = fibMm1 + fibM; // F(k+1) = F(k) + F(k-1)
    fibMm2 = fibMm1;
    fibMm1 = fibM;
    fibM = next;
  }

  // ---------- 3️⃣  offset marks the eliminated front part of the array ----------
  let offset = -1; // initially, no elements are eliminated

  // ---------- 4️⃣  Main loop ----------
  while (fibM > 1) {
    // Calculate the index to be probed.
    // min(offset + fibMm2, n-1) ensures we don't go out of bounds.
    const i = Math.min(offset + fibMm2, n - 1);

    const comparison = cmp(arr[i], key);

    if (comparison < 0) {
      // key is greater → move three Fibonacci numbers down
      // Eliminate subarray from offset to i
      fibM = fibMm1;      // F(k) = F(k-1)
      fibMm1 = fibMm2;    // F(k-1) = F(k-2)
      fibMm2 = fibM - fibMm1; // F(k-2) = F(k) - F(k-1)
      offset = i;         // new offset
    } else if (comparison > 0) {
      // key is smaller → move two Fibonacci numbers down
      fibM = fibMm2;      // F(k) = F(k-2)
      fibMm1 = fibMm1 - fibMm2; // F(k-1) = F(k-1) - F(k-2)
      fibMm2 = fibM - fibMm1;   // F(k-2) = F(k) - F(k-1)
      // offset stays the same
    } else {
      // Found!
      return i;
    }
  }

  // ---------- 5️⃣  One element left (fibM == 1) ----------
  // Check the last possible element
  if (fibMm1 && offset + 1 < n && cmp(arr[offset + 1], key) === 0) {
    return offset + 1;
  }

  // Not found
  return -1;
}
// Example 1 – primitive numbers
import { fibonacciSearch } from "./fibonacciSearch";

const nums = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
console.log(fibonacciSearch(nums, 7));   // → 3
console.log(fibonacciSearch(nums, 2));   // → -1

// Example 2 – strings (lexicographic order)
const words = ["apple", "banana", "cherry", "date", "fig", "grape"];
console.log(fibonacciSearch(words, "date")); // → 3

// Example 3 – custom objects with a comparator
type Person = { id: number; name: string };
const people: Person[] = [
  { id: 1, name: "Ada" },
  { id: 3, name: "Bob" },
  { id: 5, name: "Cleo" },
  { id: 7, name: "Dana" },
];

const compareById = (a: Person, b: Person) => a.id - b.id;

console.log(fibonacciSearch(people, { id: 5, name: "" }, compareById)); // → 2
// fibonacciSearch.test.ts
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
    expect(fibonacciSearch(arr, 9)).toBe(-1);
  });

  test("works with strings", () => {
    const words = ["ant", "bee", "cat", "dog"];
    expect(fibonacciSearch(words, "cat")).toBe(2);
    expect(fibonacciSearch(words, "zebra")).toBe(-1);
  });

  test("custom comparator", () => {
    type Item = { key: number };
    const items: Item[] = [{ key: 10 }, { key: 20 }, { key: 30 }];
    const cmp = (a: Item, b: Item) => a.key - b.key;
    expect(fibonacciSearch(items, { key: 20 }, cmp)).toBe(1);
  });
});
export function fibonacciSearch<T>(arr: readonly T[], key: T, compareFn?: (a: T, b: T) => number): number {
  const cmp = compareFn ?? ((a: T, b: T) => (a < b ? -1 : a > b ? 1 : 0));
  const n = arr.length;
  if (n === 0) return -1;

  // Build smallest Fibonacci >= n
  let fibM = 0, fibMm1 = 1, fibMm2 = 0;
  while (fibM < n) {
    const next = fibMm1 + fibM;
    fibMm2 = fibMm1;
    fibMm1 = fibM;
    fibM = next;
  }

  let offset = -1;
  while (fibM > 1) {
    const i = Math.min(offset + fibMm2, n - 1);
    const c = cmp(arr[i], key);
    if (c < 0) {
      fibM = fibMm1;
      fibMm1 = fibMm2;
      fibMm2 = fibM - fibMm1;
      offset = i;
    } else if (c > 0) {
      fibM = fibMm2;
      fibMm1 = fibMm1 - fibMm2;
      fibMm2 = fibM - fibMm1;
    } else {
      return i;
    }
  }

  if (fibMm1 && offset + 1 < n && cmp(arr[offset + 1], key) === 0) return offset + 1;
  return -1;
}
