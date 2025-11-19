function binarySearchRecursive<T>(
  array: T[],
  target: T,
  left: number = 0,
  right: number = array.length - 1
): number {
  // Base case: element not found
  if (left > right) {
    return -1;
  }

  // Calculate middle index
  const mid = Math.floor((left + right) / 2);
  const midValue = array[mid];

  // Found the target
  if (midValue === target) {
    return mid;
  }

  // Search left half
  if (target < midValue) {
    return binarySearchRecursive(array, target, left, mid - 1);
  }

  // Search right half
  return binarySearchRecursive(array, target, mid + 1, right);
}
function binarySearchRecursive<T>(
  array: T[],
  target: T,
  comparator?: (a: T, b: T) => number,
  left: number = 0,
  right: number = array.length - 1
): number {
  if (left > right) {
    return -1;
  }

  const mid = Math.floor((left + right) / 2);
  const midValue = array[mid];

  // Use comparator if provided, otherwise use default comparison
  const compare = comparator 
    ? comparator(midValue, target)
    : (midValue as unknown as number) - (target as unknown as number);

  if (compare === 0) {
    return mid;
  }

  if (compare > 0) {
    return binarySearchRecursive(array, target, comparator, left, mid - 1);
  }

  return binarySearchRecursive(array, target, comparator, mid + 1, right);
}
// Example 1: Basic usage with numbers
const numbers = [1, 3, 5, 7, 9, 11, 13, 15];
console.log(binarySearchRecursive(numbers, 7)); // Output: 3
console.log(binarySearchRecursive(numbers, 12)); // Output: -1

// Example 2: With custom comparator for objects
interface Person {
  id: number;
  name: string;
}

const people: Person[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" }
];

const result = binarySearchRecursive(
  people,
  { id: 2, name: "Bob" } as Person,
  (a, b) => a.id - b.id
);
console.log(result); // Output: 1

// Example 3: With strings
const fruits = ["apple", "banana", "cherry", "date", "elderberry"];
console.log(binarySearchRecursive(fruits, "cherry")); // Output: 2
function binarySearchIterative<T>(
  array: T[],
  target: T,
  comparator?: (a: T, b: T) => number
): number {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midValue = array[mid];

    const compare = comparator 
      ? comparator(midValue, target)
      : (midValue as unknown as number) - (target as unknown as number);

    if (compare === 0) {
      return mid;
    }

    if (compare > 0) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return -1;
}
