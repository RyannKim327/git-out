function binarySearchRecursive<T>(
  arr: T[],
  target: T,
  left: number = 0,
  right: number = arr.length - 1
): number {
  // Base case: search range is invalid
  if (left > right) {
    return -1;
  }

  // Calculate middle index
  const mid = Math.floor((left + right) / 2);

  // Found the target
  if (arr[mid] === target) {
    return mid;
  }

  // Target is in left half
  if (arr[mid] > target) {
    return binarySearchRecursive(arr, target, left, mid - 1);
  }

  // Target is in right half
  return binarySearchRecursive(arr, target, mid + 1, right);
}
function binarySearchRecursive<T>(
  arr: T[],
  target: T,
  left: number = 0,
  right: number = arr.length - 1,
  comparator?: (a: T, b: T) => number
): number {
  if (left > right) {
    return -1;
  }

  const mid = Math.floor((left + right) / 2);
  const compare = comparator || ((a: T, b: T) => (a < b ? -1 : a > b ? 1 : 0));
  const comparison = compare(arr[mid], target);

  if (comparison === 0) {
    return mid;
  }

  if (comparison > 0) {
    return binarySearchRecursive(arr, target, left, mid - 1, comparator);
  }

  return binarySearchRecursive(arr, target, mid + 1, right, comparator);
}
// Example 1: Basic usage with numbers
const numbers = [1, 3, 5, 7, 9, 11, 13, 15];
console.log(binarySearchRecursive(numbers, 7)); // Output: 3
console.log(binarySearchRecursive(numbers, 10)); // Output: -1

// Example 2: With strings
const words = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
console.log(binarySearchRecursive(words, 'cherry')); // Output: 2

// Example 3: With custom comparator for objects
interface Person {
  id: number;
  name: string;
}

const people: Person[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
  { id: 4, name: 'Diana' }
];

const personComparator = (a: Person, b: Person) => a.id - b.id;
console.log(binarySearchRecursive(people, { id: 3, name: '' }, 0, people.length - 1, personComparator)); // Output: 2
function binarySearch<T>(
  arr: T[],
  target: T,
  comparator?: (a: T, b: T) => number
): number {
  const compare = comparator || ((a: T, b: T) => (a < b ? -1 : a > b ? 1 : 0));
  
  function recursiveSearch(left: number, right: number): number {
    if (left > right) return -1;
    
    const mid = Math.floor((left + right) / 2);
    const comparison = compare(arr[mid], target);
    
    if (comparison === 0) return mid;
    if (comparison > 0) return recursiveSearch(left, mid - 1);
    return recursiveSearch(mid + 1, right);
  }
  
  return recursiveSearch(0, arr.length - 1);
}
