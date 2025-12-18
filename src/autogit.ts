/**
 * Merge two consecutive sorted runs [left, mid) and [mid, right) into `dest`.
 *
 * @param src   The source array that currently holds the data.
 * @param dest  The destination array where the merged result will be written.
 * @param left  Start index of the first run (inclusive).
 * @param mid   Start index of the second run (also the end of the first run).
 * @param right End index of the second run (exclusive).
 * @param cmp   Comparator function – returns negative if a<b, 0 if equal, positive if a>b.
 */
function merge<T>(
  src: T[],
  dest: T[],
  left: number,
  mid: number,
  right: number,
  cmp: (a: T, b: T) => number
): void {
  let i = left;   // cursor for the left run
  let j = mid;    // cursor for the right run
  let k = left;   // cursor for the destination

  while (i < mid && j < right) {
    if (cmp(src[i], src[j]) <= 0) {
      dest[k++] = src[i++];
    } else {
      dest[k++] = src[j++];
    }
  }

  // Copy any leftovers (only one of the two loops will actually run)
  while (i < mid) dest[k++] = src[i++];
  while (j < right) dest[k++] = src[j++];
}

/**
 * Perform a single pass over the whole array, merging runs of size `width`.
 *
 * The source data lives in `src`; the merged result is written to `dest`.
 * After the pass, the roles of the two buffers are swapped by the caller.
 */
function mergePass<T>(
  src: T[],
  dest: T[],
  width: number,
  cmp: (a: T, b: T) => number
): void {
  const n = src.length;
  let i = 0;

  // Merge pairs of runs: [i, i+width) with [i+width, i+2*width)
  while (i + width < n) {
    const left = i;
    const mid = i + width;
    const right = Math.min(i + 2 * width, n);
    merge(src, dest, left, mid, right, cmp);
    i = right;
  }

  // If there is a trailing run that didn't have a partner, just copy it.
  if (i < n) {
    for (let k = i; k < n; ++k) {
      dest[k] = src[k];
    }
  }
}
/**
 * Bottom‑up (iterative) merge sort.
 *
 * @param arr   The array to sort **in‑place**.
 * @param cmp   Optional comparator. If omitted, a default numeric/string comparator is used.
 * @returns The same array reference, now sorted.
 *
 * Complexity: O(n log n) time, O(n) auxiliary space.
 */
export function mergeSortIterative<T>(
  arr: T[],
  cmp?: (a: T, b: T) => number
): T[] {
  // ---------- 1️⃣  Prepare comparator ----------
  const compare: (a: T, b: T) => number =
    cmp ??
    ((a: any, b: any) => {
      // Default works for numbers & strings (and any type that defines < / >)
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });

  const n = arr.length;
  if (n < 2) return arr; // already sorted

  // ---------- 2️⃣  Allocate a second buffer ----------
  // We keep two buffers and ping‑pong between them each pass.
  const buffer = arr.slice(); // shallow copy, same length

  // `src` points to the buffer that currently holds the up‑to‑date data.
  // `dest` is where the next pass will write.
  let src = arr;
  let dest = buffer;

  // ---------- 3️⃣  Repeatedly merge runs of size 1, 2, 4, 8, … ----------
  for (let width = 1; width < n; width *= 2) {
    mergePass(src, dest, width, compare);
    // Swap the roles for the next iteration
    const tmp = src;
    src = dest;
    dest = tmp;
  }

  // ---------- 4️⃣  If the final sorted data lives in the auxiliary buffer,
  // copy it back into the original array (so the caller sees the changes). ----------
  if (src !== arr) {
    for (let i = 0; i < n; ++i) arr[i] = src[i];
  }

  return arr;
}
import { mergeSortIterative } from "./mergeSortIterative";

// ---- Example 1: Numbers (default comparator) ----
const nums = [42, 5, 17, 8, 99, 3];
mergeSortIterative(nums);
console.log(nums); // [3, 5, 8, 17, 42, 99]

// ---- Example 2: Strings ----
const words = ["pear", "apple", "orange", "banana"];
mergeSortIterative(words);
console.log(words); // ["apple", "banana", "orange", "pear"]

// ---- Example 3: Objects with custom comparator ----
type Person = { name: string; age: number };
const people: Person[] = [
  { name: "Alice", age: 31 },
  { name: "Bob", age: 24 },
  { name: "Carol", age: 27 },
];

mergeSortIterative(people, (a, b) => a.age - b.age);
console.log(people);
// [{name:"Bob",age:24}, {name:"Carol",age:27}, {name:"Alice",age:31}]
function isSorted<T>(arr: T[], cmp?: (a: T, b: T) => number): boolean {
  const compare = cmp ?? ((a: any, b: any) => (a < b ? -1 : a > b ? 1 : 0));
  for (let i = 1; i < arr.length; ++i) {
    if (compare(arr[i - 1], arr[i]) > 0) return false;
  }
  return true;
}

// Stress test
for (let n = 0; n < 1000; ++n) {
  const size = Math.floor(Math.random() * 200) + 1;
  const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 1000));
  const copy = arr.slice();
  mergeSortIterative(arr);
  copy.sort((a, b) => a - b);
  if (!isSorted(arr) || arr.some((v, i) => v !== copy[i])) {
    console.error("Mismatch!", { original: copy, sorted: arr });
    break;
  }
}
console.log("All random tests passed!");
// Import the function and sort any array in place:
mergeSortIterative(myArray, (a, b) => a - b); // numeric ascending
