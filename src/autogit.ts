/**
 * Performs binary search on a sorted array
 * 
 * @param array - The sorted array to search
 * @param target - The element to search for
 * @param comparator - Optional comparison function (default: numeric ascending)
 * @returns Index of the target if found, otherwise -1
 */
function binarySearch<T>(
  array: T[],
  target: T,
  comparator: (a: T, b: T) => number = (a, b) => Number(a) - Number(b)
): number {
  let low = 0;
  let high = array.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const comparison = comparator(array[mid], target);

    if (comparison === 0) {
      return mid; // Target found
    } else if (comparison < 0) {
      low = mid + 1; // Search right half
    } else {
      high = mid - 1; // Search left half
    }
  }

  return -1; // Target not found
}
const numbers = [1, 3, 5, 7, 9];
console.log(binarySearch(numbers, 5)); // Output: 2 (index)
console.log(binarySearch(numbers, 4)); // Output: -1 (not found)
const fruits = ["apple", "banana", "cherry", "date"];
const stringComparator = (a: string, b: string) => a.localeCompare(b);
console.log(binarySearch(fruits, "cherry", stringComparator)); // Output: 2
interface Person {
  id: number;
  name: string;
}

const people: Person[] = [
  { id: 1, name: "Alice" },
  { id: 3, name: "Bob" },
  { id: 5, name: "Charlie" }
];

const personComparator = (a: Person, b: Person) => a.id - b.id;
console.log(binarySearch(people, { id: 3, name: '' }, personComparator)); // Output: 1
