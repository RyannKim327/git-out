/**
 * Fibonacci Search in a sorted array.
 * Returns the index of `target` or -1 if not found.
 * Works with any array for which `<` and `>` are defined.
 */
export function fibonacciSearch<T>(
  arr: T[],
  target: T
): number {
  const n = arr.length;
  if (n === 0) return -1;

  /* 1. Build the smallest Fibonacci number >= n */
  let fibK  = 0;   // F(k)
  let fibK1 = 1;   // F(k+1)
  let fibK2 = 1;   // F(k+2)

  while (fibK2 < n) {
    fibK  = fibK1;
    fibK1 = fibK2;
    fibK2 = fibK + fibK1;
  }

  /* 2. Initialize the search range */
  let offset = -1; // start of the eliminated range

  /* 3. Main loop */
  while (fibK2 > 1) {
    const i = Math.min(offset + fibK, n - 1);

    if (arr[i] < target) {
      // Move one Fibonacci step down
      fibK2 = fibK1;
      fibK1 = fibK;
      fibK  = fibK2 - fibK1;
      offset = i;
    } else if (arr[i] > target) {
      // Move two Fibonacci steps down
      fibK2 = fibK;
      fibK1 = fibK1 - fibK;
      fibK  = fibK2 - fibK1;
    } else {
      return i; // found
    }
  }

  /* 4. Check the last remaining element */
  if (fibK1 && offset + 1 < n && arr[offset + 1] === target) {
    return offset + 1;
  }

  return -1; // not found
}

/* ---------- Usage example ---------- */
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  describe('fibonacciSearch', () => {
    it('finds items', () => {
      const data = [-10, -3, 0, 1, 5, 8, 13, 21, 34, 55];
      expect(fibonacciSearch(data, 0)).toBe(2);
      expect(fibonacciSearch(data, 55)).toBe(9);
      expect(fibonacciSearch(data, 42)).toBe(-1);
    });

    it('handles edge cases', () => {
      expect(fibonacciSearch([], 5)).toBe(-1);
      expect(fibonacciSearch([5], 5)).toBe(0);
      expect(fibonacciSearch([1, 2, 3], 0)).toBe(-1);
    });
  });
}
npm i -D vitest
npx vitest run
