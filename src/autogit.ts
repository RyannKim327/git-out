function binarySearch(
  arr: number[],
  target: number,
  start: number = 0,
  end: number = arr.length - 1
): number {
  if (start > end) return -1; // Base case: target not found

  const mid = Math.floor((start + end) / 2);

  if (arr[mid] === target) {
    return mid; // Target found
  } else if (target < arr[mid]) {
    return binarySearch(arr, target, start, mid - 1); // Search left half
  } else {
    return binarySearch(arr, target, mid + 1, end); // Search right half
  }
}
function binarySearch<T extends number | string>(
  arr: T[],
  target: T,
  start: number = 0,
  end: number = arr.length - 1
): number {
  if (start > end) return -1;

  const mid = Math.floor((start + end) / 2);

  if (arr[mid] === target) {
    return mid;
  } else if (target < arr[mid]) {
    return binarySearch(arr, target, start, mid - 1);
  } else {
    return binarySearch(arr, target, mid + 1, end);
  }
}
function binarySearch<T>(
  arr: T[],
  target: T,
  comparator: (a: T, b: T) => number = (a, b) => a < b ? -1 : a > b ? 1 : 0,
  start: number = 0,
  end: number = arr.length - 1
): number {
  if (start > end) return -1;

  const mid = Math.floor((start + end) / 2);
  const comparison = comparator(arr[mid], target);

  if (comparison === 0) {
    return mid; // Target found
  } else if (comparison > 0) {
    return binarySearch(arr, target, comparator, start, mid - 1); // Search left
  } else {
    return binarySearch(arr, target, comparator, mid + 1, end); // Search right
  }
}
// Basic number search
const numbers = [1, 3, 5, 7, 9];
console.log(binarySearch(numbers, 5)); // Output: 2

// Generic string search
const fruits = ["apple", "banana", "orange"];
console.log(binarySearch(fruits, "banana")); // Output: 1

// Custom comparator example (search objects)
const users = [
  { id: 1, name: "Alice" },
  { id: 3, name: "Bob" },
  { id: 5, name: "Charlie" }
];

const userComparator = (a: { id: number }, b: { id: number }) => a.id - b.id;
console.log(binarySearch(users, { id: 3 }, userComparator)); // Output: 1
