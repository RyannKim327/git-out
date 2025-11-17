function binarySearch<T>(
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
  
  // Found the target
  if (arr[mid] === target) {
    return mid;
  }
  
  // Search in left half
  if (target < arr[mid]) {
    return binarySearch(arr, target, low, mid - 1);
  }
  
  // Search in right half
  return binarySearch(arr, target, mid + 1, high);
}
function binarySearchRecursive<T>(
  arr: T[],
  target: T,
  comparator?: (a: T, b: T) => number,
  low: number = 0,
  high: number = arr.length - 1
): number {
  if (low > high) {
    return -1;
  }
  
  const mid = Math.floor((low + high) / 2);
  const compare = comparator || ((a: T, b: T) => (a < b ? -1 : a > b ? 1 : 0));
  const comparison = compare(target, arr[mid]);
  
  if (comparison === 0) {
    return mid;
  } else if (comparison < 0) {
    return binarySearchRecursive(arr, target, comparator, low, mid - 1);
  } else {
    return binarySearchRecursive(arr, target, comparator, mid + 1, high);
  }
}
// Example 1: Numbers
const numbers = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
console.log(binarySearch(numbers, 7)); // Output: 3
console.log(binarySearch(numbers, 10)); // Output: -1

// Example 2: Strings
const words = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
console.log(binarySearch(words, 'cherry')); // Output: 2

// Example 3: With custom comparator
interface Person {
  id: number;
  name: string;
}

const people: Person[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
  { id: 4, name: 'Diana' },
];

// Search by id
const personIndex = binarySearchRecursive(
  people,
  { id: 3, name: 'Charlie' } as Person,
  (a, b) => a.id - b.id
);
console.log(personIndex); // Output: 2
class BinarySearch {
  static search<T>(
    sortedArray: T[],
    target: T,
    comparator?: (a: T, b: T) => number
  ): number {
    return binarySearchRecursive(sortedArray, target, comparator);
  }
}

// Usage
const result = BinarySearch.search(numbers, 11);
console.log(result); // Output: 5
