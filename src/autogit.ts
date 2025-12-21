/**
 * Counting sort for numbers (or objects that can be mapped to numbers).
 * Stable, non-destructive: returns a new array, original is untouched.
 *
 * @param arr          array to sort
 * @param toNumber     optional mapper from T to non-negative integer
 *                     (defaults to identity for number[])
 * @returns            new sorted array
 */
export function countingSort<T>(
  arr: readonly T[],
  toNumber: (item: T) => number = (x: any) => x
): T[] {
  if (arr.length === 0) return [];

  // 1. find range
  let min = toNumber(arr[0]);
  let max = min;
  for (let i = 1; i < arr.length; ++i) {
    const v = toNumber(arr[i]);
    if (v < 0) throw new Error("Counting sort needs non-negative keys");
    if (v < min) min = v;
    if (v > max) max = v;
  }

  const range = max - min + 1;

  // 2. count frequencies
  const count = new Uint32Array(range);
  for (let i = 0; i < arr.length; ++i) {
    ++count[toNumber(arr[i]) - min];
  }

  // 3. prefix sum
  for (let i = 1; i < range; ++i) {
    count[i] += count[i - 1];
  }

  // 4. build output (backwards keeps it stable)
  const out = new Array<T>(arr.length);
  for (let i = arr.length - 1; i >= 0; --i) {
    const key = toNumber(arr[i]) - min;
    out[--count[key]] = arr[i];
  }
  return out;
}

/* ---------- Usage examples ---------- */

// 1. plain numbers
const nums = [3, 7, 2, 7, 0, 3];
console.log(countingSort(nums)); // [0, 2, 3, 3, 7, 7]

// 2. objects by a numeric field
interface Person { age: number; name: string }
const people: Person[] = [
  { age: 34, name: "Alice" },
  { age: 12, name: "Bob" },
  { age: 34, name: "Claire" }
];
const byAge = countingSort(people, p => p.age);
console.log(byAge.map(p => p.name)); // ["Bob","Alice","Claire"]
