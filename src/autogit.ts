function maxWithSpread(arr: number[]): number | undefined {
  // Guard against an empty array – Math.max([]) returns -Infinity,
  // which is rarely what you want.
  return arr.length ? Math.max(...arr) : undefined;
}

// Example
const nums = [3, 7, 2, 9, 5];
console.log(maxWithSpread(nums)); // 9
function maxWithReduce(arr: number[]): number | undefined {
  return arr.reduce((max, cur) => (cur > max ? cur : max), -Infinity);
}

// If you want `undefined` for an empty array:
function maxWithReduceSafe(arr: number[]): number | undefined {
  return arr.length ? arr.reduce((max, cur) => (cur > max ? cur : max)) : undefined;
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
type Comparator<T> = (a: T, b: T) => number; // <0 if a<b, 0 if equal, >0 if a>b

function maxBy<T>(arr: T[], compare: Comparator<T>): T | undefined {
  if (!arr.length) return undefined;

  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (compare(arr[i], max) > 0) max = arr[i];
  }
  return max;
}

// ---- Usage examples ----

// Numbers (reuse the built‑in comparator)
const maxNum = maxBy([4, 1, 8, 3], (a, b) => a - b); // 8

// Dates
const dates = [new Date('2023-01-01'), new Date('2022-12-31'), new Date('2023-02-15')];
const latest = maxBy(dates, (a, b) => a.getTime() - b.getTime());
// latest === 2023‑02‑15T00:00:00.000Z

// Custom objects
interface Person { name: string; age: number; }
const people: Person[] = [
  { name: 'Alice', age: 31 },
  { name: 'Bob',   age: 27 },
  { name: 'Cara',  age: 45 },
];
const oldest = maxBy(people, (a, b) => a.age - b.age);
// oldest === { name: 'Cara', age: 45 }
// utils/max.ts
export function max(arr: number[]): number | undefined {
  return maxWithLoop(arr); // pick whichever implementation you like
}

// Generic version
export function maxBy<T>(arr: T[], compare: Comparator<T>): T | undefined {
  return maxBy(arr, compare);
}
import { max, maxBy } from './utils/max';

console.log(max([10, 5, 12])); // 12

interface Score { player: string; points: number; }
const scores: Score[] = [
  { player: 'A', points: 15 },
  { player: 'B', points: 22 },
  { player: 'C', points: 19 },
];
const topScore = maxBy(scores, (a, b) => a.points - b.points);
console.log(topScore?.player); // "B"
