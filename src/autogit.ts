/**
 * Heap-Sort (ascending order) for any array whose elements are comparable.
 * Comparison is done via the supplied `compare` function, which should return
 *   negative if a < b
 *   zero     if a == b
 *   positive if a > b
 *
 * If you simply want to sort numbers or strings you can call the convenience
 * helpers `heapSortNumbers` or `heapSortStrings` below.
 */
export function heapSort<T>(
  arr: T[],
  compare: (a: T, b: T) => number
): T[] {
  const n = arr.length;

  /* ---------- 1.  Build max-heap ---------- */
  // Start from last parent node and sift-down.
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    siftDown(arr, i, n, compare);
  }

  /* ---------- 2.  Extract elements ---------- */
  for (let end = n - 1; end > 0; end--) {
    // Move current max (root) to the final position
    [arr[0], arr[end]] = [arr[end], arr[0]];
    // Restore heap property on the remaining `end` elements
    siftDown(arr, 0, end, compare);
  }

  return arr;
}

/**
 * Helper: sift-down / heapify for max-heap semantics.
 * `heapSize` is the logical size of the heap (may be < arr.length).
 */
function siftDown<T>(
  arr: T[],
  root: number,
  heapSize: number,
  compare: (a: T, b: T) => number
): void {
  while (true) {
    let largest = root;
    const left  = 2 * root + 1;
    const right = 2 * root + 2;

    if (left  < heapSize && compare(arr[left],  arr[largest]) > 0) largest = left;
    if (right < heapSize && compare(arr[right], arr[largest]) > 0) largest = right;

    if (largest === root) break;

    [arr[root], arr[largest]] = [arr[largest], arr[root]];
    root = largest;
  }
}

/* ---------------- Convenience helpers ---------------- */

export function heapSortNumbers(arr: number[]): number[] {
  return heapSort(arr, (a, b) => a - b);
}

export function heapSortStrings(arr: string[]): string[] {
  return heapSort(arr, (a, b) => a.localeCompare(b));
}

/* ---------------- Quick sanity check ---------------- */
if (require.main === module) {
  const data = [23, 1, 42, 7, 0, -3, 5];
  console.log("original:", data);
  heapSortNumbers(data);
  console.log("sorted  :", data);
}
import { heapSort, heapSortNumbers } from "./heapSort";

// 1. Generic usage
const objs = [{ age: 30 }, { age: 20 }, { age: 25 }];
heapSort(objs, (a, b) => a.age - b.age);
console.log(objs);   // [ { age: 20 }, { age: 25 }, { age: 30 } ]

// 2. Numbers
const nums = [9, 4, 1, 7];
heapSortNumbers(nums);
console.log(nums);   // [1, 4, 7, 9]
