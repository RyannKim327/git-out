/**
 * Fibonacci search in a sorted array.
 * @param arr    Sorted array (ascending order).
 * @param target Value to look for.
 * @returns      Index of the first occurrence of `target`, or -1 if not found.
 */
export function fibonacciSearch<T>(
  arr: ReadonlyArray<T>,
  target: T
): number {
  const n = arr.length;
  if (n === 0) return -1;

  /* ---------- 1.  Find the smallest Fibonacci number F(k) >= n+1 ---------- */
  let fk2 = 0;          // F(k-2)
  let fk1 = 1;          // F(k-1)
  let fk  = 1;          // F(k)
  while (fk < n) {
    fk  = fk1 + fk2;
    fk2 = fk1;
    fk1 = fk;
  }

  /* ---------- 2.  Initialise pointers -------------------------------------- */
  let offset = -1;      // start of the eliminated range

  /* ---------- 3.  Main loop ---------------------------------------------- */
  while (fk > 1) {
    // Index of the probe: min(offset + fk2, n-1)
    const i = Math.min(offset + fk2, n - 1);

    if (arr[i] === target) return i;

    if (arr[i] < target) {
      // Eliminate left part including i
      fk  = fk1;
      fk1 = fk2;
      fk2 = fk - fk1;
      offset = i;
    } else {
      // Eliminate right part starting at i
      fk  = fk2;
      fk1 = fk1 - fk2;
      fk2 = fk - fk1;
    }
  }

  /* ---------- 4.  Check the last candidate -------------------------------- */
  const last = offset + 1;
  if (last < n && arr[last] === target) return last;

  return -1;
}

/* ---------------------------  demo  ---------------------------------------- */
if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;

  test('fibonacciSearch', () => {
    const data = [-10, -3, 0, 1, 3, 11, 13, 21, 42, 42, 42, 100];
    expect(fibonacciSearch(data, 42)).toBe(8);   // first occurrence
    expect(fibonacciSearch(data, 2)).toBe(-1);
    expect(fibonacciSearch([], 5)).toBe(-1);
    expect(fibonacciSearch([5], 5)).toBe(0);
  });
}
import { fibonacciSearch } from './fibonacciSearch';

const numbers = [2, 4, 7, 9, 11, 15, 18];
const idx = fibonacciSearch(numbers, 11);
console.log(idx); // → 4
