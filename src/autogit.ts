const numbers = [3, 7, 2, 9, 5];

// Spread + Math.max
const max = Math.max(...numbers);
console.log(max); // 9
function maxByReduce(arr: number[]): number | undefined {
  if (arr.length === 0) return undefined; // or throw, or return -Infinity

  return arr.reduce((max, cur) => (cur > max ? cur : max));
}

// Example
const max = maxByReduce([3, 7, 2, 9, 5]); // 9
type Comparator<T> = (a: T, b: T) => number;

/**
 * Returns the greatest element of `arr` according to `compare`.
 * If `arr` is empty, returns `undefined` (or you can change the return type).
 */
function max<T>(arr: readonly T[], compare: Comparator<T>): T | undefined {
  if (arr.length === 0) return undefined;

  return arr.reduce((best, cur) => (compare(cur, best) > 0 ? cur : best));
}

/* ---------- Usage examples ---------- */

// 1️⃣ Numbers (default comparator)
const nums = [10, 4, 22, 7];
const maxNum = max(nums, (a, b) => a - b); // 22

// 2️⃣ Strings (lexicographic)
const words = ['apple', 'orange', 'banana'];
const maxWord = max(words, (a, b) => a.localeCompare(b)); // 'orange'

// 3️⃣ Objects (compare by a numeric field)
interface Person { name: string; age: number; }
const people: Person[] = [
  { name: 'Alice', age: 31 },
  { name: 'Bob',   age: 27 },
  { name: 'Cara',  age: 45 },
];
const oldest = max(people, (a, b) => a.age - b.age); // { name: 'Cara', age: 45 }
function maxByLoop(arr: number[]): number | undefined {
  if (arr.length === 0) return undefined;

  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    const v = arr[i];
    if (v > max) max = v;
  }
  return max;
}
// utils/max.ts
export type Comparator<T> = (a: T, b: T) => number;

/**
 * Generic max utility.
 *
 * @param arr      The array to search (read‑only is accepted).
 * @param compare  Function that returns a positive number if `a > b`,
 *                 zero if equal, negative if `a < b`.
 * @param options  Optional behaviour tweaks.
 *
 * @returns The greatest element, or `options.default` if the array is empty.
 */
export function max<T>(
  arr: readonly T[],
  compare: Comparator<T>,
  options?: { default?: T }
): T | undefined {
  if (arr.length === 0) return options?.default;

  return arr.reduce((best, cur) => (compare(cur, best) > 0 ? cur : best));
}

/* ---------- Convenience overloads for the most common cases ---------- */

export const maxNumber = (arr: readonly number[], defaultVal?: number) =>
  max(arr, (a, b) => a - b, { default: defaultVal });

export const maxString = (arr: readonly string[], defaultVal?: string) =>
  max(arr, (a, b) => a.localeCompare(b), { default: defaultVal });

export const maxBy = <T, K extends keyof T>(
  arr: readonly T[],
  key: K,
  defaultVal?: T
) =>
  max(
    arr,
    (a, b) => {
      const av = a[key] as unknown as number;
      const bv = b[key] as unknown as number;
      return (av as number) - (bv as number);
    },
    { default: defaultVal }
  );
import { maxNumber, maxString, maxBy } from './utils/max';

console.log(maxNumber([5, 2, 9]));               // 9
console.log(maxString(['cat', 'dog', 'bee']));  // 'dog'

interface Product { name: string; price: number; }
const catalog: Product[] = [
  { name: 'Pen',   price: 1.2 },
  { name: 'Book',  price: 12.5 },
  { name: 'Desk',  price: 150 },
];
console.log(maxBy(catalog, 'price')); // { name: 'Desk', price: 150 }
