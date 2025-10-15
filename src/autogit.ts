/**
 * Fibonacci Search
 * Returns the index of `target` in the sorted `arr`,
 * or -1 if not found.
 *
 * Time-complexity:  O(log n)  (worst-case)
 * Space-complexity: O(1)
 */
export function fibonacciSearch<T>(
  arr: readonly T[],
  target: T,
  compare: (a: T, b: T) => number = (a, b) => (a as any) - (b as any)
): number {
  const n = arr.length;
  if (n === 0) return -1;

  /* 1. Find the smallest Fibonacci number >= n */
  let fibK  = 1;   // F(k)
  let fibK1 = 1;   // F(k-1)
  let fibK2 = 0;   // F(k-2)

  while (fibK < n) {
    fibK2 = fibK1;
    fibK1 = fibK;
    fibK  = fibK1 + fibK2;
  }

  /* 2. Initialize the search range */
  let offset = -1; // start of the eliminated range

  /* 3. Main loop */
  while (fibK > 1) {
    const i = Math.min(offset + fibK2, n - 1);

    const cmp = compare(arr[i], target);
    if (cmp < 0) {
      // target is in the right part
      fibK  = fibK1;
      fibK1 = fibK2;
      fibK2 = fibK - fibK1;
      offset = i;
    } else if (cmp > 0) {
      // target is in the left part
      fibK  = fibK2;
      fibK1 = fibK1 - fibK2;
      fibK2 = fibK - fibK1;
    } else {
      // found
      return i;
    }
  }

  /* 4. Check the last remaining element */
  if (fibK1 === 1 && offset + 1 < n && compare(arr[offset + 1], target) === 0) {
    return offset + 1;
  }

  return -1;
}

/* ---------- usage example ---------- */
if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;

  test('fibonacciSearch', () => {
    const data = [10, 22, 35, 40, 45, 50, 80, 82, 85, 90, 100];
    expect(fibonacciSearch(data, 45)).toBe(4);
    expect(fibonacciSearch(data, 44)).toBe(-1);
    expect(fibonacciSearch([], 42)).toBe(-1);
  });
}
