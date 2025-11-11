/**
 * Recursively searches for `target` in the sorted `arr`.
 * Time-complexity:  O(log n)
 * Space-complexity: O(log n)  (due to call-stack)
 */
function binarySearchRecursive(
  arr: number[],
  target: number,
  left = 0,
  right = arr.length - 1
): number {
  if (left > right) return -1;                 // Base-case: not found

  const mid = Math.floor((left + right) / 2);

  if (arr[mid] === target) return mid;         // Found
  if (arr[mid] > target)
    return binarySearchRecursive(arr, target, left, mid - 1); // Search left half
  else
    return binarySearchRecursive(arr, target, mid + 1, right); // Search right half
}

/* ---------- Usage example ---------- */
const data = [2, 4, 7, 10, 15, 23, 38, 56, 72, 91];
console.log(binarySearchRecursive(data, 23)); // → 5
console.log(binarySearchRecursive(data, 3));  // → -1
