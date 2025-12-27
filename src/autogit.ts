/** Returns a negative number if a < b, 0 if a == b, positive if a > b */
type Comparator<T> = (a: T, b: T) => number;
const defaultComparator = <T extends number | string>(a: T, b: T): number => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};
/**
 * Sorts `arr` in place using the QuickSort algorithm.
 *
 * @param arr        The array to sort.
 * @param left       Left index of the sub‑array (default 0).
 * @param right      Right index of the sub‑array (default arr.length‑1).
 * @param compare    Optional comparator; defaults to a numeric/string comparator.
 */
export function quickSortInPlace<T>(
  arr: T[],
  left: number = 0,
  right: number = arr.length - 1,
  compare: Comparator<T> = defaultComparator as Comparator<T>
): void {
  // Base case – a sub‑array of length 0 or 1 is already sorted
  if (left >= right) return;

  // Partition the array and get the pivot's final index
  const pivotIndex = partition(arr, left, right, compare);

  // Recursively sort the two halves
  quickSortInPlace(arr, left, pivotIndex - 1, compare);
  quickSortInPlace(arr, pivotIndex + 1, right, compare);
}

/**
 * Partition step of QuickSort.
 *
 * It picks the element at `right` as the pivot, then moves all elements
 * smaller than the pivot to the left side and returns the final pivot index.
 */
function partition<T>(
  arr: T[],
  left: number,
  right: number,
  compare: Comparator<T>
): number {
  const pivot = arr[right]; // choose last element as pivot
  let i = left - 1; // index of the smaller element

  for (let j = left; j < right; j++) {
    if (compare(arr[j], pivot) <= 0) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
    }
  }

  // Place pivot after the last smaller element
  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
  return i + 1;
}
/**
 * Returns a **new** sorted array, leaving the original untouched.
 *
 * @param arr      The array to sort.
 * @param compare  Optional comparator.
 */
export function quickSort<T>(
  arr: readonly T[],
  compare: Comparator<T> = defaultComparator as Comparator<T>
): T[] {
  // Clone the array so we can sort it in place without affecting the caller
  const copy = [...arr];
  quickSortInPlace(copy, 0, copy.length - 1, compare);
  return copy;
}
import { quickSort, quickSortInPlace } from "./quicksort";

const nums = [5, 2, 9, 1, 5, 6];

// In‑place (mutates `nums`)
quickSortInPlace(nums);
console.log(nums); // [1, 2, 5, 5, 6, 9]

// Pure (does not mutate)
const sorted = quickSort([3, 1, 4, 1, 5, 9]);
console.log(sorted); // [1, 1, 3, 4, 5, 9]
const words = ["banana", "apple", "cherry"];
quickSortInPlace(words);
console.log(words); // ["apple", "banana", "cherry"]
interface Person {
  name: string;
  age: number;
}

const people: Person[] = [
  { name: "Alice", age: 32 },
  { name: "Bob",   age: 24 },
  { name: "Carol", age: 29 },
];

// Sort by age ascending
const byAge: Comparator<Person> = (a, b) => a.age - b.age;

quickSortInPlace(people, 0, people.length - 1, byAge);
console.log(people);
// [
//   { name: "Bob",   age: 24 },
//   { name: "Carol", age: 29 },
//   { name: "Alice", age: 32 }
// ]

// Or use the pure version
const sortedByName = quickSort(people, (a, b) => a.name.localeCompare(b.name));
console.log(sortedByName);
// quicksort.ts
type Comparator<T> = (a: T, b: T) => number;

const defaultComparator = <T extends number | string>(a: T, b: T): number => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

export function quickSortInPlace<T>(
  arr: T[],
  left: number = 0,
  right: number = arr.length - 1,
  compare: Comparator<T> = defaultComparator as Comparator<T>
): void {
  if (left >= right) return;

  const pivotIdx = partition(arr, left, right, compare);
  quickSortInPlace(arr, left, pivotIdx - 1, compare);
  quickSortInPlace(arr, pivotIdx + 1, right, compare);
}

function partition<T>(
  arr: T[],
  left: number,
  right: number,
  compare: Comparator<T>
): number {
  // Optional: randomise pivot to improve worst‑case behaviour
  // const randIdx = left + Math.floor(Math.random() * (right - left + 1));
  // [arr[randIdx], arr[right]] = [arr[right], arr[randIdx]];

  const pivot = arr[right];
  let i = left - 1;

  for (let j = left; j < right; j++) {
    if (compare(arr[j], pivot) <= 0) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
  return i + 1;
}

/**
 * Pure version – returns a new sorted array.
 */
export function quickSort<T>(
  arr: readonly T[],
  compare: Comparator<T> = defaultComparator as Comparator<T>
): T[] {
  const copy = [...arr];
  quickSortInPlace(copy, 0, copy.length - 1, compare);
  return copy;
}
