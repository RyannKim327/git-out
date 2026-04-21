/**
 * Shell sort – a simple, O(n²) algorithm that usually runs much faster
 * than insertion sort on realistically sized arrays.  
 * It sorts in‑place and returns the same array for convenience.
 *
 * @param  array  The array to sort.
 * @param  compare Optional compare function; defaults to numeric ascending.
 * @return The sorted array.
 */
export function shellSort<T>(
  array: T[],
  compare?: (a: T, b: T) => number
): T[] {
  // Fallback to numeric comparison if no function supplied.
  const cmp = compare ?? ((a: any, b: any) => a - b);

  // Start with a large gap, then reduce it.
  // A common strategy is h = (3^k - 1) / 2, but starting from size / 2 works well too.
  let gap = Math.floor(array.length / 2);

  while (gap > 0) {
    // Perform a "gapped" insertion sort for this gap.
    for (let i = gap; i < array.length; i++) {
      const temp = array[i];
      let j = i;

      // shift earlier gap-sorted elements up until the correct location
      // is found for temp.
      while (j >= gap && cmp(array[j - gap], temp) > 0) {
        array[j] = array[j - gap];
        j -= gap;
      }

      array[j] = temp;
    }

    // Reduce the gap for the next pass.
    gap = Math.floor(gap / 2);
  }

  return array;
}
import { shellSort } from "./shellSort";

const nums = [34, 8, 64, 51, 32, 21];
console.log(shellSort(nums)); // → [8, 21, 32, 34, 51, 64]
type Item = { name: string; value: number };

const items: Item[] = [
  { name: "apple",  value: 5 },
  { name: "banana", value: 2 },
  { name: "cherry", value: 7 },
];

shellSort(items, (a, b) => a.value - b.value);
console.log(items);
// → [
//     { name: "banana", value: 2 },
//     { name: "apple",  value: 5 },
//     { name: "cherry", value: 7 }
//   ]
