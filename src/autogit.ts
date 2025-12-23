/**
 * Recursively searches a **sorted** numeric array for `target`.
 *
 * @param arr   Sorted array of numbers (ascending).
 * @param target Value to find.
 * @param low   (internal) lower bound index – callers omit this.
 * @param high  (internal) upper bound index – callers omit this.
 * @returns     Index of `target` in `arr`, or -1 if not present.
 */
export function binarySearchRecursive(
  arr: readonly number[],
  target: number,
  low = 0,
  high = arr.length - 1
): number {
  // Base case: range exhausted → not found
  if (low > high) return -1;

  const mid = low + Math.floor((high - low) / 2);
  const midVal = arr[mid];

  if (midVal === target) return mid;               // found!
  if (midVal > target) {
    // Search left half
    return binarySearchRecursive(arr, target, low, mid - 1);
  }
  // Search right half
  return binarySearchRecursive(arr, target, mid + 1, high);
}
/**
 * Generic recursive binary search.
 *
 * @typeParam T – type of the elements in the array.
 * @param arr        Sorted array of `T`.
 * @param target     Value to locate.
 * @param compare    Comparator returning <0, 0, >0 (like `Array.sort`).
 * @param low        (internal) lower bound index.
 * @param high       (internal) upper bound index.
 * @returns          Index of `target` or -1 if absent.
 */
export function binarySearchRecursiveGeneric<T>(
  arr: readonly T[],
  target: T,
  compare: (a: T, b: T) => number,
  low = 0,
  high = arr.length - 1
): number {
  if (low > high) return -1;

  const mid = low + Math.floor((high - low) / 2);
  const cmp = compare(arr[mid], target);

  if (cmp === 0) return mid;
  if (cmp > 0) {
    return binarySearchRecursiveGeneric(arr, target, compare, low, mid - 1);
  }
  return binarySearchRecursiveGeneric(arr, target, compare, mid + 1, high);
}
// Numbers (default)
const numCmp = (a: number, b: number) => a - b;

// Strings (case‑insensitive)
const strCmp = (a: string, b: string) =>
  a.localeCompare(b, undefined, { sensitivity: 'base' });

// Dates
const dateCmp = (a: Date, b: Date) => a.getTime() - b.getTime();
// 1️⃣ Numbers
const nums = [1, 3, 5, 7, 9, 11, 13];
console.log(binarySearchRecursive(nums, 7));   // → 3
console.log(binarySearchRecursive(nums, 2));   // → -1

// 2️⃣ Strings (case‑insensitive)
const words = ['Apple', 'Banana', 'Cherry', 'Date', 'Fig'];
console.log(
  binarySearchRecursiveGeneric(words, 'cherry', strCmp)
); // → 2

// 3️⃣ Dates
const dates = [
  new Date('2020-01-01'),
  new Date('2020-06-15'),
  new Date('2021-03-30')
];
console.log(
  binarySearchRecursiveGeneric(dates, new Date('2020-06-15'), dateCmp)
); // → 1
// binarySearch.test.ts
import { binarySearchRecursive, binarySearchRecursiveGeneric } from './binarySearch';

describe('binarySearchRecursive (numbers)', () => {
  const arr = [2, 4, 6, 8, 10, 12, 14];

  test('finds existing element', () => {
    expect(binarySearchRecursive(arr, 8)).toBe(3);
  });

  test('returns -1 for missing element', () => {
    expect(binarySearchRecursive(arr, 5)).toBe(-1);
  });

  test('works with empty array', () => {
    expect(binarySearchRecursive([], 1)).toBe(-1);
  });
});

describe('binarySearchRecursiveGeneric (strings)', () => {
  const words = ['alpha', 'bravo', 'charlie', 'delta', 'echo'];
  const cmp = (a: string, b: string) => a.localeCompare(b);

  test('finds element', () => {
    expect(binarySearchRecursiveGeneric(words, 'delta', cmp)).toBe(3);
  });

  test('returns -1 when not present', () => {
    expect(binarySearchRecursiveGeneric(words, 'foxtrot', cmp)).toBe(-1);
  });
});
export function binarySearchIterative(arr: readonly number[], target: number): number {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = low + ((high - low) >> 1); // bit‑wise divide by 2, same as Math.floor
    const midVal = arr[mid];

    if (midVal === target) return mid;
    if (midVal < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}
export const binarySearch = <T>(a: readonly T[], t: T, c: (x: T, y: T) => number) =>
  (function rec(l = 0, h = a.length - 1): number {
    if (l > h) return -1;
    const m = l + ((h - l) >> 1);
    const cmp = c(a[m], t);
    return cmp === 0 ? m : cmp > 0 ? rec(l, m - 1) : rec(m + 1, h);
  })();
