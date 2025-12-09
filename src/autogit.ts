function binarySearchRecursive(
  arr: number[],
  target: number,
  left: number = 0,
  right: number = arr.length - 1
): number {
  // Base case: element not found
  if (left > right) {
    return -1;
  }

  // Calculate middle index
  const mid = Math.floor((left + right) / 2);

  // Check if element is at mid
  if (arr[mid] === target) {
    return mid;
  }

  // If element is smaller than mid, search left half
  if (target < arr[mid]) {
    return binarySearchRecursive(arr, target, left, mid - 1);
  }

  // Otherwise search right half
  return binarySearchRecursive(arr, target, mid + 1, right);
}

// Example usage:
const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15];
console.log(binarySearchRecursive(sortedArray, 7));  // Output: 3
console.log(binarySearchRecursive(sortedArray, 10)); // Output: -1
function binarySearchRecursiveGeneric<T>(
  arr: T[],
  target: T,
  left: number = 0,
  right: number = arr.length - 1,
  compare: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
): number {
  if (left > right) {
    return -1;
  }

  const mid = Math.floor((left + right) / 2);
  const comparison = compare(arr[mid], target);

  if (comparison === 0) {
    return mid;
  }

  if (comparison > 0) {
    return binarySearchRecursiveGeneric(arr, target, left, mid - 1, compare);
  }

  return binarySearchRecursiveGeneric(arr, target, mid + 1, right, compare);
}
