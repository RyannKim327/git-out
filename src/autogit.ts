/**
 * Fibonacci Search
 * Returns the index of `target` in the sorted `arr`,
 * or -1 if not found.
 *
 * Time-complexity:  O(log n) comparisons
 * Space-complexity: O(1)
 */
export function fibonacciSearch<T>(
  arr: readonly T[],
  target: T
): number {
  const n = arr.length;
  if (n === 0) return -1;

  /* 1. Find the smallest Fibonacci number >= n */
  let fibK  = 0;   // F(k)
  let fibK1 = 1;   // F(k-1)
  let fibK2 = 1;   // F(k-2)

  while (fibK < n) {
    fibK2 = fibK1;
    fibK1 = fibK;
    fibK  = fibK1 + fibK2;
  }

  /* 2. Initialize the offset that marks the eliminated range front */
  let offset = -1;

  /* 3. Main comparison loop */
  while (fibK > 1) {
    // Index of the current probing position
    const i = Math.min(offset + fibK2, n - 1);

    if (arr[i] < target) {
      // Target is in the right half
      fibK  = fibK1;
      fibK1 = fibK2;
      fibK2 = fibK - fibK1;
      offset = i;
    } else if (arr[i] > target) {
      // Target is in the left half
      fibK  = fibK2;
      fibK1 = fibK1 - fibK2;
      fibK2 = fibK - fibK1;
    } else {
      // Found
      return i;
    }
  }

  /* 4. Last candidate (fibK2 == 1) */
  if (fibK1 && offset + 1 < n && arr[offset + 1] === target) {
    return offset + 1;
  }

  return -1;
}

/* ---------- Quick sanity checks ---------- */
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it('finds existing items', () => {
    const data = [-10, -3, 0, 1, 5, 9, 21, 77, 100];
    expect(fibonacciSearch(data, 0)).toBe(2);
    expect(fibonacciSearch(data, 77)).toBe(7);
  });

  it('returns -1 for missing items', () => {
    expect(fibonacciSearch([1, 2, 3], 4)).toBe(-1);
    expect(fibonacciSearch([], 42)).toBe(-1);
  });
}
const numbers = [2, 4, 7, 10, 15, 23, 38, 56, 72, 91];
console.log(fibonacciSearch(numbers, 23)); // → 5
console.log(fibonacciSearch(numbers, 8));  // → -1
tsc fibonacciSearch.ts
node fibonacciSearch.js
