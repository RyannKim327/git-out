/**
 * Fibonacci Search in a sorted array.
 * Returns the index of `target` or -1 if not found.
 * Works with any primitive that supports comparison.
 */
export function fibonacciSearch<T>(
  arr: T[],
  target: T
): number {
  const n = arr.length;
  if (n === 0) return -1;

  /* 1. Find the smallest Fibonacci number >= n */
  let fibK = 0;          // F(k)
  let fibKm1 = 1;        // F(k-1)
  let fibKm2 = 0;        // F(k-2)

  while (fibK < n) {
    fibKm2 = fibKm1;
    fibKm1 = fibK;
    fibK  = fibKm1 + fibKm2;
  }

  /* 2. Initialize the offset and the current range */
  let offset = -1;

  /* 3. Main comparison loop */
  while (fibK > 1) {
    const i = Math.min(offset + fibKm2, n - 1);

    if (arr[i] < target) {
      // Discard left sub-array
      fibK   = fibKm1;
      fibKm1 = fibKm2;
      fibKm2 = fibK - fibKm1;
      offset = i;
    } else if (arr[i] > target) {
      // Discard right sub-array
      fibK   = fibKm2;
      fibKm1 = fibKm1 - fibKm2;
      fibKm2 = fibK - fibKm1;
    } else {
      // Found
      return i;
    }
  }

  /* 4. Check the last remaining element */
  if (fibKm1 === 1 && offset + 1 < n && arr[offset + 1] === target) {
    return offset + 1;
  }

  return -1;
}

/* ---------- Usage example ---------- */
if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;

  test('fibonacciSearch', () => {
    const data = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31];
    expect(fibonacciSearch(data, 17)).toBe(6);
    expect(fibonacciSearch(data, 4)).toBe(-1);
    expect(fibonacciSearch([], 42)).toBe(-1);
  });
}
