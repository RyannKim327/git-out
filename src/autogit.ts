function binarySearchRecursive<T>(
  sortedArray: T[],
  target: T,
  left: number = 0,
  right: number = sortedArray.length - 1
): number {
  // Base case: search space is exhausted
  if (left > right) {
    return -1; // Element not found
  }

  // Calculate middle index
  const mid = Math.floor((left + right) / 2);
  const midValue = sortedArray[mid];

  // Found the target
  if (midValue === target) {
    return mid;
  }

  // Search in left half
  if (target < midValue) {
    return binarySearchRecursive(sortedArray, target, left, mid - 1);
  }

  // Search in right half
  return binarySearchRecursive(sortedArray, target, mid + 1, right);
}
function binarySearchRecursiveGeneric<T>(
  sortedArray: T[],
  target: T,
  compareFn: (a: T, b: T) => number = (a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  },
  left: number = 0,
  right: number = sortedArray.length - 1
): number {
  if (left > right) {
    return -1;
  }

  const mid = Math.floor((left + right) / 2);
  const comparison = compareFn(target, sortedArray[mid]);

  if (comparison === 0) {
    return mid;
  }

  if (comparison < 0) {
    return binarySearchRecursiveGeneric(
      sortedArray, 
      target, 
      compareFn, 
      left, 
      mid - 1
    );
  }

  return binarySearchRecursiveGeneric(
    sortedArray, 
    target, 
    compareFn, 
    mid + 1, 
    right
  );
}
// Example with numbers
const numbers = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
console.log(binarySearchRecursive(numbers, 7)); // Output: 3
console.log(binarySearchRecursive(numbers, 10)); // Output: -1

// Example with strings
const words = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
console.log(binarySearchRecursive(words, 'cherry')); // Output: 2

// Example with custom objects using comparator
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

const personIdComparator = (a: Person, b: Person) => a.id - b.id;
console.log(binarySearchRecursiveGeneric(
  people, 
  { id: 3, name: 'Charlie' }, 
  personIdComparator
)); // Output: 2
function binarySearchFirstOccurrence<T>(
  sortedArray: T[],
  target: T,
  left: number = 0,
  right: number = sortedArray.length - 1
): number {
  if (left > right) {
    return -1;
  }

  const mid = Math.floor((left + right) / 2);

  if (sortedArray[mid] === target) {
    // Check if this is the first occurrence
    if (mid === 0 || sortedArray[mid - 1] !== target) {
      return mid;
    }
    // Continue searching left for earlier occurrence
    return binarySearchFirstOccurrence(sortedArray, target, left, mid - 1);
  }

  if (target < sortedArray[mid]) {
    return binarySearchFirstOccurrence(sortedArray, target, left, mid - 1);
  }

  return binarySearchFirstOccurrence(sortedArray, target, mid + 1, right);
}
