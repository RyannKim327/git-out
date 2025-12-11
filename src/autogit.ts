/**
 * Shell sort for an array of numbers.
 * The function sorts the array *in place* and also returns it for convenience.
 *
 * @param arr - The array to sort.
 * @returns The same array, now sorted in ascending order.
 */
export function shellSort(arr: number[]): number[] {
  const n = arr.length;

  // ---- Tokuda gap sequence (pre‑computed up to a reasonable size) ----
  //   g(k) = Math.ceil( ( (9 * Math.pow(9/4, k)) - 4 ) / 5 )
  //   We generate gaps until they exceed n.
  const gaps: number[] = [];
  for (let k = 1; ; k++) {
    const gap = Math.ceil((9 * Math.pow(9 / 4, k) - 4) / 5);
    if (gap > n) break;
    gaps.unshift(gap); // store in descending order
  }

  // ---- Main sorting loops ----
  for (const gap of gaps) {
    // Perform a gapped insertion sort
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;

      // Shift earlier gap‑sorted elements forward until the correct spot is found
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
 * Generic Shell Sort.
 *
 * @param arr - The array to sort (will be mutated).
 * @param compare - Comparator returning <0 if a<b, 0 if equal, >0 if a>b.
 * @returns The same array, now sorted.
 */
export function shellSortGeneric<T>(
  arr: T[],
  compare: (a: T, b: T) => number = (a, b) => (a as any) - (b as any)
): T[] {
  const n = arr.length;

  // ---- Tokuda gaps (same as before) ----
  const gaps: number[] = [];
  for (let k = 1; ; k++) {
    const gap = Math.ceil((9 * Math.pow(9 / 4, k) - 4) / 5);
    if (gap > n) break;
    gaps.unshift(gap);
  }

  // ---- Sorting ----
  for (const gap of gaps) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;

      while (j >= gap && compare(arr[j - gap], temp) > 0) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = temp;
    }
  }

  return arr;
}
// 1️⃣ Numeric array
import { shellSort } from "./shellSort";

const numbers = [23, 12, 1, 8, 34, 54, 2, 3];
console.log(shellSort(numbers)); // → [1,2,3,8,12,23,34,54]

// 2️⃣ Sorting strings (lexicographically)
import { shellSortGeneric } from "./shellSort";

const words = ["banana", "apple", "cherry", "date"];
shellSortGeneric(words, (a, b) => a.localeCompare(b));
console.log(words); // → ["apple","banana","cherry","date"]

// 3️⃣ Sorting objects by a property
type Person = { name: string; age: number };
const people: Person[] = [
  { name: "Alice", age: 32 },
  { name: "Bob", age: 24 },
  { name: "Carol", age: 29 },
];

shellSortGeneric(people, (a, b) => a.age - b.age);
console.log(people);
// → [{name:"Bob",age:24},{name:"Carol",age:29},{name:"Alice",age:32}]
// Simple halving sequence: n/2, n/4, ..., 1
for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
  // ... same inner loops ...
}
function isSorted<T>(arr: T[], compare = (a: any, b: any) => a - b): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (compare(arr[i - 1], arr[i]) > 0) return false;
  }
  return true;
}

// Random test
for (let size = 0; size < 1000; size++) {
  const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 1000));
  const copy = [...arr];
  shellSort(arr);
  if (!isSorted(arr)) {
    console.error("Failed on size", size, copy, arr);
    break;
  }
}
console.log("All good!");
export function shellSort<T>(arr: T[], cmp = (a: any, b: any) => a - b): T[] {
  const n = arr.length;
  const gaps: number[] = [];
  for (let k = 1; ; k++) {
    const g = Math.ceil((9 * Math.pow(9 / 4, k) - 4) / 5);
    if (g > n) break;
    gaps.unshift(g);
  }
  for (const gap of gaps) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;
      while (j >= gap && cmp(arr[j - gap], temp) > 0) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = temp;
    }
  }
  return arr;
}
