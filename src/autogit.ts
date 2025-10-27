/**
 * Merge Sort (stable)
 * Time:  O(n log n) – always
 * Space: O(n)      – needs auxiliary buffer
 */
export function mergeSort<T>(
  arr: T[],
  compare: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): T[] {
  if (arr.length < 2) return arr.slice();          // already sorted; return copy

  const mid = Math.floor(arr.length / 2);
  const left  = mergeSort(arr.slice(0, mid), compare);
  const right = mergeSort(arr.slice(mid),   compare);

  return merge(left, right, compare);
}

/* Internal helper: merges two *sorted* arrays into one sorted array */
function merge<T>(
  left: T[],
  right: T[],
  compare: (a: T, b: T) => number
): T[] {
  const result: T[] = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (compare(left[i], right[j]) <= 0) result.push(left[i++]);
    else                               result.push(right[j++]);
  }
  // one of the halves may have leftovers
  return result.concat(left.slice(i)).concat(right.slice(j));
}
const nums   = [9, 3, 7, 4, 8, 2, 6];
const sorted = mergeSort(nums, (a, b) => a - b);
console.log(sorted); // [2, 3, 4, 6, 7, 8, 9]

// Works with custom objects too
interface Person { name: string; age: number; }
const people: Person[] = [
  { name: 'Alice', age: 30 },
  { name: 'Bob',   age: 25 },
];
const byAge = mergeSort(people, (a, b) => a.age - b.age);
