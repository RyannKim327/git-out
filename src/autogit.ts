/**
 * Returns true if the given array is in strictly non‑decreasing order.
 * (Every element must be ≤ the next one.)
 *
 * @param arr  The array to test
 */
function isSortedAscending<T>(arr: T[]): boolean {
  for (let i = 0; i < arr.length - 1; i++) {
    // If any element is larger than the one that follows, the array isn’t sorted.
    if (arr[i] > arr[i + 1]) {
      return false;
    }
  }
  return true;
}
const nums = [1, 2, 2, 5, 9];
console.log(isSortedAscending(nums)); // true

const bad = [1, 3, 2, 4];
console.log(isSortedAscending(bad));  // false
