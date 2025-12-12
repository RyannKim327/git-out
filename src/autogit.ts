/**
 * Recursively searches for `target` in a sorted array.
 *
 * @param arr        The sorted array to search.
 * @param target     The value we are looking for.
 * @param compare    Optional comparator (a, b) => number.
 *                   Returns <0 if a < b, 0 if a === b, >0 if a > b.
 * @param left       Left bound of the current search interval (inclusive).
 * @param right      Right bound of the current search interval (inclusive).
 *
 * @returns The index of `target` in `arr`, or -1 if not found.
 */
export function binarySearchRecursive<T>(
  arr: readonly T[],
  target: T,
  compare?: (a: T, b: T) => number,
  left: number = 0,
  right: number = arr.length - 1
): number {
  // Base case – interval is empty
  if (left > right) {
    return -1;
  }

  // Choose middle index (avoid overflow)
  const mid = left + Math.floor((right - left) / 2);
  const midVal = arr[mid];

  // Use the supplied comparator or a default one for numbers/strings
  const cmp = compare ?? defaultComparator;

  const order = cmp(midVal, target);

  if (order === 0) {
    // Found!
    return mid;
  } else if (order < 0) {
    // midVal < target → search right half
    return binarySearchRecursive(arr, target, cmp, mid + 1, right);
  } else {
    // midVal > target → search left half
    return binarySearchRecursive(arr, target, cmp, left, mid - 1);
  }
}

/**
 * Default comparator that works for numbers and strings.
 * Throws if used with a type that cannot be compared with < or >.
 */
function defaultComparator<T>(a: T, b: T): number {
  if (typeof a === "number" && typeof b === "number") {
    return a - b;
  }
  if (typeof a === "string" && typeof b === "string") {
    return a < b ? -1 : a > b ? 1 : 0;
  }
  throw new Error(
    "No comparator supplied for type that is not number or string."
  );
}
const nums = [1, 3, 5, 7, 9, 12, 15];
console.log(binarySearchRecursive(nums, 7));   // → 3
console.log(binarySearchRecursive(nums, 2));   // → -1
const words = ["apple", "banana", "cherry", "date", "fig"];
console.log(binarySearchRecursive(words, "cherry")); // → 2
interface Person {
  id: number;
  name: string;
}

const people: Person[] = [
  { id: 1, name: "Alice" },
  { id: 3, name: "Bob" },
  { id: 5, name: "Carol" },
  { id: 7, name: "Dave" },
];

// Comparator that orders by `id`
const byId = (a: Person, b: Person) => a.id - b.id;

// Search for the person with id = 5
const idx = binarySearchRecursive(people, { id: 5, name: "" }, byId);
console.log(idx); // → 2
console.log(people[idx]); // → { id: 5, name: "Carol" }
export function binarySearchIterative<T>(
  arr: readonly T[],
  target: T,
  compare?: (a: T, b: T) => number
): number {
  const cmp = compare ?? defaultComparator;
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const order = cmp(arr[mid], target);

    if (order === 0) return mid;
    if (order < 0) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
// Import the function (or copy‑paste it)
import { binarySearchRecursive } from "./binarySearch";

// Simple number search
const idx = binarySearchRecursive([1, 2, 4, 8, 16], 8); // → 3

// Custom object search
interface Point { x: number; y: number; }
const points: Point[] = [{x:0,y:0},{x:5,y:5},{x:10,y:10}];
const byX = (a: Point, b: Point) => a.x - b.x;
const pIdx = binarySearchRecursive(points, {x:5, y:0}, byX); // → 1
