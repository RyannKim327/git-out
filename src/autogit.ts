/**
 * Recursively searches for `target` in a sorted array.
 * @returns the index if found; otherwise -1.
 */
function binarySearch(
  arr: number[],
  target: number,
  left = 0,
  right = arr.length - 1
): number {
  if (left > right) return -1; // base case: not found

  const mid = Math.floor((left + right) / 2);

  if (arr[mid] === target) return mid;
  if (arr[mid] < target)
    return binarySearch(arr, target, mid + 1, right); // search right half
  return binarySearch(arr, target, left, mid - 1); // search left half
}

/* ---------- usage ---------- */
const nums = [-5, 0, 3, 7, 9, 12, 21];
console.log(binarySearch(nums, 9));  // → 4
console.log(binarySearch(nums, 4));  // → -1
