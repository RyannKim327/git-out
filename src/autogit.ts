function binarySearchRecursive(
  arr: number[], 
  target: number, 
  left: number = 0, 
  right: number = arr.length - 1
): number {
  // Base case: if left > right, target not found
  if (left > right) {
    return -1;
  }

  // Calculate the middle index
  const mid = Math.floor((left + right) / 2);

  // Base case: if target found
  if (arr[mid] === target) {
    return mid;
  }

  // Recursive cases: search left or right half
  if (target < arr[mid]) {
    // Search left half
    return binarySearchRecursive(arr, target, left, mid - 1);
  } else {
    // Search right half
    return binarySearchRecursive(arr, target, mid + 1, right);
  }
}
// Example usage
const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
const target = 11;

// Find the index of target
const result = binarySearchRecursive(sortedArray, target);
console.log(`Target ${target} found at index: ${result}`); // Output: Target 11 found at index: 5

// If target not found
const notFound = binarySearchRecursive(sortedArray, 12);
console.log(`Target 12 found at index: ${notFound}`); // Output: Target 12 found at index: -1
function binarySearchRecursiveGeneric<T>(
  arr: T[], 
  target: T, 
  left: number = 0, 
  right: number = arr.length - 1,
  compareFn: (a: T, b: T) => number = (a, b) => (a as any) - (b as any)
): number {
  // Base case: if left > right, target not found
  if (left > right) {
    return -1;
  }

  // Calculate the middle index
  const mid = Math.floor((left + right) / 2);

  // Base case: if target found
  const comparison = compareFn(arr[mid], target);
  if (comparison === 0) {
    return mid;
  }

  // Recursive cases: search left or right half
  if (comparison > 0) {
    // Target is smaller, search left half
    return binarySearchRecursiveGeneric(arr, target, left, mid - 1, compareFn);
  } else {
    // Target is larger, search right half
    return binarySearchRecursiveGeneric(arr, target, mid + 1, right, compareFn);
  }
}
// Using with numbers (default comparison)
const numbers = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
console.log(binarySearchRecursiveGeneric(numbers, 11)); // Output: 5

// Using with strings
const words = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
console.log(binarySearchRecursiveGeneric(words, 'cherry')); // Output: 2

// Using with custom comparison (e.g., case-insensitive string search)
const caseInsensitiveCompare = (a: string, b: string) => 
  a.toLowerCase().localeCompare(b.toLowerCase());

console.log(
  binarySearchRecursiveGeneric(
    words, 
    'CHERRY', 
    0, 
    words.length - 1, 
    caseInsensitiveCompare
  )
); // Output: 2
