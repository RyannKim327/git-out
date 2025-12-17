function binarySearchRecursive<T>(
  array: T[],
  target: T,
  start: number = 0,
  end: number = array.length - 1
): number {
  // Base case: element not found
  if (start > end) {
    return -1;
  }

  // Calculate middle index
  const mid = Math.floor((start + end) / 2);

  // Base case: element found
  if (array[mid] === target) {
    return mid;
  }

  // Recursive cases
  if (array[mid] > target) {
    // Search left half
    return binarySearchRecursive(array, target, start, mid - 1);
  } else {
    // Search right half
    return binarySearchRecursive(array, target, mid + 1, end);
  }
}
function binarySearchRecursive<T>(
  array: T[],
  target: T,
  comparator: (a: T, b: T) => number = (a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  },
  start: number = 0,
  end: number = array.length - 1
): number {
  if (start > end) {
    return -1;
  }

  const mid = Math.floor((start + end) / 2);
  const comparison = comparator(array[mid], target);

  if (comparison === 0) {
    return mid;
  }

  if (comparison > 0) {
    return binarySearchRecursive(array, target, comparator, start, mid - 1);
  } else {
    return binarySearchRecursive(array, target, comparator, mid + 1, end);
  }
}
// Example 1: Basic usage with numbers
const numbers = [1, 3, 5, 7, 9, 11, 13, 15];
console.log(binarySearchRecursive(numbers, 7)); // Output: 3
console.log(binarySearchRecursive(numbers, 10)); // Output: -1

// Example 2: Usage with strings
const strings = ["apple", "banana", "cherry", "date", "elderberry"];
console.log(binarySearchRecursive(strings, "cherry")); // Output: 2

// Example 3: Custom comparator for objects
interface Person {
  id: number;
  name: string;
}

const people: Person[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

const personComparator = (a: Person, b: Person) => a.id - b.id;
console.log(binarySearchRecursive(people, { id: 2, name: "Bob" }, personComparator)); // Output: 1
class BinarySearch<T> {
  constructor(private array: T[], private comparator?: (a: T, b: T) => number) {}

  search(target: T): number {
    return this.recursiveSearch(target, 0, this.array.length - 1);
  }

  private recursiveSearch(
    target: T,
    start: number,
    end: number
  ): number {
    if (start > end) {
      return -1;
    }

    const mid = Math.floor((start + end) / 2);
    const current = this.array[mid];

    if (this.compare(current, target) === 0) {
      return mid;
    }

    if (this.compare(current, target) > 0) {
      return this.recursiveSearch(target, start, mid - 1);
    } else {
      return this.recursiveSearch(target, mid + 1, end);
    }
  }

  private compare(a: T, b: T): number {
    if (this.comparator) {
      return this.comparator(a, b);
    }

    // Default comparison for primitives
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }
}

// Usage
const search = new BinarySearch([1, 2, 3, 4, 5]);
console.log(search.search(3)); // Output: 2
// Empty array
console.log(binarySearchRecursive([], 5)); // Output: -1

// Single element
console.log(binarySearchRecursive([5], 5)); // Output: 0

// Duplicate elements (returns first occurrence)
console.log(binarySearchRecursive([1, 2, 2, 2, 3], 2)); // Output: 2
