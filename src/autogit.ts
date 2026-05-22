/**
 * Performs an in‑place Shell sort.
 * @param arr - Array of numbers (or any comparable type).
 * @param compareFn - Optional function to decide order.
 *                     It should return <0 if a < b, >0 if a > b.
 * @returns The same array sorted.
 */
export function shellSort<T>(
  arr: T[],
  compareFn: (a: T, b: T) => number = (a, b) => (a as any) - (b as any)
): T[] {
  const n = arr.length;
  // Start with a big gap, then reduce it.
  // The classic 1, 4, 10, 23… sequence (Knuth) works nicely.
  let gap = 1;
  while (gap < n / 3) {
    gap = 3 * gap + 1; // 1, 4, 10, 31, 94...
  }

  while (gap >= 1) {
    // For each element from index `gap` to end,
    // perform an insertion sort on elements that are `gap` apart.
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;
      while (j >= gap && compareFn(arr[j - gap], temp) > 0) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = temp;
    }
    gap = Math.floor(gap / 3); // shrink gap
  }

  return arr;
}
import { shellSort } from './shellSort';

const data = [23, 12, 1, 8, 34, 54, 2, 3];
console.log('Before:', data);
shellSort(data);
console.log('After:', data);   // [1, 2, 3, 8, 12, 23, 34, 54]
