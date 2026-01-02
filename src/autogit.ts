/**
 * Recursively search for `target` in the *sorted* array `arr`.
 * Time-complexity: O(log n)   Space-complexity: O(log n) due to call stack.
 */
function binarySearchRecursive<T>(
  arr: T[],
  target: T,
  left = 0,
  right = arr.length - 1
): number {
  if (left > right) return -1;                 // base-case: not found

  const mid = Math.floor(left + (right - left) / 2);

  if (arr[mid] === target) return mid;       // found
  if (arr[mid] > target)
    return binarySearchRecursive(arr, target, left, mid - 1); // search left half
  return binarySearchRecursive(arr, target, mid + 1, right); // search right half
}

/* ---------- usage ---------- */
const nums = [1, 3, 4, 6, 8, 9, 11];
console.log(binarySearchRecursive(nums, 6));  // → 3
console.log(binarySearchRecursive(nums, 5));  // → -1
