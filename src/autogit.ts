const numbers = [3, 7, 2, 9, 5];

// Spread + Math.max
const max = Math.max(...numbers);
console.log(max); // 9
function maxByReduce(arr: number[]): number {
  if (arr.length === 0) {
    throw new Error('maxByReduce: empty array');
  }
  return arr.reduce((max, cur) => (cur > max ? cur : max));
}

// Example
const max = maxByReduce([3, 7, 2, 9, 5]); // 9
function maxByLoop(arr: number[]): number {
  if (arr.length === 0) {
    throw new Error('maxByLoop: empty array');
  }

  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    const v = arr[i];
    if (v > max) max = v;
  }
  return max;
}
type Comparator<T> = (a: T, b: T) => number;

/**
 * Returns the maximum element according to `compare`.
 * Throws if the array is empty.
 */
function maxBy<T>(arr: T[], compare: Comparator<T>): T {
  if (arr.length === 0) {
    throw new Error('maxBy: empty array');
  }

  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (compare(arr[i], max) > 0) {
      max = arr[i];
    }
  }
  return max;
}

/* ---- Usage examples ---- */

// Numbers (re‑use the built‑in comparator)
const maxNum = maxBy([3, 7, 2, 9, 5], (a, b) => a - b); // 9

// Strings (lexicographic)
const maxStr = maxBy(['apple', 'orange', 'banana'], (a, b) => a.localeCompare(b));
// "orange"

// Objects – find the person with the highest score
interface Person {
  name: string;
  score: number;
}
const people: Person[] = [
  { name: 'Alice', score: 42 },
  { name: 'Bob',   score: 57 },
  { name: 'Cara',  score: 31 },
];
const topScorer = maxBy(people, (a, b) => a.score - b.score);
// { name: 'Bob', score: 57 }
// utils/max.ts
export function max<T>(arr: readonly T[], compare: Comparator<T>): T {
  if (arr.length === 0) {
    throw new Error('max: empty array');
  }
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    const cur = arr[i];
    if (compare(cur, max) > 0) max = cur;
  }
  return max;
}

// Example import
import { max } from './utils/max';

const maxDate = max(
  [new Date('2023-01-01'), new Date('2024-06-15'), new Date('2022-12-31')],
  (a, b) => a.getTime() - b.getTime()
);
// => 2024‑06‑15T00:00:00.000Z
/**
 * Returns the maximum element or a fallback if the array is empty.
 *
 * @param arr       The array to search.
 * @param compare   Comparator that returns a positive number when a > b.
 * @param fallback  Optional value to return when `arr` is empty.
 */
function maxOr<T>(
  arr: readonly T[],
  compare: Comparator<T>,
  fallback?: T
): T | undefined {
  if (arr.length === 0) {
    return fallback;
  }

  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    const cur = arr[i];
    if (compare(cur, max) > 0) max = cur;
  }
  return max;
}

// Usage
const maxAge = maxOr(
  [{ age: 21 }, { age: 34 }, { age: 19 }],
  (a, b) => a.age - b.age,
  { age: 0 } // fallback if the list is empty
);
console.log(maxAge?.age); // 34
// Numeric array, throws on empty
const max = (arr: number[]) => {
  if (!arr.length) throw new Error('empty array');
  return Math.max(...arr);
};
const maxBy = <T>(arr: T[], cmp: (a: T, b: T) => number): T => {
  if (!arr.length) throw new Error('empty array');
  return arr.reduce((m, c) => (cmp(c, m) > 0 ? c : m));
};
