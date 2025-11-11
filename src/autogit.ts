/**
 * In-place bubble sort (ascending).
 * Mutates the original array and also returns it for chaining.
 * Time-complexity:  O(n²)
 * Space-complexity: O(1)
 */
function bubbleSort<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
  const cmp =
    compareFn ??
    ((a: T, b: T) => (a as any) - (b as any)); // works for numbers, strings, etc.

  const n = arr.length;
  let swapped: boolean;

  do {
    swapped = false;
    for (let i = 1; i < n; i++) {
      if (cmp(arr[i - 1], arr[i]) > 0) {
        [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]]; // swap
        swapped = true;
      }
    }
    // After each outer pass the largest element among the unsorted
    // section is already in its final position, so we can shorten
    // the inner loop by one on the next pass (optional optimisation).
  } while (swapped);

  return arr;
}

/* ---------- Usage examples ---------- */

// 1. Numbers
const nums = [64, 34, 25, 12, 22, 11, 90];
console.log(bubbleSort(nums)); // [11, 12, 22, 25, 34, 64, 90]

// 2. Strings (alphabetical)
const words = ['pear', 'banana', 'apple', 'orange'];
console.log(bubbleSort(words)); // ["apple", "banana", "orange", "pear"]

// 3. Objects by custom field (descending age)
interface Person { name: string; age: number }
const people: Person[] = [
  { name: 'Alice', age: 30 },
  { name: 'Bob',  age: 25 },
  { name: 'Eve',  age: 35 }
];
bubbleSort(people, (a, b) => b.age - a.age);
console.log(people); // Eve (35), Alice (30), Bob (25)
tsc bubble.ts
node bubble.js
