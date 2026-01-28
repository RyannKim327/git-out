/**
 * Fibonacci search for a sorted array of numbers.
 * @param arr  The sorted array to search.
 * @param target The value to locate.
 * @returns The index of `target` in `arr`, or -1 if not found.
 */
export function fibonacciSearch(arr: number[], target: number): number {
  const n = arr.length;
  if (n === 0) return -1;

  // 1. Build the smallest Fibonacci number >= n
  let fibMm2 = 0;   // (m-2)th Fibonacci
  let fibMm1 = 1;   // (m-1)th Fibonacci
  let fibM   = fibMm2 + fibMm1; // mth Fibonacci

  while (fibM < n) {
    fibMm2 = fibMm1;
    fibMm1 = fibM;
    fibM   = fibMm2 + fibMm1;
  }

  // Marks the range to be searched
  let offset = -1; // Element before the beginning (virtual)

  // 2. While there is an element to inspect
  while (fibM > 1) {
    // Determines the index to compare
    const i = Math.min(offset + fibMm2, n - 1);

    if (arr[i] < target) {
      // Move three steps ahead
      fibM   = fibMm1;
      fibMm1 = fibMm2;
      fibMm2 = fibM - fibMm1;
      offset = i;
    } else if (arr[i] > target) {
      // Move one step back
      fibM   = fibMm2;
      fibMm1 = fibMm1 - fibMm2;
      fibMm2 = fibM - fibMm1;
    } else {
      return i; // Found
    }
  }

  // We are left with a single element
  if (fibMm1 && offset + 1 < n && arr[offset + 1] === target) {
    return offset + 1;
  }

  return -1; // Not found
}
import { fibonacciSearch } from './fibonacci-search';

const data = [3, 8, 10, 15, 20, 23, 27, 35, 41, 55, 68, 73, 82, 91, 97];
const target = 55;

const idx = fibonacciSearch(data, target);
console.log(idx); // → 9
console.log(fibonacciSearch(data, 22)); // → -1
