// 1. Simple in‑place sort (mutates the original array)
function sortInPlace(nums: number[]): void {
  nums.sort((a, b) => a - b); // ascending
}

// 2. Immutable version – returns a new sorted array
function sortImmutable(nums: readonly number[]): number[] {
  // Spread into a new array first, then sort
  return [...nums].sort((a, b) => a - b);
}

// Usage
const original = [42, 7, 19, 3, 15];

sortInPlace(original);
console.log(original); // [3, 7, 15, 19, 42]

const immutableSorted = sortImmutable([42, 7, 19, 3, 15]);
console.log(immutableSorted); // [3, 7, 15, 19, 42]
nums.sort((a, b) => b - a); // descending
// utils/sortNumbers.ts
export function sortNumbers<T extends number>(
  arr: readonly T[],
  order: 'asc' | 'desc' = 'asc'
): T[] {
  const sorted = [...arr];
  sorted.sort((a, b) => (order === 'asc' ? a - b : b - a));
  return sorted;
}
import { sortNumbers } from './utils/sortNumbers';

const data = [5, 2, 9, 1];
const asc = sortNumbers(data);               // [1, 2, 5, 9]
const desc = sortNumbers(data, 'desc');      // [9, 5, 2, 1]
function sortPure(nums: readonly number[]): number[] {
  return Array.from(nums).sort((a, b) => a - b);
}
// Example of a manual merge sort (pure functional, O(n log n) stable)
function mergeSort(arr: readonly number[]): number[] {
  if (arr.length <= 1) return [...arr];

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  const merged: number[] = [];
  let i = 0,
    j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) merged.push(left[i++]);
    else merged.push(right[j++]);
  }
  return merged.concat(left.slice(i)).concat(right.slice(j));
}
function sortIfNumbers<T>(arr: T[]): T[] {
  // Compile‑time guard – will error if T is not assignable to number
  // (the `as unknown as number[]` cast is only needed for runtime, not for typing)
  if (typeof arr[0] !== 'number') {
    throw new Error('Array must contain numbers');
  }
  return (arr as unknown as number[]).sort((a, b) => a - b) as unknown as T[];
}
function sortReadOnly(nums: readonly number[]): number[] {
  // The spread operator creates a mutable copy, leaving the original untouched.
  return [...nums].sort((a, b) => a - b);
}
src/
├─ utils/
│  └─ sortNumbers.ts
├─ models/
│  └─ types.ts          // (optional) define numeric tuple types, etc.
└─ index.ts
export type SortOrder = 'asc' | 'desc';

export function sortNumbers<T extends number>(
  arr: readonly T[],
  order: SortOrder = 'asc'
): T[] {
  const copy = [...arr];
  copy.sort((a, b) => (order === 'asc' ? a - b : b - a));
  return copy;
}
import { sortNumbers } from './utils/sortNumbers';

const unsorted = [12, 4, 7, 1, 9] as const;

const asc = sortNumbers(unsorted);          // [1, 4, 7, 9, 12]
const desc = sortNumbers(unsorted, 'desc'); // [12, 9, 7, 4, 1]

console.log('ascending →', asc);
console.log('descending →', desc);
$ npx ts-node src/index.ts
ascending → [ 1, 4, 7, 9, 12 ]
descending → [ 12, 9, 7, 4, 1 ]
// simplest, type‑safe, immutable version
const sorted = [...myNumbers].sort((a, b) => a - b);
