/**
 * Recursively searches for `target` in a sorted array.
 *
 * @param arr        The sorted array to search.
 * @param target     The value we are looking for.
 * @param compare    Optional comparator (a, b) => number.
 *                   Returns <0 if a < b, 0 if a == b, >0 if a > b.
 * @param left       Left bound of the current search interval (inclusive).
 * @param right      Right bound of the current search interval (inclusive).
 *
 * @returns The index of `target` in `arr`, or -1 if not found.
 */
function binarySearchRecursive<T>(
  arr: readonly T[],
  target: T,
  compare?: (a: T, b: T) => number,
  left: number = 0,
  right: number = arr.length - 1
): number {
  // Base case – interval is empty
  if (left > right) return -1;

  const mid = Math.floor((left + right) / 2);
  const midVal = arr[mid];

  // Use the supplied comparator or fall back to the default JS comparison
  const cmp = compare
    ? compare(midVal, target)
    : // default for numbers & strings (works for any type that supports <, >, ===)
      (midVal as unknown as number) < (target as unknown as number)
      ? -1
      : (midVal as unknown as number) > (target as unknown as number)
      ? 1
      : 0;

  if (cmp === 0) {
    // Found!
    return mid;
  } else if (cmp > 0) {
    // midVal > target → search left half
    return binarySearchRecursive(arr, target, compare, left, mid - 1);
  } else {
    // midVal < target → search right half
    return binarySearchRecursive(arr, target, compare, mid + 1, right);
  }
}
const nums = [1, 3, 5, 7, 9, 11, 13];
console.log(binarySearchRecursive(nums, 7));   // → 3
console.log(binarySearchRecursive(nums, 2));   // → -1
const words = ['apple', 'banana', 'cherry', 'date', 'fig'];
console.log(binarySearchRecursive(words, 'date')); // → 3
type Person = { id: number; name: string };

const people: Person[] = [
  { id: 1, name: 'Alice' },
  { id: 3, name: 'Bob' },
  { id: 5, name: 'Charlie' },
  { id: 7, name: 'Diana' },
];

// Comparator that orders by `id`
const byId = (a: Person, b: Person) => a.id - b.id;

const target = { id: 5, name: '' }; // name is irrelevant for the search
console.log(binarySearchRecursive(people, target, byId)); // → 2
// ---------- binarySearchRecursive.ts ----------
export function binarySearchRecursive<T>(
  arr: readonly T[],
  target: T,
  compare?: (a: T, b: T) => number,
  left: number = 0,
  right: number = arr.length - 1
): number {
  if (left > right) return -1;

  const mid = Math.floor((left + right) / 2);
  const midVal = arr[mid];

  const cmp = compare
    ? compare(midVal, target)
    : (midVal as unknown as number) < (target as unknown as number)
    ? -1
    : (midVal as unknown as number) > (target as unknown as number)
    ? 1
    : 0;

  if (cmp === 0) return mid;
  return cmp > 0
    ? binarySearchRecursive(arr, target, compare, left, mid - 1)
    : binarySearchRecursive(arr, target, compare, mid + 1, right);
}

// ---------- demo.ts ----------
import { binarySearchRecursive } from './binarySearchRecursive';

// Numbers
const nums = [2, 4, 6, 8, 10, 12];
console.log(binarySearchRecursive(nums, 8));   // 3
console.log(binarySearchRecursive(nums, 5));   // -1

// Strings
const colors = ['blue', 'green', 'orange', 'purple', 'red'];
console.log(binarySearchRecursive(colors, 'purple')); // 3

// Custom objects
type Point = { x: number; y: number };
const points: Point[] = [
  { x: 1, y: 5 },
  { x: 3, y: 2 },
  { x: 7, y: 9 },
];
const byX = (a: Point, b: Point) => a.x - b.x;
console.log(binarySearchRecursive(points, { x: 3, y: 0 }, byX)); // 1
function bs<T>(arr: readonly T[], target: T, l = 0, r = arr.length - 1): number {
  if (l > r) return -1;
  const m = (l + r) >> 1;               // same as Math.floor((l+r)/2)
  const v = arr[m];
  if (v === target) return m;
  return (v > target ? bs(arr, target, l, m - 1) : bs(arr, target, m + 1, r));
}
