function binarySearchRecursive(
  arr: number[], 
  target: number, 
  left: number = 0, 
  right: number = arr.length - 1
): number {
  // Base case: if left > right, element not found
  if (left > right) {
    return -1;
  }

  // Calculate the middle index
  const mid = Math.floor((left + right) / 2);

  // Base case: if target found at middle
  if (arr[mid] === target) {
    return mid;
  }

  // Recursive case: search in left half
  if (target < arr[mid]) {
    return binarySearchRecursive(arr, target, left, mid - 1);
  }
  // Recursive case: search in right half
  else {
    return binarySearchRecursive(arr, target, mid + 1, right);
  }
}
// Example usage
const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
const target = 7;
const index = binarySearchRecursive(sortedArray, target);

if (index !== -1) {
  console.log(`Element ${target} found at index ${index}`);
} else {
  console.log(`Element ${target} not found in the array`);
}
// Output: Element 7 found at index 3
function binarySearchRecursive<T>(
  arr: T[], 
  target: T, 
  left: number = 0, 
  right: number = arr.length - 1,
  compareFn?: (a: T, b: T) => number
): number {
  // Base case: if left > right, element not found
  if (left > right) {
    return -1;
  }

  // Calculate the middle index
  const mid = Math.floor((left + right) / 2);

  // Base case: if target found at middle
  if (compareFn ? compareFn(arr[mid], target) === 0 : arr[mid] === target) {
    return mid;
  }

  const comparison = compareFn ? compareFn(arr[mid], target) : 
    (arr[mid] as any) - (target as any);

  // Recursive case: search in left half
  if (comparison > 0) {
    return binarySearchRecursive(arr, target, left, mid - 1, compareFn);
  }
  // Recursive case: search in right half
  else {
    return binarySearchRecursive(arr, target, mid + 1, right, compareFn);
  }
}
// Test cases
console.log(binarySearchRecursive([1, 3, 5, 7, 9], 5)); // 2
console.log(binarySearchRecursive([1, 3, 5, 7, 9], 2)); // -1
console.log(binarySearchRecursive([1, 3, 5, 7, 9], 9)); // 4
console.log(binarySearchRecursive([], 1)); // -1
console.log(binarySearchRecursive([5], 5)); // 0
