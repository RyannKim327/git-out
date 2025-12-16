pos = low + ((key - arr[low]) * (high - low)) / (arr[high] - arr[low])
/**
 * Interpolation Search
 *
 * @param arr            Sorted array (ascending by default)
 * @param target         Value we are looking for
 * @param keyExtractor   (optional) function that extracts a numeric key from an element
 * @param compare        (optional) comparator for the keys (default: (a,b)=>a-b)
 * @param fromIndex      (optional) start index of the search range (inclusive)
 * @param toIndex        (optional) end index of the search range (inclusive)
 *
 * @returns index of the target if found, otherwise -1
 */
export function interpolationSearch<T>(
  arr: readonly T[],
  target: number,
  keyExtractor?: (elem: T) => number,
  compare?: (a: number, b: number) => number,
  fromIndex: number = 0,
  toIndex: number = arr.length - 1
): number {
  // ---- Helper defaults ----------------------------------------------------
  const getKey = keyExtractor ?? ((elem: any) => Number(elem));
  const cmp = compare ?? ((a: number, b: number) => a - b);

  // ---- Validate bounds ----------------------------------------------------
  if (arr.length === 0) return -1;
  if (fromIndex < 0) fromIndex = 0;
  if (toIndex >= arr.length) toIndex = arr.length - 1;
  if (fromIndex > toIndex) return -1;

  // ---- Main loop -----------------------------------------------------------
  let low = fromIndex;
  let high = toIndex;

  while (low <= high) {
    const lowKey = getKey(arr[low]);
    const highKey = getKey(arr[high]);

    // If the target is outside the current interval we can stop.
    if (cmp(target, lowKey) < 0 || cmp(target, highKey) > 0) break;

    // Avoid division by zero when all keys in the interval are equal.
    if (lowKey === highKey) {
      // Linear scan the remaining slice (could be just one element)
      for (let i = low; i <= high; i++) {
        if (cmp(getKey(arr[i]), target) === 0) return i;
      }
      return -1;
    }

    // ---- Interpolation formula (rounded to nearest integer) -------------
    const pos = low + Math.floor(
      ((target - lowKey) * (high - low)) / (highKey - lowKey)
    );

    // Safety: clamp pos inside the current window (floating‑point rounding can push it out)
    const probe = Math.max(low, Math.min(high, pos));
    const probeKey = getKey(arr[probe]);
    const cmpResult = cmp(probeKey, target);

    if (cmpResult === 0) {
      return probe; // found!
    } else if (cmpResult < 0) {
      low = probe + 1; // target is larger → search right side
    } else {
      high = probe - 1; // target is smaller → search left side
    }
  }

  // Not found
  return -1;
}
import { interpolationSearch } from "./interpolationSearch";

const data = [3, 7, 12, 19, 27, 34, 45, 58, 71, 84];
const idx = interpolationSearch(data, 34); // → 5
console.log(idx);
interface Person {
  id: number;
  name: string;
}

const people: Person[] = [
  { id: 101, name: "Alice" },
  { id: 115, name: "Bob" },
  { id: 130, name: "Carol" },
  { id: 147, name: "Dave" },
  { id: 162, name: "Eve" },
];

// Search by `id`
const pos = interpolationSearch(
  people,
  147,
  (p) => p.id // keyExtractor
);
console.log(pos); // → 3
console.log(people[pos]); // { id: 147, name: "Dave" }
const descending = [100, 80, 60, 40, 20, 0];
const target = 40;

const idxDesc = interpolationSearch(
  descending,
  target,
  undefined, // default keyExtractor (identity)
  (a, b) => b - a // comparator for descending order
);
console.log(idxDesc); // → 3
const nums = [5, 10, 15, 20, 25, 30, 35, 40];
const subIdx = interpolationSearch(nums, 25, undefined, undefined, 2, 5);
console.log(subIdx); // → 4 (global index)
import { interpolationSearch } from "./interpolationSearch";

describe("interpolationSearch", () => {
  test("finds existing number", () => {
    const arr = [1, 3, 5, 7, 9, 11];
    expect(interpolationSearch(arr, 7)).toBe(3);
  });

  test("returns -1 for missing value", () => {
    const arr = [2, 4, 6, 8, 10];
    expect(interpolationSearch(arr, 5)).toBe(-1);
  });

  test("works with objects", () => {
    const data = [{ id: 10 }, { id: 20 }, { id: 30 }];
    const idx = interpolationSearch(data, 20, (o) => o.id);
    expect(idx).toBe(1);
  });

  test("descending order", () => {
    const arr = [100, 80, 60, 40, 20];
    const idx = interpolationSearch(arr, 60, undefined, (a, b) => b - a);
    expect(idx).toBe(2);
  });

  test("sub‑range search", () => {
    const arr = [5, 10, 15, 20, 25, 30];
    const idx = interpolationSearch(arr, 20, undefined, undefined, 2, 4);
    expect(idx).toBe(3);
  });
});
export function interpolationSearch<T>(
  arr: readonly T[],
  target: number,
  keyExtractor?: (elem: T) => number,
  compare?: (a: number, b: number) => number,
  fromIndex: number = 0,
  toIndex: number = arr.length - 1
): number {
  const getKey = keyExtractor ?? ((e: any) => Number(e));
  const cmp = compare ?? ((a, b) => a - b);

  if (arr.length === 0) return -1;
  if (fromIndex < 0) fromIndex = 0;
  if (toIndex >= arr.length) toIndex = arr.length - 1;
  if (fromIndex > toIndex) return -1;

  let low = fromIndex;
  let high = toIndex;

  while (low <= high) {
    const lowKey = getKey(arr[low]);
    const highKey = getKey(arr[high]);

    if (cmp(target, lowKey) < 0 || cmp(target, highKey) > 0) break;

    if (lowKey === highKey) {
      for (let i = low; i <= high; i++) {
        if (cmp(getKey(arr[i]), target) === 0) return i;
      }
      return -1;
    }

    const pos = low + Math.floor(((target - lowKey) * (high - low)) / (highKey - lowKey));
    const probe = Math.max(low, Math.min(high, pos));
    const probeKey = getKey(arr[probe]);
    const diff = cmp(probeKey, target);

    if (diff === 0) return probe;
    if (diff < 0) low = probe + 1;
    else high = probe - 1;
  }

  return -1;
}
