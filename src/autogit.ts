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
function binarySearchRecursive<T>(
  array: T[],
  target: T,
  compareFn?: (a: T, b: T) => number,
  left: number = 0,
  right: number = array.length - 1
): number {
  // Validate input
  if (!array.length) {
    return -1;
  }

  // Default comparator for primitive types
  const comparator = compareFn || ((a: T, b: T) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  // Base case
  if (left > right) {
    return -1;
  }

  const mid = Math.floor((left + right) / 2);
  const comparison = comparator(array[mid], target);

  if (comparison === 0) {
    return mid;
  }

  if (comparison > 0) {
    return binarySearchRecursive(array, target, comparator, left, mid - 1);
  }

  return binarySearchRecursive(array, target, comparator, mid + 1, right);
}
interface BinarySearchResult {
  index: number;
  found: boolean;
}

function binarySearch<T>(
  sortedArray: T[],
  target: T,
  compareFn?: (a: T, b: T) => number
): BinarySearchResult {
  const defaultComparator = (a: T, b: T): number => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  };

  const comparator = compareFn || defaultComparator;

  function recursiveSearch(
    left: number,
    right: number
  ): BinarySearchResult {
    if (left > right) {
      return { index: -1, found: false };
    }

    const mid = Math.floor((left + right) / 2);
    const comparison = comparator(sortedArray[mid], target);

    if (comparison === 0) {
      return { index: mid, found: true };
    }

    if (comparison > 0) {
      return recursiveSearch(left, mid - 1);
    }

    return recursiveSearch(mid + 1, right);
  }

  return recursiveSearch(0, sortedArray.length - 1);
}
// Example 1: Primitive types
const numbers = [1, 3, 5, 7, 9, 11, 13];
console.log(binarySearch(numbers, 7)); // { index: 3, found: true }
console.log(binarySearch(numbers, 8)); // { index: -1, found: false }

// Example 2: Objects with custom comparator
interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: "Alice" },
  { id: 3, name: "Bob" },
  { id: 5, name: "Charlie" },
  { id: 7, name: "Diana" }
];

const userComparator = (a: User, b: User) => a.id - b.id;
console.log(binarySearch(users, { id: 5, name: "" }, userComparator));
// { index: 2, found: true }

// Example 3: Strings
const fruits = ["apple", "banana", "cherry", "date"];
console.log(binarySearch(fruits, "cherry")); // { index: 2, found: true }
class BinarySearch {
  private static recursiveSearch<T>(
    array: T[],
    target: T,
    comparator: (a: T, b: T) => number,
    left: number,
    right: number
  ): number {
    // Tail call optimization (though TypeScript doesn't guarantee it)
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const comparison = comparator(array[mid], target);

      if (comparison === 0) {
        return mid;
      }

      if (comparison > 0) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    return -1;
  }

  // Public method that uses iterative approach internally
  // to avoid potential stack overflow with large arrays
  static search<T>(
    array: T[],
    target: T,
    compareFn?: (a: T, b: T) => number
  ): number {
    const comparator = compareFn || ((a: T, b: T) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });

    return this.recursiveSearch(array, target, comparator, 0, array.length - 1);
  }
}
