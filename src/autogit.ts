// -------------------------------------------
//  heapSort.ts
// -------------------------------------------

/**
 * Heap sort – O(n log n) worst‑case, in‑place, stable‑not‑guaranteed.
 *
 * @param   array      The array to sort, mutated in‑place.
 * @param   cmp?       Optional comparator: (a, b) => number
 *                     should return <0 if a < b, 0 if a === b, >0 if a > b.
 *
 * @example
 * const nums = [3, 1, 4, 1, 5, 9, 2];
 * heapSort(nums);               // nums => [1,1,2,3,4,5,9]
 * heapSort(nums, (a, b) => b - a);  // descending order
 */
export function heapSort<T>(array: T[], cmp?: (a: T, b: T) => number): void {
  const compare = cmp ?? defaultCompare;

  /* ---------- 1. Build a max‑heap (or custom heap) ---------- */
  const heapSize = array.length;

  for (let i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
    siftDown(i, heapSize);
  }

  /* ---------- 2. Repeatedly extract max (or min) ---------- */
  for (let i = heapSize - 1; i > 0; i--) {
    // Grab the root (largest element) and put it at the end
    swap(array, 0, i);
    // Restore heap property on the reduced heap
    siftDown(0, i);
  }

  /* ---------- Helper scopes ---------- */
  function siftDown(start: number, end: number): void {
    let root = start;

    while (true) {
      const left = 2 * root + 1;
      if (left >= end) break; // no children

      const right = left + 1;
      let candidate = left;

      // Select the bigger child (or smaller if comparator flipped)
      if (right < end && compare(array[right], array[left]) > 0) {
        candidate = right;
      }

      // If root already holds the biggest, we're done
      if (compare(array[root], array[candidate]) >= 0) break;

      // Swap root with the chosen child and continue
      swap(array, root, candidate);
      root = candidate;
    }
  }

  function swap(arr: T[], i: number, j: number): void {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
}

/* ------------------------------------------- */
/* Default comparator for `number`/`string` (ascending) */
function defaultCompare<T>(a: T, b: T): number {
  // If it's a number or behaves like a number
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }
  // Fallback to lexical comparison for strings and others that stringify nicely
  const sa = String(a);
  const sb = String(b);
  return sa < sb ? -1 : sa > sb ? 1 : 0;
}
import { heapSort } from "./heapSort";

const data = [8, 3, 5, 4, 7, 1, 2, 6];
heapSort(data);                // ascending
console.log(data);             // [1, 2, 3, 4, 5, 6, 7, 8]

heapSort(data, (a, b) => b - a); // descending
console.log(data);                    // [8, 7, 6, 5, 4, 3, 2, 1]
