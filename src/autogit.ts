/**
 * Binary search on a sorted array (ascending order).
 * @param arr   Sorted array of comparable items.
 * @param value Item you’re hunting for.
 * @param compare Optional comparison function:
 *                (a,b) => 0 if a==b, <0 if a<b, >0 if a>b.
 *                If omitted, '<'/'>' operators are used.
 * @returns Index of the value, or -1 if it isn’t present.
 */
export function binarySearch<T>(
  arr: readonly T[],
  value: T,
  compare?: (a: T, b: T) => number,
): number {
  let low = 0;
  let high = arr.length;

  const cmp = compare ?? ((a: T, b: T) => {
    /* eslint-disable-next-line no-prototype-builtins */
    if ((a as any as object).hasOwnProperty && typeof a === 'object' && typeof b === 'object') {
      // For objects that implement `valueOf()` – optional
      return (a as any) < b ? -1 : (a as any) > b ? 1 : 0;
    }
    return a < b ? -1 : a > b ? 1 : 0;
  });

  while (low < high) {
    const mid = (low + high) >>> 1; // fast floor division by 2
    const comp = cmp(arr[mid], value);

    if (comp === 0) return mid;   // found it
    if (comp < 0) low = mid + 1;  // value is higher
    else high = mid;              // value is lower
  }

  return -1; // not found
}
const nums = [1, 3, 5, 7, 9, 11, 13];
const idx = binarySearch(nums, 7); // → 3

const words = ['apple', 'banana', 'cherry', 'date'];
const wIdx = binarySearch(words, 'cherry'); // → 2
export function binarySearchRecursive<T>(
  arr: readonly T[],
  value: T,
  compare?: (a: T, b: T) => number,
  low = 0,
  high = arr.length - 1,
): number {
  if (low > high) return -1;

  const cmp = compare ?? ((a: T, b: T) => (a < b ? -1 : a > b ? 1 : 0));

  const mid = (low + high) >>> 1;
  const comp = cmp(arr[mid], value);

  if (comp === 0) return mid;
  return comp < 0
    ? binarySearchRecursive(arr, value, compare, mid + 1, high)
    : binarySearchRecursive(arr, value, compare, low, mid - 1);
}
interface Person { name: string; age: number; }

const people: Person[] = [
  { name: 'Alice', age: 28 },
  { name: 'Bob', age: 35 },
  { name: 'Carol', age: 41 },
];

// Sorted by age
const idx = binarySearch(
  people,
  { name: '', age: 35 },             // value (name ignored)
  (a, b) => a.age - b.age
); // → 1
