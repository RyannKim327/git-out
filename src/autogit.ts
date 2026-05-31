/**
 * Recursively finds the index of `target` in a sorted array.
 * Returns the index if found, otherwise –1.
 *
 * @param arr   A sorted array (ascending, no duplicates needed)
 * @param target The value you're looking for
 * @param left  The left boundary (inclusive)
 * @param right The right boundary (exclusive)
 */
function binarySearchRecursive<T>(
  arr: readonly T[],
  target: T,
  left = 0,
  right = arr.length
): number {
  if (left >= right) return -1;            // no match

  const mid = left + ((right - left) >> 1); // safer midpoint, avoid overflow

  const cmp = arr[mid] === target
    ? 0
    : arr[mid] < target
      ? -1
      : 1;

  return cmp === 0
    ? mid
    : cmp < 0
      ? binarySearchRecursive(arr, target, mid + 1, right)
      : binarySearchRecursive(arr, target, left, mid);
}
const nums = [1, 3, 5, 7, 9, 11];
console.log(binarySearchRecursive(nums, 7));  // → 3
console.log(binarySearchRecursive(nums, 4));  // → -1
function binarySearchRecursiveCustom<T>(
  arr: readonly T[],
  target: T,
  compare: (a: T, b: T) => number,
  left = 0,
  right = arr.length
): number {
  if (left >= right) return -1;

  const mid = left + ((right - left) >> 1);
  const cmp = compare(arr[mid], target);

  return cmp === 0
    ? mid
    : cmp < 0
      ? binarySearchRecursiveCustom(arr, target, compare, mid + 1, right)
      : binarySearchRecursiveCustom(arr, target, compare, left, mid);
}
interface Person { age: number; name: string; }
const people: Person[] = [
  { age: 22, name: 'Alice' },
  { age: 30, name: 'Bob' },
  { age: 45, name: 'Charlie' },
];
const ageToFind = 30;
const idx = binarySearchRecursiveCustom(
  people,
  { age: ageToFind, name: '' },
  (a, b) => a.age - b.age
);
console.log(idx); // → 1
