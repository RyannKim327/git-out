function binarySearchRecursive<T>(
  arr: T[],
  target: T,
  low: number = 0,
  high: number = arr.length - 1
): number {
  // Base case: search range is invalid
  if (low > high) {
    return -1;
  }

  // Calculate middle index
  const mid = Math.floor((low + high) / 2);

  // Compare middle element with target
  if (arr[mid] === target) {
    return mid; // Found the target
  } 
  // If target is smaller than middle element, search left half
  else if (target < arr[mid]) {
    return binarySearchRecursive(arr, target, low, mid - 1);
  } 
  // If target is larger than middle element, search right half
  else {
    return binarySearchRecursive(arr, target, mid + 1, high);
  }
}
function binarySearchRecursive<T>(
  arr: T[],
  target: T,
  low: number = 0,
  high: number = arr.length - 1,
  comparator?: (a: T, b: T) => number
): number {
  // Validate input
  if (arr.length === 0) {
    return -1;
  }

  // Base case: search range is invalid
  if (low > high) {
    return -1;
  }

  const mid = Math.floor((low + high) / 2);
  const current = arr[mid];

  // Use custom comparator if provided, otherwise use default comparison
  const compare = comparator 
    ? comparator(target, current)
    : (target < current ? -1 : target > current ? 1 : 0);

  if (compare === 0) {
    return mid; // Found exact match
  } 
  else if (compare < 0) {
    return binarySearchRecursive(arr, target, low, mid - 1, comparator);
  } 
  else {
    return binarySearchRecursive(arr, target, mid + 1, high, comparator);
  }
}
// Example 1: Basic usage with numbers
const sortedNumbers = [1, 3, 5, 7, 9, 11, 13, 15];
console.log(binarySearchRecursive(sortedNumbers, 7)); // Output: 3
console.log(binarySearchRecursive(sortedNumbers, 10)); // Output: -1

// Example 2: Usage with strings
const sortedStrings = ["apple", "banana", "cherry", "date", "elderberry"];
console.log(binarySearchRecursive(sortedStrings, "cherry")); // Output: 2

// Example 3: With custom comparator for objects
interface Person {
  id: number;
  name: string;
}

const people: Person[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" }
];

const personComparator = (a: Person, b: Person) => a.id - b.id;
console.log(binarySearchRecursive(people, { id: 2, name: "Bob" }, 0, people.length - 1, personComparator)); // Output: 1
function binarySearch<T>(
  arr: T[],
  target: T,
  comparator?: (a: T, b: T) => number
): number {
  return binarySearchRecursive(arr, target, 0, arr.length - 1, comparator);
}

// Cleaner usage
console.log(binarySearch(sortedNumbers, 7));
