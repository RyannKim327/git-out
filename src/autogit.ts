function maxWithMath(arr: number[]): number | undefined {
  // If the array is empty we return undefined (Math.max() would give -Infinity)
  return arr.length ? Math.max(...arr) : undefined;
}

// Example
const nums = [3, 7, 2, 9, 5];
console.log(maxWithMath(nums)); // 9
function maxWithReduce(arr: number[]): number | undefined {
  return arr.reduce((max, cur) => (cur > max ? cur : max), -Infinity);
}

// Or, if you want `undefined` for an empty array:
function maxWithReduceOrUndef(arr: number[]): number | undefined {
  if (!arr.length) return undefined;
  return arr.reduce((max, cur) => (cur > max ? cur : max));
}
function maxWithLoop(arr: number[]): number | undefined {
  if (!arr.length) return undefined;

  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    const v = arr[i];
    if (v > max) max = v;
  }
  return max;
}
type Selector<T, R> = (item: T) => R;
type Comparator<R> = (a: R, b: R) => number;

/**
 * Returns the element whose selected value is maximal.
 * If the array is empty, returns undefined.
 */
function maxBy<T, R>(
  arr: T[],
  selector: Selector<T, R>,
  compare: Comparator<R> = (a, b) => (a > b ? 1 : a < b ? -1 : 0)
): T | undefined {
  if (!arr.length) return undefined;

  let best = arr[0];
  let bestKey = selector(best);

  for (let i = 1; i < arr.length; i++) {
    const cur = arr[i];
    const curKey = selector(cur);
    if (compare(curKey, bestKey) > 0) {
      best = cur;
      bestKey = curKey;
    }
  }
  return best;
}

/* ---- Usage examples ---- */

// 1️⃣ Numbers (same as before, but using the generic)
const maxNum = maxBy([4, 2, 9, 1], n => n);
console.log(maxNum); // 9

// 2️⃣ Objects – find the person with the highest score
interface Person {
  name: string;
  score: number;
}
const people: Person[] = [
  { name: 'Alice', score: 12 },
  { name: 'Bob',   score: 17 },
  { name: 'Cara',  score: 15 },
];
const topScorer = maxBy(people, p => p.score);
console.log(topScorer); // { name: 'Bob', score: 17 }

// 3️⃣ Dates – latest date in an array
const dates = [new Date('2023-01-01'), new Date('2024-06-15'), new Date('2022-12-31')];
const latest = maxBy(dates, d => d.getTime());
console.log(latest?.toISOString()); // 2024-06-15T00:00:00.000Z
// src/utils/array.ts
export function maxNumber(arr: number[]): number | undefined {
  return arr.length ? Math.max(...arr) : undefined;
}

/** Generic max‑by selector */
export function maxBy<T, R>(
  arr: T[],
  selector: (item: T) => R,
  compare: (a: R, b: R) => number = (a, b) => (a > b ? 1 : a < b ? -1 : 0)
): T | undefined {
  if (!arr.length) return undefined;

  let best = arr[0];
  let bestKey = selector(best);

  for (let i = 1; i < arr.length; i++) {
    const cur = arr[i];
    const curKey = selector(cur);
    if (compare(curKey, bestKey) > 0) {
      best = cur;
      bestKey = curKey;
    }
  }
  return best;
}
import { maxNumber, maxBy } from '@/utils/array';

const biggest = maxNumber([10, 5, 22]); // 22
const topStudent = maxBy(students, s => s.gpa);
