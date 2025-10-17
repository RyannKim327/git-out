function binarySearchRecursive<T>(
  array: T[],
  target: T,
  start: number = 0,
  end: number = array.length - 1
): number {
  // Base case: search space is empty
  if (start > end) {
    return -1;
  }

  // Calculate middle index
  const mid = Math.floor((start + end) / 2);

  // Found the target
  if (array[mid] === target) {
    return mid;
  }

  // Search in left half
  if (array[mid] > target) {
    return binarySearchRecursive(array, target, start, mid - 1);
  }

  // Search in right half
  return binarySearchRecursive(array, target, mid + 1, end);
}
function binarySearchRecursive<T>(
  sortedArray: T[],
  target: T,
  start: number = 0,
  end: number = sortedArray.length - 1
): number {
  // Base case: element not found
  if (start > end) {
    return -1;
  }

  const mid = Math.floor((start + end) / 2);
  const midValue = sortedArray[mid];

  if (midValue === target) {
    return mid; // Target found
  } else if (midValue > target) {
    // Search left half
    return binarySearchRecursive(sortedArray, target, start, mid - 1);
  } else {
    // Search right half
    return binarySearchRecursive(sortedArray, target, mid + 1, end);
  }
}

// Example usage
const sortedNumbers = [1, 3, 5, 7, 9, 11, 13, 15, 17];
const sortedStrings = ["apple", "banana", "cherry", "date", "elderberry"];

console.log(binarySearchRecursive(sortedNumbers, 7));  // Output: 3
console.log(binarySearchRecursive(sortedNumbers, 10)); // Output: -1
console.log(binarySearchRecursive(sortedStrings, "cherry")); // Output: 2
function binarySearchRecursive<T extends number | string>(
  array: T[],
  target: T,
  start: number = 0,
  end: number = array.length - 1
): number {
  // Input validation
  if (array.length === 0) {
    return -1;
  }

  if (start > end) {
    return -1;
  }

  const mid = Math.floor((start + end) / 2);
  
  if (array[mid] === target) {
    return mid;
  }

  if (array[mid] > target) {
    return binarySearchRecursive(array, target, start, mid - 1);
  }

  return binarySearchRecursive(array, target, mid + 1, end);
}
function binarySearchRecursiveWithLogs<T>(
  array: T[],
  target: T,
  start: number = 0,
  end: number = array.length - 1,
  depth: number = 0
): number {
  console.log(`Depth ${depth}: Searching from index ${start} to ${end}`);
  
  if (start > end) {
    console.log(`Depth ${depth}: Search space exhausted, element not found`);
    return -1;
  }

  const mid = Math.floor((start + end) / 2);
  console.log(`Depth ${depth}: Checking index ${mid}, value = ${array[mid]}`);

  if (array[mid] === target) {
    console.log(`Depth ${depth}: Found at index ${mid}!`);
    return mid;
  }

  if (array[mid] > target) {
    console.log(`Depth ${depth}: Searching left half`);
    return binarySearchRecursiveWithLogs(array, target, start, mid - 1, depth + 1);
  }

  console.log(`Depth ${depth}: Searching right half`);
  return binarySearchRecursiveWithLogs(array, target, mid + 1, end, depth + 1);
}

// Example with debugging
const numbers = [1, 3, 5, 7, 9, 11, 13];
console.log(binarySearchRecursiveWithLogs(numbers, 7));
// Always ensure the array is sorted
const unsortedArray = [5, 2, 8, 1, 9];
const sortedArray = [...unsortedArray].sort((a, b) => a - b);

// The algorithm works with any comparable type
const result = binarySearchRecursive(sortedArray, 8);
console.log(result); // Output: 4

// Handle the -1 return value appropriately
const index = binarySearchRecursive(sortedArray, 100);
if (index === -1) {
  console.log("Element not found in array");
}
