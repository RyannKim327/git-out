/**
 * Interpolation Search
 *
 * @param arr   Sorted array (ascending) of numbers or objects.
 * @param target Value to find.
 * @param getKey Optional accessor that extracts a numeric key from an element.
 *               If omitted, the array is assumed to be `number[]`.
 * @param low   Optional start index (default 0).
 * @param high  Optional end index (default arr.length - 1).
 *
 * @returns Index of the target if found, otherwise -1.
 */
export function interpolationSearch<T = number>(
  arr: readonly T[],
  target: number,
  getKey?: (item: T) => number,
  low = 0,
  high = arr.length - 1
): number {
  // Helper to get the numeric key for an element.
  const key = getKey ?? ((x: unknown) => x as number);

  // Guard against empty array.
  if (arr.length === 0) return -1;

  // Ensure the search window is valid.
  while (low <= high && target >= key(arr[low]) && target <= key(arr[high])) {
    // If the values at the bounds are equal, we cannot compute a ratio.
    // In that case we fall back to a linear scan of the remaining slice.
    const lowKey = key(arr[low]);
    const highKey = key(arr[high]);

    if (lowKey === highKey) {
      // All elements in this range are the same.
      for (let i = low; i <= high; i++) {
        if (key(arr[i]) === target) return i;
      }
      return -1;
    }

    // Estimate the position using the interpolation formula.
    const pos = low + Math.floor(
      ((target - lowKey) * (high - low)) / (highKey - lowKey)
    );

    const posKey = key(arr[pos]);

    // Found!
    if (posKey === target) return pos;

    // Narrow the search interval.
    if (posKey < target) {
      low = pos + 1;
    } else {
      high = pos - 1;
    }
  }

  // Target not present.
  return -1;
}
import { interpolationSearch } from "./interpolationSearch";

const numbers = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const idx = interpolationSearch(numbers, 70); // → 6
console.log(idx);
interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 101, name: "Alice" },
  { id: 203, name: "Bob" },
  { id: 305, name: "Carol" },
  { id: 407, name: "Dave" },
  { id: 509, name: "Eve" },
];

// The array must be sorted by `id`.
const targetId = 305;
const idx = interpolationSearch(users, targetId, (u) => u.id);
console.log(idx, users[idx]); // → 2 { id: 305, name: "Carol" }
// Suppose we only want to search the slice [2, 5] of the numbers array.
const subIdx = interpolationSearch(numbers, 50, undefined, 2, 5); // → 4 (global index)
import { interpolationSearch } from "./interpolationSearch";

describe("interpolationSearch", () => {
  test("finds existing number", () => {
    const arr = [5, 10, 15, 20, 25, 30];
    expect(interpolationSearch(arr, 20)).toBe(3);
  });

  test("returns -1 for missing number", () => {
    const arr = [1, 2, 3, 4, 5];
    expect(interpolationSearch(arr, 99)).toBe(-1);
  });

  test("works with objects", () => {
    const data = [
      { id: 1, name: "a" },
      { id: 3, name: "b" },
      { id: 5, name: "c" },
    ];
    expect(interpolationSearch(data, 3, (x) => x.id)).toBe(1);
  });

  test("handles all equal elements", () => {
    const arr = [7, 7, 7, 7, 7];
    expect(interpolationSearch(arr, 7)).toBe(0); // first occurrence
    expect(interpolationSearch(arr, 8)).toBe(-1);
  });

  test("searches sub‑range correctly", () => {
    const arr = [10, 20, 30, 40, 50];
    expect(interpolationSearch(arr, 30, undefined, 2, 4)).toBe(2);
    expect(interpolationSearch(arr, 20, undefined, 2, 4)).toBe(-1);
  });
});
// interpolationSearch.ts
export function interpolationSearch<T = number>(
  arr: readonly T[],
  target: number,
  getKey?: (item: T) => number,
  low = 0,
  high = arr.length - 1
): number {
  const key = getKey ?? ((x: unknown) => x as number);
  if (arr.length === 0) return -1;

  while (low <= high && target >= key(arr[low]) && target <= key(arr[high])) {
    const lowKey = key(arr[low]);
    const highKey = key(arr[high]);

    if (lowKey === highKey) {
      for (let i = low; i <= high; i++) {
        if (key(arr[i]) === target) return i;
      }
      return -1;
    }

    const pos = low + Math.floor(((target - lowKey) * (high - low)) / (highKey - lowKey));
    const posKey = key(arr[pos]);

    if (posKey === target) return pos;
    if (posKey < target) low = pos + 1;
    else high = pos - 1;
  }

  return -1;
}
