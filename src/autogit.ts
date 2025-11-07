function binarySearchRecursive<T>(
  arr: T[],
  target: T,
  low: number = 0,
  high: number = arr.length - 1
): number {
  if (low > high) return -1;                 // not found

  const mid = Math.floor((low + high) / 2);

  if (arr[mid] === target) return mid;         // found
  if (arr[mid] > target)                       // search left half
    return binarySearchRecursive(arr, target, low, mid - 1);
  else                                         // search right half
    return binarySearchRecursive(arr, target, mid + 1, high);
}

/* ---------- usage ---------- */
const nums = [1, 3, 4, 6, 8, 9, 11];
console.log(binarySearchRecursive(nums, 6));  // → 3
console.log(binarySearchRecursive(nums, 5));  // → -1
