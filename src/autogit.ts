/**
 * In-place insertion sort.
 * Default: ascending order for primitive types.
 * O(n²) time, O(1) space.
 */
function insertionSort<T>(
  arr: T[],
  compare: (a: T, b: T) => number = (a, b) => (a > b ? 1 : a < b ? -1 : 0)
): T[] {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    while (j >= 0 && compare(arr[j], key) > 0) {
      arr[j + 1] = arr[j]; // shift right
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

/* ---------- Usage examples ---------- */

// 1. Numbers (ascending)
const nums = [5, 2, 9, 1, 5, 6];
console.log(insertionSort(nums)); // [1, 2, 5, 5, 6, 9]

// 2. Strings (descending)
const words = ['pear', 'apple', 'orange'];
console.log(insertionSort(words, (a, b) => b.localeCompare(a)));
// ["pear", "orange", "apple"]

// 3. Objects by property
interface Person { name: string; age: number; }
const people: Person[] = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 22 },
  { name: 'Eve', age: 25 }
];
insertionSort(people, (a, b) => a.age - b.age);
console.log(people); // ordered by ascending age
tsc insertion.ts
node insertion.js
