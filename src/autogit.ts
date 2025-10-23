/**
 * Recursive binary search.
 * @param arr    Sorted array of numbers
 * @param target Value to locate
 * @param left   Left boundary (inclusive); pass 0 on first call
 * @param right  Right boundary (inclusive); pass arr.length - 1 on first call
 * @returns      Index of target, or -1 if absent
 */
function binarySearch(
  arr: number[],
  target: number,
  left: number = 0,
  right: number = arr.length - 1
): number {
  if (left > right) return -1;                 // empty interval → not found

  const mid = Math.floor((left + right) / 2);  // middle index
  const value = arr[mid];

  if (value === target) return mid;          // found
  if (target < value)                         // search left half
    return binarySearch(arr, target, left, mid - 1);
  else                                        // search right half
    return binarySearch(arr, target, mid + 1, right);
}

/* ---------- usage ---------- */
const nums = [1, 3, 4, 7, 9, 15, 21];
console.log(binarySearch(nums, 7));  // → 3
console.log(binarySearch(nums, 2));  // → -1
