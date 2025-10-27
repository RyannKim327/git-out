function binarySearchRecursive<T>(
  arr: T[],
  target: T,
  left: number = 0,
  right: number = arr.length - 1
): number {
  // Base case: element not found
  if (left > right) {
    return -1;
  }

  // Find the middle index
  const mid = Math.floor((left + right) / 2);

  // Check if we found the target
  if (arr[mid] === target) {
    return mid;
  }

  // If target is smaller, search left half
  if (target < arr[mid]) {
    return binarySearchRecursive(arr, target, left, mid - 1);
  }

  // If target is larger, search right half
  return binarySearchRecursive(arr, target, mid + 1, right);
}
interface BinarySearchResult<T> {
  index: number;
  element: T | null;
}

function binarySearch<T>(
  sortedArray: T[],
  target: T,
  left: number = 0,
  right: number = sortedArray.length - 1
): BinarySearchResult<T> {
  // Input validation
  if (sortedArray.length === 0) {
    return { index: -1, element: null };
  }

  if (left > right) {
    return { index: -1, element: null };
  }

  const mid = Math.floor((left + right) / 2);
  const midElement = sortedArray[mid];

  if (midElement === target) {
    return { index: mid, element: midElement };
  }

  if (target < midElement) {
    return binarySearch(sortedArray, target, left, mid - 1);
  }

  return binarySearch(sortedArray, target, mid + 1, right);
}
// Example with numbers
const numbers = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
console.log(binarySearch(numbers, 7)); // { index: 3, element: 7 }
console.log(binarySearch(numbers, 20)); // { index: -1, element: null }

// Example with strings
const names = ['alice', 'bob', 'charlie', 'david', 'eve'];
console.log(binarySearch(names, 'charlie')); // { index: 2, element: 'charlie' }

// Example with custom objects
interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
  { id: 4, name: 'David' },
];

// Search by id using a custom comparator
function binarySearchWithComparator<T>(
  sortedArray: T[],
  target: T,
  comparator: (a: T, b: T) => number,
  left: number = 0,
  right: number = sortedArray.length - 1
): number {
  if (left > right) return -1;

  const mid = Math.floor((left + right) / 2);
  const comparison = comparator(sortedArray[mid], target);

  if (comparison === 0) return mid;
  if (comparison > 0) return binarySearchWithComparator(sortedArray, target, comparator, left, mid - 1);
  return binarySearchWithComparator(sortedArray, target, comparator, mid + 1, right);
}

// Search users by id
const userComparator = (a: User, b: User) => a.id - b.id;
const userIndex = binarySearchWithComparator(users, { id: 3, name: '' }, userComparator);
console.log(userIndex); // 2
function binarySearch<T>(sortedArray: T[], target: T): number {
  function search(left: number, right: number): number {
    if (left > right) return -1;
    
    const mid = Math.floor((left + right) / 2);
    
    if (sortedArray[mid] === target) return mid;
    if (target < sortedArray[mid]) return search(left, mid - 1);
    return search(mid + 1, right);
  }
  
  return search(0, sortedArray.length - 1);
}
