/**
 * Fibonacci Search in a sorted array.
 * @param arr Sorted array of numbers
 * @param target Value to search for
 * @returns Index of target, or -1 if not found
 */
export function fibonacciSearch(arr: number[], target: number): number {
  const n = arr.length;
  if (n === 0) return -1;

  // 1. Find the smallest Fibonacci number >= n
  let fibMm2 = 0;               // F(m-2)
  let fibMm1 = 1;               // F(m-1)
  let fibM   = fibMm1 + fibMm2; // F(m)

  while (fibM < n) {
    fibMm2 = fibMm1;
    fibMm1 = fibM;
    fibM   = fibMm1 + fibMm2;
  }

  // 2. Initialize the offset that marks the eliminated range
  let offset = -1;

  // 3. Main comparison loop
  while (fibM > 1) {
    // Index of the current probing position
    const i = Math.min(offset + fibMm2, n - 1);

    if (arr[i] < target) {
      // Target is in the upper part
      fibM   = fibMm1;
      fibMm1 = fibMm2;
      fibMm2 = fibM - fibMm1;
      offset = i;
    } else if (arr[i] > target) {
      // Target is in the lower part
      fibM   = fibMm2;
      fibMm1 = fibMm1 - fibMm2;
      fibMm2 = fibM - fibMm1;
    } else {
      // Found
      return i;
    }
  }

  // 4. Check the last remaining element
  if (fibMm1 === 1 && offset + 1 < n && arr[offset + 1] === target) {
    return offset + 1;
  }

  // Not found
  return -1;
}

/* ---------- Usage example ---------- */
if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;

  test('fibonacciSearch', () => {
    const data = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
    expect(fibonacciSearch(data, 7)).toBe(3);
    expect(fibonacciSearch(data, 2)).toBe(-1);
    expect(fibonacciSearch([], 5)).toBe(-1);
    expect(fibonacciSearch([5], 5)).toBe(0);
  });
}
