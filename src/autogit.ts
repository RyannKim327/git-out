/**
 * Fibonacci Search
 *
 * @param arr   Sorted array (ascending order) to search in.
 * @param key   Value to find.
 * @returns     Index of `key` in `arr` or -1 if not found.
 *
 * The function works for any type that can be compared with the
 * `<` and `>` operators (e.g., number, string, or a custom object
 * with a comparator supplied via the optional `compare` argument).
 */
export function fibonacciSearch<T>(
  arr: readonly T[],
  key: T,
  compare?: (a: T, b: T) => number
): number {
  // ---------- Helper: default comparator ----------
  const cmp = compare ?? ((a: any, b: any) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  const n = arr.length;
  if (n === 0) return -1;

  // ---------- 1️⃣ Build the smallest Fibonacci number >= n ----------
  // F(k) = F(k-1) + F(k-2) with F(0)=0, F(1)=1
  let fibMm2 = 0; // (k-2)'th Fibonacci number
  let fibMm1 = 1; // (k-1)'th Fibonacci number
  let fibM = fibMm2 + fibMm1; // k'th Fibonacci number

  while (fibM < n) {
    fibMm2 = fibMm1;
    fibMm1 = fibM;
    fibM = fibMm2 + fibMm1;
  }

  // ---------- 2️⃣ offset marks the eliminated front part of the array ----------
  let offset = -1;

  // ---------- 3️⃣ Main loop ----------
  while (fibM > 1) {
    // Calculate the index to be probed.
    // min(offset + fibMm2, n-1) protects us from overflow.
    const i = Math.min(offset + fibMm2, n - 1);

    const comparison = cmp(arr[i], key);

    if (comparison < 0) {
      // key is greater → move three Fibonacci numbers down
      fibM = fibMm1;
      fibMm1 = fibMm2;
      fibMm2 = fibM - fibMm1;
      offset = i; // eliminate subarray [0..i]
    } else if (comparison > 0) {
      // key is smaller → move two Fibonacci numbers down
      fibM = fibMm2;
      fibMm1 = fibMm1 - fibMm2;
      fibMm2 = fibM - fibMm1;
      // offset stays the same
    } else {
      // Found!
      return i;
    }
  }

  // ---------- 4️⃣ Check the last possible element ----------
  // When fibM becomes 1, we have one element left to inspect.
  if (fibMm1 && offset + 1 < n && cmp(arr[offset + 1], key) === 0) {
    return offset + 1;
  }

  // Not found
  return -1;
}
import { fibonacciSearch } from "./fibonacciSearch";

const nums = [1, 3, 5, 8, 13, 21, 34, 55, 89];
console.log(fibonacciSearch(nums, 21)); // → 5
console.log(fibonacciSearch(nums, 4));  // → -1 (not present)
const words = ["apple", "banana", "cherry", "date", "fig", "grape"];
console.log(fibonacciSearch(words, "date"));   // → 3
console.log(fibonacciSearch(words, "orange")); // → -1
type Person = { id: number; name: string };

const people: Person[] = [
  { id: 1, name: "Ada" },
  { id: 3, name: "Bob" },
  { id: 5, name: "Cleo" },
  { id: 7, name: "Dana" },
];

// Comparator that orders by `id`
const byId = (a: Person, b: Person) => a.id - b.id;

const target = { id: 5, name: "" }; // name is irrelevant for the search
console.log(fibonacciSearch(people, target, byId)); // → 2
// fibonacciSearchDemo.ts
import { fibonacciSearch } from "./fibonacciSearch";

function demo() {
  const arr = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
  const targets = [6, 15, 20, 1];

  for (const t of targets) {
    const idx = fibonacciSearch(arr, t);
    console.log(`search(${t}) → ${idx >= 0 ? `found at ${idx}` : "not found"}`);
  }
}

demo();
$ ts-node fibonacciSearchDemo.ts
search(6) → found at 2
search(15) → not found
search(20) → found at 9
search(1) → not found
export function fibonacciSearch<T>(arr: readonly T[], key: T, compare?: (a: T, b: T) => number): number {
  const cmp = compare ?? ((a: any, b: any) => (a < b ? -1 : a > b ? 1 : 0));
  const n = arr.length;
  if (n === 0) return -1;

  let fibMm2 = 0, fibMm1 = 1, fibM = 1;
  while (fibM < n) { fibMm2 = fibMm1; fibMm1 = fibM; fibM = fibMm2 + fibMm1; }

  let offset = -1;
  while (fibM > 1) {
    const i = Math.min(offset + fibMm2, n - 1);
    const c = cmp(arr[i], key);
    if (c < 0) { fibM = fibMm1; fibMm1 = fibMm2; fibMm2 = fibM - fibMm1; offset = i; }
    else if (c > 0) { fibM = fibMm2; fibMm1 = fibMm1 - fibMm2; fibMm2 = fibM - fibMm1; }
    else return i;
  }
  if (fibMm1 && offset + 1 < n && cmp(arr[offset + 1], key) === 0) return offset + 1;
  return -1;
}
