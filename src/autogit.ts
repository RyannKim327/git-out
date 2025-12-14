/**
 * Simple Shell sort for numbers (or any type that supports < and >).
 * Returns a new sorted array, leaving the original untouched.
 *
 * @param input - The array to sort.
 * @returns A new array sorted in ascending order.
 */
export function shellSort<T extends number>(input: readonly T[]): T[] {
  // Work on a shallow copy so we don’t mutate the caller’s array.
  const arr = [...input] as T[];

  const n = arr.length;
  // Classic gap sequence: n/2, n/4, ..., 1
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // Perform a gapped insertion sort for this gap size.
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;

      // Shift earlier gap‑sorted elements forward until the correct spot is found.
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = temp;
    }
  }

  return arr;
}

/**
 * Generic Shell sort that accepts a comparator.
 *
 * @param input - The array to sort.
 * @param compareFn - Function returning a negative number if a < b,
 *                    zero if a == b, positive if a > b.
 * @returns A new array sorted according to `compareFn`.
 */
export function shellSortBy<T>(
  input: readonly T[],
  compareFn: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): T[] {
  const arr = [...input] as T[];
  const n = arr.length;

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;

      while (j >= gap && compareFn(arr[j - gap], temp) > 0) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = temp;
    }
  }

  return arr;
}
// Example array
const unsorted = [23, 12, 1, 8, 34, 54, 2, 3];

// 1️⃣ Choose a gap: floor(8/2) = 4
//   Compare indices (0,4), (1,5), (2,6), (3,7)
//   After the inner gapped insertion sort the array might look like:
//   [1, 2, 3, 8, 23, 12, 34, 54]

// 2️⃣ Reduce gap to 2
//   Now we compare (0,2), (1,3), (2,4), …
//   The array becomes more ordered.

// 3️⃣ Reduce gap to 1 (regular insertion sort)
//   Because the array is already “almost sorted”, this final pass is cheap.
// 1️⃣ Sorting numbers (default ascending order)
import { shellSort, shellSortBy } from "./shellSort";

const numbers = [42, 23, 4, 16, 8, 15];
const sortedNumbers = shellSort(numbers);
console.log(sortedNumbers); // [4, 8, 15, 16, 23, 42]

// 2️⃣ Sorting strings (case‑insensitive)
const words = ["Banana", "apple", "Cherry", "date"];
const sortedWords = shellSortBy(words, (a, b) =>
  a.localeCompare(b, undefined, { sensitivity: "base" })
);
console.log(sortedWords); // ["apple", "Banana", "Cherry", "date"]

// 3️⃣ Sorting objects by a numeric property
type Person = { name: string; age: number };
const people: Person[] = [
  { name: "Alice", age: 31 },
  { name: "Bob", age: 22 },
  { name: "Carol", age: 27 },
];

const byAge = shellSortBy(people, (a, b) => a.age - b.age);
console.log(byAge);
// [
//   { name: "Bob", age: 22 },
//   { name: "Carol", age: 27 },
//   { name: "Alice", age: 31 }
// ]
// Example: Knuth sequence
let gap = 1;
while (gap < n / 3) gap = gap * 3 + 1; // largest Knuth gap ≤ n/3

for (; gap > 0; gap = Math.floor(gap / 3)) {
  // ... same inner loops as before ...
}
// shellSort.ts
export function shellSort<T extends number>(input: readonly T[]): T[] {
  const arr = [...input] as T[];
  const n = arr.length;

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = temp;
    }
  }
  return arr;
}

export function shellSortBy<T>(
  input: readonly T[],
  compareFn: (a: T, b: T) => number = (a, b) =>
    a < b ? -1 : a > b ? 1 : 0
): T[] {
  const arr = [...input] as T[];
  const n = arr.length;

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;
      while (j >= gap && compareFn(arr[j - gap], temp) > 0) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = temp;
    }
  }
  return arr;
}

// demo.ts (or any file where you want to use it)
import { shellSort, shellSortBy } from "./shellSort";

const nums = [9, 1, 5, 3, 7];
console.log("Numbers:", shellSort(nums));

type Person = { name: string; age: number };
const people: Person[] = [
  { name: "Zoe", age: 45 },
  { name: "Anna", age: 22 },
  { name: "Mike", age: 31 },
];
console.log(
  "People by age:",
  shellSortBy(people, (a, b) => a.age - b.age)
);
