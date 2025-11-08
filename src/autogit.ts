function binarySearchRecursive<T>(
  array: T[],
  target: T,
  low: number = 0,
  high: number = array.length - 1
): number {
  // Base case: element not found
  if (low > high) {
    return -1;
  }

  const mid = Math.floor((low + high) / 2);
  const midValue = array[mid];

  // Element found
  if (midValue === target) {
    return mid;
  }

  // Recursive cases
  if (target < midValue) {
    // Search left half
    return binarySearchRecursive(array, target, low, mid - 1);
  } else {
    // Search right half
    return binarySearchRecursive(array, target, mid + 1, high);
  }
}

// Example usage:
const sortedNumbers = [1, 3, 5, 7, 9, 11, 13, 15];
const stringsArray = ["apple", "banana", "cherry", "date", "elderberry"];

// Find number
console.log(binarySearchRecursive(sortedNumbers, 7)); // Output: 3
console.log(binarySearchRecursive(sortedNumbers, 10)); // Output: -1

// Find string
console.log(binarySearchRecursive(stringsArray, "cherry")); // Output: 2
console.log(binarySearchRecursive(stringsArray, "grape")); // Output: -1
function binarySearchRecursiveWithComparator<T>(
  array: T[],
  target: T,
  comparator: (a: T, b: T) => number,
  low: number = 0,
  high: number = array.length - 1
): number {
  if (low > high) return -1;

  const mid = Math.floor((low + high) / 2);
  const comparison = comparator(array[mid], target);

  if (comparison === 0) return mid;
  
  if (comparison > 0) {
    return binarySearchRecursiveWithComparator(
      array, target, comparator, low, mid - 1
    );
  } else {
    return binarySearchRecursiveWithComparator(
      array, target, comparator, mid + 1, high
    );
  }
}

// Usage with custom objects
interface Person {
  id: number;
  name: string;
}

const people: Person[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" }
];

const result = binarySearchRecursiveWithComparator(
  people,
  { id: 2, name: "Bob" },
  (a, b) => a.id - b.id
);

console.log(result); // Output: 1
