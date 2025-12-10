function binarySearch<T>(
  sortedArray: T[],
  target: T,
  compareFn?: (a: T, b: T) => number
): number {
  let left = 0;
  let right = sortedArray.length - 1;
  
  // Default comparison function for numbers/strings
  const comparator = compareFn || ((a: T, b: T) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const comparison = comparator(sortedArray[mid], target);

    if (comparison === 0) {
      return mid; // Found the target
    } else if (comparison < 0) {
      left = mid + 1; // Search in the right half
    } else {
      right = mid - 1; // Search in the left half
    }
  }

  return -1; // Target not found
}
// Example with numbers
const numbers = [1, 3, 5, 7, 9, 11, 13, 15];
console.log(binarySearch(numbers, 7)); // Output: 3
console.log(binarySearch(numbers, 10)); // Output: -1

// Example with strings
const names = ['alice', 'bob', 'charlie', 'david', 'eve'];
console.log(binarySearch(names, 'charlie')); // Output: 2

// Example with custom objects
interface Person {
  id: number;
  name: string;
}

const people: Person[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

const result = binarySearch(people, { id: 2, name: 'Bob' } as Person, 
  (a, b) => a.id - b.id
);
console.log(result); // Output: 1
function binarySearchRecursive<T>(
  sortedArray: T[],
  target: T,
  compareFn?: (a: T, b: T) => number,
  left: number = 0,
  right: number = sortedArray.length - 1
): number {
  const comparator = compareFn || ((a: T, b: T) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  if (left > right) {
    return -1; // Base case: target not found
  }

  const mid = Math.floor((left + right) / 2);
  const comparison = comparator(sortedArray[mid], target);

  if (comparison === 0) {
    return mid;
  } else if (comparison < 0) {
    return binarySearchRecursive(sortedArray, target, comparator, mid + 1, right);
  } else {
    return binarySearchRecursive(sortedArray, target, comparator, left, mid - 1);
  }
}
function binarySearchWithConstraint<T extends number | string>(
  sortedArray: T[],
  target: T
): number {
  let left = 0;
  let right = sortedArray.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (sortedArray[mid] === target) {
      return mid;
    } else if (sortedArray[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}
