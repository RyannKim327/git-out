/**
 * In‑place selection sort.
 *
 * @param arr     – The array you want sorted.
 * @param compare – Optional: a function that returns
 *                  a negative number if a < b,
 *                  zero if a == b,
 *                  and a positive number if a > b.
 *                  If omitted, the default < > comparison is used.
 *
 * @returns The sorted array (the same reference that was passed in).
 */
export function selectionSort<T>(
  arr: T[],
  compare?: (a: T, b: T) => number
): T[] {
  const len = arr.length;
  const defaultCompare = (a: T, b: T) => {
    // Works for numbers and strings out of the box.
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  };

  const cmp = compare ?? defaultCompare;

  for (let fillPos = 0; fillPos < len - 1; ++fillPos) {
    // Assume the current position holds the minimum.
    let minIdx = fillPos;

    // Scan the unsorted portion for a new minimum
    for (let searchIdx = fillPos + 1; searchIdx < len; ++searchIdx) {
      if (cmp(arr[searchIdx], arr[minIdx]) < 0) {
        minIdx = searchIdx;
      }
    }

    // Skip the swap if the minimum is already in place
    if (minIdx !== fillPos) {
      [arr[fillPos], arr[minIdx]] = [arr[minIdx], arr[fillPos]];
    }
  }

  return arr;
}
// Numbers – default ascending sort
const nums = [64, 25, 12, 22, 11];
console.log(selectionSort(nums)); // [11, 12, 22, 25, 64]

// Strings – simple ascending sort
console.log(selectionSort(['pear', 'apple', 'orange']));
// ['apple', 'orange', 'pear']

// Custom order – descending
const descending = (a: number, b: number) => b - a;
console.log(selectionSort([1, 5, 3, 2], descending));
// [5, 3, 2, 1]

// Custom objects
interface Person { name: string; age: number }
const people: Person[] = [
  { name: 'Ada',    age: 25 },
  { name: 'Evan',   age: 32 },
  { name: 'Liam',   age: 19 }
];

const ageAsc = (p: Person, q: Person) => p.age - q.age;
console.log(selectionSort(people, ageAsc));
// [
//   { name: 'Liam', age: 19 },
//   { name: 'Ada',  age: 25 },
//   { name: 'Evan', age: 32 }
// ]
