/**
 * Finds the index of `key` in a sorted array `arr` using Fibonacci search.
 * @param arr  A sorted array of comparable elements.
 * @param key  The value to locate.
 * @returns The index of `key` in `arr`, or -1 if not found.
 */
export function fibonacciSearch<T>(arr: T[], key: T): number {
  const n = arr.length;

  // 1️⃣ Build Fibonacci numbers up to ≥ n
  let fibMm2 = 0; // (m-2)th Fibonacci
  let fibMm1 = 1; // (m-1)th Fibonacci
  let fibM = fibMm2 + fibMm1; // mth Fibonacci

  while (fibM < n) {
    fibMm2 = fibMm1;
    fibMm1 = fibM;
    fibM = fibMm2 + fibMm1;
  }

  // 2️⃣ `offset` marks the eliminated portion from the left
  let offset = -1;

  // 3️⃣ Main loop: keep shrinking the range
  while (fibM > 1) {
    const i = Math.min(offset + fibMm2, n - 1);

    // Debugging helper: show where we're looking
    // console.log(`Comparing at index ${i} (value=${arr[i]})`);

    if (arr[i] < key) {
      // Move three Fibonacci steps down
      fibM = fibMm1;
      fibMm1 = fibMm2;
      fibMm2 = fibM - fibMm1;
      offset = i;
    } else if (arr[i] > key) {
      // Move two Fibonacci steps down
      fibM = fibMm2;
      fibMm1 = fibMm1 - fibMm2;
      fibMm2 = fibM - fibMm1;
      // offset stays the same
    } else {
      // Element found
      return i;
    }
  }

  // Check the last remaining element
  if (fibMm1 === 1 && offset + 1 < n && arr[offset + 1] === key) {
    return offset + 1;
  }

  // Element not found
  return -1;
}
const sorted = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21];
console.log(fibonacciSearch(sorted, 13)); // → 6
console.log(fibonacciSearch(sorted, 2));  // → -1
export function fibonacciSearch<T>(
  arr: T[],
  key: T,
  cmp = (a: T, b: T) => (a < b ? -1 : a > b ? 1 : 0)
): number {
  // use cmp(a, b) instead of a < b / a > b
}
