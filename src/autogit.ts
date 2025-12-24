// Generic recursive binary search with a comparator
export function binarySearchRecursive<T>(
  arr: T[],
  target: T,
  comparator: (a: T, b: T) => number,
  low = 0,
  high = arr.length - 1
): number {
  if (low > high) return -1;

  const mid = Math.floor((low + high) / 2);
  const cmp = comparator(arr[mid], target);

  if (cmp === 0) return mid;
  if (cmp < 0) {
    // arr[mid] < target -> search right half
    return binarySearchRecursive(arr, target, comparator, mid + 1, high);
  } else {
    // arr[mid] > target -> search left half
    return binarySearchRecursive(arr, target, comparator, low, mid - 1);
  }
}
const nums = [1, 3, 5, 7, 9];
const idx = binarySearchRecursive(nums, 7, (a, b) => a - b); // 3
const words = ["apple", "banana", "cherry"];
const idx2 = binarySearchRecursive(words, "banana", (a, b) => a.localeCompare(b)); // 1
// Number-specific version (no comparator required)
export function binarySearchNumber(
  arr: number[],
  target: number,
  low = 0,
  high = arr.length - 1
): number {
  if (low > high) return -1;

  const mid = (low + high) >> 1;

  if (arr[mid] === target) return mid;
  if (arr[mid] < target) return binarySearchNumber(arr, target, mid + 1, high);
  return binarySearchNumber(arr, target, low, mid - 1);
}
console.log(binarySearchNumber([1, 2, 4, 5, 7], 4)); // 2
