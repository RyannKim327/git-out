/**
 * Binary search on a sorted array.
 * @param arr   – sorted array of comparable values
 * @param target – value we’re looking for
 * @returns      – index of target, or -1 if not found
 */
function binarySearchIter<T>(arr: T[], target: T, compareFn?: (a: T, b: T) => number): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    // Using “>>> 1” gives the floor of the middle even for huge indices
    const mid = (left + right) >>> 1;
    const cmp = compareFn ? compareFn(arr[mid], target) : (arr[mid] as any) > (target as any)
      ? 1
      : (arr[mid] as any) < (target as any)
      ? -1
      : 0;

    if (cmp === 0) {
      return mid;          // found
    } else if (cmp < 0) {
      left = mid + 1;      // target is on the right half
    } else {
      right = mid - 1;     // target is on the left half
    }
  }

  return -1; // not found
}
const nums = [1, 3, 5, 7, 9, 11];
console.log(binarySearchIter(nums, 7)); // → 3
console.log(binarySearchIter(nums, 4)); // → -1
const words = ["apple", "banana", "cherry", "date"];
const index = binarySearchIter(words, "cherry", (a, b) => a.localeCompare(b));
// → 2
function binarySearchRec<T>(
  arr: T[],
  target: T,
  compareFn?: (a: T, b: T) => number,
  left = 0,
  right = arr.length - 1
): number {
  if (left > right) return -1;            // base case: not found

  const mid = (left + right) >>> 1;
  const cmp = compareFn ? compareFn(arr[mid], target) : (arr[mid] as any) > (target as any)
      ? 1
      : (arr[mid] as any) < (target as any)
      ? -1
      : 0;

  if (cmp === 0) return mid;
  return cmp < 0
    ? binarySearchRec(arr, target, compareFn, mid + 1, right)
    : binarySearchRec(arr, target, compareFn, left, mid - 1);
}
function test<T>(arr: T[], target: T, fn: (a: T[], t: T) => number) {
  const idx = fn(arr, target);
  console.log(`searching ${target} in [${arr}] → ${idx}`);
}

const ints = [2, 4, 6, 8, 10];
test(ints, 8, binarySearchIter);
test(ints, 9, binarySearchIter);

const strs = ['banana', 'cherry', 'fig', 'grape'];
test(strs, 'fig', (a, t) => binarySearchRec(a, t, (x, y) => x.localeCompare(y)));
