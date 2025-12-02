/**
 * Recursive binary search.
 * @param arr    Sorted array of numbers
 * @param target Value to locate
 * @param left   Left boundary (inclusive)
 * @param right  Right boundary (inclusive)
 * @returns      Index of target, or -1
 */
function binarySearch(
  arr: number[],
  target: number,
  left = 0,
  right = arr.length - 1
): number {
  if (left > right) return -1;                // Base case: not found

  const mid = Math.floor((left + right) / 2);    // Midpoint
  if (arr[mid] === target) return mid;        // Found!

  if (arr[mid] > target) {
    return binarySearch(arr, target, left, mid - 1); // Search left half
  } else {
    return binarySearch(arr, target, mid + 1, right); // Search right half
  }
}

/* ---------- Usage example ---------- */
const nums = [-10, -3, 0, 5, 9, 12, 42];
console.log(binarySearch(nums, 9));  // → 4
console.log(binarySearch(nums, 2));  // → -1
