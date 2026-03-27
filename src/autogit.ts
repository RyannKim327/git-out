// shellSort.ts

/**
 * Shell sort – an insertion‑sort based algorithm that improves on the
 * “gaps” of ordinary insertion sort using a diminishing sequence.
 *
 * @param arr The array to sort in place.  It must contain elements that
 *            can be compared with the `<` operator.
 * @returns The same array reference, now sorted.
 */
export function shellSort<T>(arr: T[]): T[] {
  const n = arr.length;
  // Standard Shell sequence: start with ~n/2, then halve until 1
  let gap = Math.floor(n / 2);

  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      // Perform a "gapped" insertion sort on the sub‑array
      const temp = arr[i];
      let j = i;

      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
      }

      arr[j] = temp;
    }

    gap = Math.floor(gap / 2);
  }

  return arr;
}
import { shellSort } from "./shellSort";

const unsorted = [23, 12, 1, 8, 33, -6, 10];
console.log("Before:", unsorted);

shellSort(unsorted);
console.log("After:", unsorted);
// → Before: [23, 12, 1, 8, 33, -6, 10]
//    After:  [-6, 1, 8, 10, 12, 23, 33]
