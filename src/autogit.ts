/**
 * Counting Sort (stable) for an array of numbers.
 *
 * @param arr   The input array to sort. It is **not** mutated; a new sorted array is returned.
 * @param min   (optional) Minimum possible value in the array.
 *              If omitted, the function scans the array once to find it.
 * @param max   (optional) Maximum possible value in the array.
 *              If omitted, the function scans the array once to find it.
 *
 * @returns A new array containing the sorted elements.
 *
 * @throws If `min` > `max` or if any element lies outside the supplied range.
 *
 * Complexity:
 *   Time   O(n + k)   where n = arr.length, k = max - min + 1 (range size)
 *   Space  O(k)       auxiliary count array + output array
 */
export function countingSort(
  arr: number[],
  min?: number,
  max?: number
): number[] {
  // -------------------------------------------------------------------------
  // 0️⃣  Edge cases
  // -------------------------------------------------------------------------
  if (arr.length === 0) return [];

  // -------------------------------------------------------------------------
  // 1️⃣  Determine the value range (min … max)
  // -------------------------------------------------------------------------
  let actualMin = min ?? arr[0];
  let actualMax = max ?? arr[0];

  if (min === undefined || max === undefined) {
    // Scan once to find real min / max if they were not supplied.
    for (const v of arr) {
      if (v < actualMin) actualMin = v;
      if (v > actualMax) actualMax = v;
    }
  }

  if (actualMin > actualMax) {
    throw new Error('Invalid range: min must be <= max');
  }

  const range = actualMax - actualMin + 1; // number of distinct possible values

  // -------------------------------------------------------------------------
  // 2️⃣  Count occurrences
  // -------------------------------------------------------------------------
  const count = new Array<number>(range).fill(0);
  for (const v of arr) {
    if (v < actualMin || v > actualMax) {
      throw new Error(`Value ${v} lies outside the declared range [${actualMin}, ${actualMax}]`);
    }
    count[v - actualMin]++; // shift by min to make index non‑negative
  }

  // -------------------------------------------------------------------------
  // 3️⃣  Transform counts to prefix sums (cumulative counts)
  //     After this step, count[i] tells us the **ending** index (exclusive)
  //     of value (i + actualMin) in the sorted output.
  // -------------------------------------------------------------------------
  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
  }

  // -------------------------------------------------------------------------
  // 4️⃣  Build the output array (stable!)
  // -------------------------------------------------------------------------
  const output = new Array<number>(arr.length);
  // Iterate **backwards** to keep the algorithm stable.
  for (let i = arr.length - 1; i >= 0; i--) {
    const v = arr[i];
    const idx = v - actualMin;
    const pos = --count[idx]; // decrement first, then use as zero‑based index
    output[pos] = v;
  }

  return output;
}
import { countingSort } from './countingSort';

// Simple positive numbers
const a = [4, 2, 2, 8, 3, 3, 1];
console.log(countingSort(a)); // → [1, 2, 2, 3, 3, 4, 8]

// Providing the range explicitly (faster for large arrays)
const b = [10, -5, 0, 7, -2];
console.log(countingSort(b, -5, 10)); // → [-5, -2, 0, 7, 10]

// Large random array (demonstrates linear performance)
const large = Array.from({ length: 1_000_000 }, () => Math.floor(Math.random() * 1000));
console.time('countingSort');
const sorted = countingSort(large, 0, 999);
console.timeEnd('countingSort'); // ~ O(n) – should be well under a second

// Verify stability (using objects with a key that maps to a number)
type Item = { key: number; payload: string };
function countingSortObjects<T extends { key: number }>(arr: T[]): T[] {
  // Re‑use the same algorithm but sort by `item.key`
  const keys = arr.map(item => item.key);
  const sortedKeys = countingSort(keys);
  // Build a map from key → queue of original items (preserves order)
  const buckets = new Map<number, T[]>();
  for (const item of arr) {
    const list = buckets.get(item.key) ?? [];
    list.push(item);
    buckets.set(item.key, list);
  }
  // Pull items out in the order of sorted keys
  const result: T[] = [];
  for (const k of sortedKeys) {
    const list = buckets.get(k)!;
    result.push(list.shift()!);
  }
  return result;
}

const objs: Item[] = [
  { key: 2, payload: 'a' },
  { key: 1, payload: 'b' },
  { key: 2, payload: 'c' },
  { key: 1, payload: 'd' },
];
console.log(countingSortObjects(objs));
/*
  → [
       { key: 1, payload: 'b' },
       { key: 1, payload: 'd' },
       { key: 2, payload: 'a' },
       { key: 2, payload: 'c' }
     ]
  (order of equal keys preserved)
*/
const sorted = countingSort([4, 2, 8, 3, 1]); // → [1,2,3,4,8]
