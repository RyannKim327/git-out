/**
 * Shell sort – a simple in‑place comparison sort.
 *
 * @template T          – The element type stored in the array.
 * @param array         – Array to be sorted (mutated).
 * @param compareFn     – Optional comparison function.  
 *                        Should return a negative number if a < b,
 *                        zero if a == b, and a positive number if a > b.
 *                        Default is numeric ascending order.
 *
 * @returns The same array, now sorted.
 *
 * Example:
 *   const nums = [23, 12, 1, 2, 8, 15];
 *   shellSort(nums);                 // → [1,2,8,12,15,23]
 *
 *   const words = ["pear","apple","orange"];
 *   shellSort(words, (a,b) => a.localeCompare(b));  // → ["apple","orange","pear"]
 */
export function shellSort<T>(
  array: T[],
  compareFn: (a: T, b: T) => number = (a, b) => (a as unknown as number) - (b as unknown as number)
): T[] {
  const n = array.length;
  // Basic Shell sequence: n/2, n/4, ..., 1
  // (You could use a more sophisticated sequence, e.g. Hibbard, Pratt, or Knuth.)
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // Perform a gapped insertion sort for this gap size
    for (let i = gap; i < n; i++) {
      const current = array[i];
      let j = i;

      // Shift earlier gap‑separated elements up until the correct location for current
      while (j >= gap && compareFn(array[j - gap], current) > 0) {
        array[j] = array[j - gap];
        j -= gap;
      }
      array[j] = current;
    }
  }
  return array;
}
import { shellSort } from "./shellSort";

const planets = [
  { name: "Jupiter", radius: 69911 },
  { name: "Earth", radius: 6371 },
  { name: "Mars", radius: 3389 },
  { name: "Saturn", radius: 58232 },
];

shellSort(planets, (a, b) => a.radius - b.radius);
console.log(planets);
// → [
//      { name: "Mars", radius: 3389 },
//      { name: "Earth", radius: 6371 },
//      { name: "Saturn", radius: 58232 },
//      { name: "Jupiter", radius: 69911 }
//    ]
