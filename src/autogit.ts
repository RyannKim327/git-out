const numbers: number[] = [42, 7, 19, 3, 100];

// Ascending order (small → large)
const asc = numbers.slice().sort((a, b) => a - b);
console.log(asc); // [3, 7, 19, 42, 100]

// Descending order (large → small)
const desc = numbers.slice().sort((a, b) => b - a);
console.log(desc); // [100, 42, 19, 7, 3]
/**
 * Returns a **new** array sorted in ascending numeric order.
 * The original array is left untouched.
 */
function sortNumbersAsc(arr: readonly number[]): number[] {
  // `Array.from` also clones the array; `slice()` works as well.
  return Array.from(arr).sort((a, b) => a - b);
}

/**
 * Returns a **new** array sorted in descending numeric order.
 */
function sortNumbersDesc(arr: readonly number[]): number[] {
  return Array.from(arr).sort((a, b) => b - a);
}

// Usage
const original = [5, 2, 9, 1];
const asc = sortNumbersAsc(original);   // [1, 2, 5, 9]
const desc = sortNumbersDesc(original); // [9, 5, 2, 1]

console.log(original); // still [5, 2, 9, 1]
const nums = [8, 3, 6];
nums.sort((a, b) => a - b); // nums is now [3, 6, 8]
type Integer = number & { __brand: 'integer' };

function isInteger(n: number): n is Integer {
  return Number.isInteger(n);
}

/**
 * Casts a `number[]` to `Integer[]` after runtime validation.
 * Throws if any element is not an integer.
 */
function asIntegerArray(arr: number[]): Integer[] {
  if (!arr.every(isInteger)) {
    throw new Error('Array contains non‑integer values');
  }
  return arr as Integer[];
}

// Example
const raw = [1, 2, 3.5, 4];
const ints = asIntegerArray(raw); // ❌ throws because 3.5 is not an integer
function sortIntegers(arr: Integer[]): Integer[] {
  return arr.slice().sort((a, b) => a - b);
}
function sortedCopy(arr: readonly number[]): number[] {
  // `readonly` prevents callers from passing a mutable array that we might
  // accidentally modify; we still return a mutable copy.
  return [...arr].sort((a, b) => a - b);
}
interface Item {
  value: number;
  name: string;
}

const items: Item[] = [
  { value: 10, name: 'a' },
  { value: 5,  name: 'b' },
  { value: 10, name: 'c' },
];

// Sort by `value` ascending, then by `name` alphabetically
const sorted = items
  .slice()
  .sort((x, y) => x.value - y.value || x.name.localeCompare(y.name));

console.log(sorted);
// sort-utils.ts
/**
 * Utility functions for sorting numeric arrays in TypeScript.
 * All functions are pure (they never mutate their arguments) unless
 * explicitly documented.
 */

export function sortNumbersAsc(arr: readonly number[]): number[] {
  return [...arr].sort((a, b) => a - b);
}

export function sortNumbersDesc(arr: readonly number[]): number[] {
  return [...arr].sort((a, b) => b - a);
}

/**
 * In‑place version – mutates the supplied array.
 * Use with caution!
 */
export function sortNumbersAscInPlace(arr: number[]): void {
  arr.sort((a, b) => a - b);
}

/* ---------- Optional integer‑only helpers ---------- */

export type Integer = number & { __brand: 'integer' };

export function isInteger(n: number): n is Integer {
  return Number.isInteger(n);
}

/**
 * Throws if any element is not an integer.
 */
export function asIntegerArray(arr: number[]): Integer[] {
  if (!arr.every(isInteger)) {
    throw new Error('Array contains non‑integer values');
  }
  return arr as Integer[];
}

/**
 * Sorts an array that has already been validated as integer‑only.
 */
export function sortIntegers(arr: Integer[]): Integer[] {
  return arr.slice().sort((a, b) => a - b);
}

/* ---------- Demo ---------- */
if (require.main === module) {
  const nums = [42, 7, 19, 3, 100];
  console.log('asc  :', sortNumbersAsc(nums));
  console.log('desc :', sortNumbersDesc(nums));

  const mutable = [...nums];
  sortNumbersAscInPlace(mutable);
  console.log('in‑place:', mutable);
}
// 1️⃣ Simple, non‑mutating ascending sort
const sorted = myArray.slice().sort((a, b) => a - b);

// 2️⃣ In‑place (mutates original)
myArray.sort((a, b) => a - b);

// 3️⃣ Reusable helpers
function sortAsc(arr: readonly number[]) { return [...arr].sort((a, b) => a - b); }
function sortDesc(arr: readonly number[]) { return [...arr].sort((a, b) => b - a); }
