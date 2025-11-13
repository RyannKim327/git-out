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

  if (array[mid] === target) {
    return mid; // Found the target
  } else if (array[mid] < target) {
    // Search right half
    return binarySearchRecursive(array, target, mid + 1, high);
  } else {
    // Search left half
    return binarySearchRecursive(array, target, low, mid - 1);
  }
}
interface BinarySearchResult {
  index: number;
  found: boolean;
}

function binarySearch<T>(
  sortedArray: T[],
  target: T,
  compareFn: (a: T, b: T) => number = (a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }
): BinarySearchResult {
  function recursiveSearch(low: number, high: number): BinarySearchResult {
    if (low > high) {
      return { index: -1, found: false };
    }

    const mid = Math.floor((low + high) / 2);
    const comparison = compareFn(sortedArray[mid], target);

    if (comparison === 0) {
      return { index: mid, found: true };
    } else if (comparison < 0) {
      return recursiveSearch(mid + 1, high);
    } else {
      return recursiveSearch(low, mid - 1);
    }
  }

  return recursiveSearch(0, sortedArray.length - 1);
}
// Example with numbers
const numbers = [1, 3, 5, 7, 9, 11, 13, 15];
const result1 = binarySearch(numbers, 7);
console.log(result1); // { index: 3, found: true }

// Example with strings
const strings = ["apple", "banana", "cherry", "date", "elderberry"];
const result2 = binarySearch(strings, "cherry");
console.log(result2); // { index: 2, found: true }

// Example with custom objects
interface Person {
  id: number;
  name: string;
}

const people: Person[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" }
];

const result3 = binarySearch(
  people,
  { id: 2, name: "Bob" },
  (a, b) => a.id - b.id
);
console.log(result3); // { index: 1, found: true }
// Empty array
const emptyResult = binarySearch([], 5);
console.log(emptyResult); // { index: -1, found: false }

// Target not found
const notFound = binarySearch([1, 2, 3], 5);
console.log(notFound); // { index: -1, found: false }

// Single element array
const singleResult = binarySearch([42], 42);
console.log(singleResult); // { index: 0, found: true }
function binarySearchIterative<T>(
  sortedArray: T[],
  target: T,
  compareFn?: (a: T, b: T) => number
): BinarySearchResult {
  let low = 0;
  let high = sortedArray.length - 1;
  
  const compare = compareFn || ((a: T, b: T) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const comparison = compare(sortedArray[mid], target);

    if (comparison === 0) {
      return { index: mid, found: true };
    } else if (comparison < 0) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return { index: -1, found: false };
}
