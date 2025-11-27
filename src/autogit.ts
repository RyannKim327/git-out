/**
 * Merge two sorted arrays into one sorted array
 * @param left - First sorted array
 * @param right - Second sorted array
 * @returns Merged sorted array
 */
function merge<T>(left: T[], right: T[]): T[] {
  const result: T[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  // Compare elements and merge
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  // Concatenate remaining elements
  return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}

/**
 * Recursive Merge Sort implementation
 * @param array - Array to sort
 * @returns Sorted array
 */
function mergeSort<T>(array: T[]): T[] {
  // Base case: arrays with 0 or 1 element are already sorted
  if (array.length <= 1) {
    return array;
  }

  // Divide array into two halves
  const mid = Math.floor(array.length / 2);
  const left = array.slice(0, mid);
  const right = array.slice(mid);

  // Recursively sort and merge
  return merge(mergeSort(left), mergeSort(right));
}

// Example Usage
const numbers = [38, 27, 43, 10];
console.log(mergeSort(numbers)); // [10, 27, 38, 43]

const strings = ['banana', 'apple', 'date', 'cherry'];
console.log(mergeSort(strings)); // ['apple', 'banana', 'cherry', 'date']
function mergeSortWithComparator<T>(
  array: T[],
  comparator: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0
): T[] {
  // Same implementation as mergeSort, but use comparator instead of <=
}

// Example usage with custom objects
const users = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 35 }
];

const sortedByAge = mergeSortWithComparator(users, (a, b) => a.age - b.age);
