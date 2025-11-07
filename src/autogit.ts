function binarySearchRecursive(
  array: number[],
  target: number,
  left: number = 0,
  right: number = array.length - 1
): number {
  // Base case: element not found
  if (left > right) {
    return -1;
  }

  // Calculate middle index
  const mid = Math.floor((left + right) / 2);

  // Base case: element found
  if (array[mid] === target) {
    return mid;
  }

  // Recursive cases
  if (target < array[mid]) {
    // Search in the left half
    return binarySearchRecursive(array, target, left, mid - 1);
  } else {
    // Search in the right half
    return binarySearchRecursive(array, target, mid + 1, right);
  }
}
function binarySearchRecursive<T>(
  array: T[],
  target: T,
  left: number = 0,
  right: number = array.length - 1,
  compareFn: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
): number {
  if (left > right) {
    return -1;
  }

  const mid = Math.floor((left + right) / 2);
  const comparison = compareFn(target, array[mid]);

  if (comparison === 0) {
    return mid;
  } else if (comparison < 0) {
    return binarySearchRecursive(array, target, left, mid - 1, compareFn);
  } else {
    return binarySearchRecursive(array, target, mid + 1, right, compareFn);
  }
}
// Example usage
const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];

// Basic number search
console.log(binarySearchRecursive(sortedArray, 7));  // Output: 3
console.log(binarySearchRecursive(sortedArray, 10)); // Output: -1 (not found)

// Generic search with strings
const stringArray = ["apple", "banana", "cherry", "date", "elderberry"];
console.log(binarySearchRecursive(stringArray, "cherry")); // Output: 2

// Custom comparator for objects
interface Person {
  id: number;
  name: string;
}

const people: Person[] = [
  { id: 1, name: "Alice" },
  { id: 3, name: "Bob" },
  { id: 5, name: "Charlie" },
];

const result = binarySearchRecursive(
  people,
  { id: 3, name: "Bob" } as Person,
  0,
  people.length - 1,
  (a, b) => a.id - b.id
);
console.log(result); // Output: 1
class BinarySearch {
  static search<T>(
    array: T[],
    target: T,
    compareFn?: (a: T, b: T) => number
  ): number {
    return this.recursiveSearch(
      array,
      target,
      0,
      array.length - 1,
      compareFn
    );
  }

  private static recursiveSearch<T>(
    array: T[],
    target: T,
    left: number,
    right: number,
    compareFn: (a: T, b: T) => number = (a, b) => 
      a < b ? -1 : a > b ? 1 : 0
  ): number {
    if (left > right) return -1;

    const mid = Math.floor((left + right) / 2);
    const comparison = compareFn(target, array[mid]);

    if (comparison === 0) return mid;
    
    return comparison < 0
      ? this.recursiveSearch(array, target, left, mid - 1, compareFn)
      : this.recursiveSearch(array, target, mid + 1, right, compareFn);
  }
}

// Usage
const numbers = [2, 4, 6, 8, 10];
console.log(BinarySearch.search(numbers, 6)); // Output: 2
