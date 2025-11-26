/**
 * Fibonacci search on a sorted array.
 * @param arr Sorted array of numbers
 * @param target Value to look for
 * @returns Index of target, or -1 if not found
 */
export function fibonacciSearch(arr: number[], target: number): number {
  const n = arr.length;
  if (n === 0) return -1;

  // 1. Find the smallest Fibonacci number >= n
  let fibK  = 1;   // F(k)
  let fibK1 = 1;   // F(k-1)
  let fibK2 = 0;   // F(k-2)

  while (fibK < n) {
    fibK2 = fibK1;
    fibK1 = fibK;
    fibK  = fibK1 + fibK2;
  }

  // 2. Initialize the offset that marks the eliminated range from the front
  let offset = -1;

  // 3. Main loop
  while (fibK > 1) {
    // Index we want to probe
    const i = Math.min(offset + fibK2, n - 1);

    // Compare and shrink the search range
    if (arr[i] < target) {
      // Shift the Fibonacci sequence down
      fibK  = fibK1;
      fibK1 = fibK2;
      fibK2 = fibK - fibK1;
      offset = i; // eliminate left part
    } else if (arr[i] > target) {
      // Shift the Fibonacci sequence down twice
      fibK  = fibK2;
      fibK1 = fibK1 - fibK2;
      fibK2 = fibK - fibK1;
      // offset stays the same (eliminate right part)
    } else {
      // Found it
      return i;
    }
  }

  // 4. Check the last remaining element
  if (fibK1 === 1 && offset + 1 < n && arr[offset + 1] === target) {
    return offset + 1;
  }

  return -1; // not found
}

/* ---------- Quick sanity checks ---------- */
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it('finds existing values', () => {
    const data = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
    expect(fibonacciSearch(data, 1)).toBe(0);
    expect(fibonacciSearch(data, 19)).toBe(9);
    expect(fibonacciSearch(data, 11)).toBe(5);
  });

  it('returns -1 for missing values', () => {
    const data = [2, 4, 6, 8, 10];
    expect(fibonacciSearch(data, 1)).toBe(-1);
    expect(fibonacciSearch(data, 11)).toBe(-1);
  });

  it('handles edge cases', () => {
    expect(fibonacciSearch([], 42)).toBe(-1);
    expect(fibonacciSearch([42], 42)).toBe(0);
    expect(fibonacciSearch([42], 0)).toBe(-1);
  });
}
const nums = [-10, -3, 0, 1, 5, 9, 12, 27, 99];
console.log(fibonacciSearch(nums, 9));  // → 5
console.log(fibonacciSearch(nums, 42)); // → -1
