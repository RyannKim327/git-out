/**
 * Generic shell sort – works on any array whose elements can be compared by a
 * key that returns a value implementing `<` / `>`.
 *
 * @param arr   The array to sort (mutated in‑place)
 * @param key   (optional) a function that extracts the sort key from each element.
 *              For plain numbers you can leave this undefined.
 *
 * @returns The sorted array (same reference as the input).
 */
export function shellSort<T>(arr: T[], key?: (x: T) => number | string): T[] {
  const n = arr.length;
  // Default key is identity for numbers, fallback to string comparison.
  const keyFn = key ??
    ((x: T) => {
      const v = (x as unknown as number);
      return typeof v === "number" ? v : String(v);
    });

  // Start with a gap that is roughly n/2, then reduce it by a factor of 1.3
  // (Knuth's sequence: h = 3*h + 1)
  let gap = 1;
  while (gap < n / 3) gap = 3 * gap + 1; // largest h < n/3

  while (gap >= 1) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;
      while (
        j >= gap &&
        (keyFn(temp) < keyFn(arr[j - gap]))
      ) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = temp;
    }
    gap = Math.floor((gap - 1) / 3); // move to previous gap in Knuth sequence
  }
  return arr;
}
import { shellSort } from "./shellSort";

const data = [23, 12, 1, 8, 34, 54, 2, 3];
shellSort(data);
console.log(data); // [1, 2, 3, 8, 12, 23, 34, 54]
const users = [
  { name: "Ada", age: 45 },
  { name: "Bob", age: 30 },
  { name: "Cleo", age: 37 }
];

shellSort(users, u => u.age);
// users now sorted by age
