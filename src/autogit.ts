function binarySearchRecursive<T>(
  array: T[],
  target: T,
  left: number = 0,
  right: number = array.length - 1
): number {
  // Base case: search range is invalid
  if (left > right) {
    return -1;
  }

  // Calculate middle index
  const mid = Math.floor((left + right) / 2);

  // Found the target
  if (array[mid] === target) {
    return mid;
  }
  
  // Search left half
  if (array[mid] > target) {
    return binarySearchRecursive(array, target, left, mid - 1);
  }
  
  // Search right half
  return binarySearchRecursive(array, target, mid + 1, right);
}

// Example usage with type safety
const numbers = [1, 3, 5, 7, 9, 11, 13, 15];
const strings = ["apple", "banana", "cherry", "date", "elderberry"];

// Number search
const targetNumber = 7;
const result1 = binarySearchRecursive(numbers, targetNumber);
console.log(`Found ${targetNumber} at index: ${result1}`); // Output: Found 7 at index: 3

// String search
const targetString = "cherry";
const result2 = binarySearchRecursive(strings, targetString);
console.log(`Found "${targetString}" at index: ${result2}`); // Output: Found "cherry" at index: 2

// Not found case
const notFound = binarySearchRecursive(numbers, 20);
console.log(`Result for non-existent value: ${notFound}`); // Output: Result for non-existent value: -1
function isSorted<T>(array: T[]): boolean {
  for (let i = 1; i < array.length; i++) {
    if (array[i] < array[i - 1]) {
      return false;
    }
  }
  return true;
}

// Usage check
if (!isSorted(numbers)) {
  console.error("Array must be sorted for binary search!");
}
function binarySearch<T>(array: T[], target: T): number {
  return binarySearchRecursive(array, target, 0, array.length - 1);
}

// Now users only need to provide array and target
const result = binarySearch(numbers, 7);
