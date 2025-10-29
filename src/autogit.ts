/**
 * Fibonacci search
 *  – Time-complexity:  O(log n)
 *  – Space-complexity: O(1)
 *
 * @param arr        Sorted array to search
 * @param target     Value to find
 * @param compare    Optional comparator (a, b) => negative | 0 | positive
 *                   Defaults to numeric ascending order.
 * @returns Index of first occurrence of target or -1 if not found
 */
export function fibonacciSearch<T>(
  arr: readonly T[],
  target: T,
  compare: (a: T, b: T) => number = (a, b) => (a as any) - (b as any)
): number {
  const n = arr.length;
  if (n === 0) return -1;

  /* ---------- 1. Find smallest Fibonacci number >= n ---------- */
  let fibK = 0;          // F(k)
  let fibK1 = 1;         // F(k-1)
  let fibK2 = 1;         // F(k-2)

  while (fibK < n) {
    fibK2 = fibK1;
    fibK1 = fibK;
    fibK = fibK1 + fibK2;
  }

  /* ---------- 2. Initialize pointers ---------- */
  let offset = -1;       // Start of the range we are considering

  /* ---------- 3. Main loop ---------- */
  while (fibK > 1) {
    // Index we probe
    const i = Math.min(offset + fibK2, n - 1);
    const cmp = compare(arr[i], target);

    if (cmp < 0) {
      // Target lies in the upper third
      fibK  = fibK1;
      fibK1 = fibK2;
      fibK2 = fibK - fibK1;
      offset = i;
    } else if (cmp > 0) {
      // Target lies in the lower third
      fibK  = fibK2;
      fibK1 = fibK1 - fibK2;
      fibK2 = fibK - fibK1;
    } else {
      // Found exact match; return first occurrence if duplicates exist
      let first = i;
      while (first > 0 && compare(arr[first - 1], target) === 0) first--;
      return first;
    }
  }

  /* ---------- 4. Check last remaining element ---------- */
  if (fibK1 === 1 && offset + 1 < n && compare(arr[offset + 1], target) === 0) {
    return offset + 1;
  }

  return -1; // Not found
}

/* ---------- Quick sanity checks ---------- */
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it('finds numbers', () => {
    const data = [1, 3, 5, 7, 9, 11, 13];
    expect(fibonacciSearch(data, 7)).toBe(3);
    expect(fibonacciSearch(data, 2)).toBe(-1);
  });

  it('handles duplicates', () => {
    const data = [1, 2, 2, 2, 3, 4];
    expect(fibonacciSearch(data, 2)).toBe(1);
  });

  it('works with strings', () => {
    const words = ['apple', 'banana', 'cherry', 'date'];
    expect(fibonacciSearch(words, 'cherry')).toBe(2);
  });
}
// Numbers
const nums = [10, 22, 35, 40, 45, 50, 80, 82, 85, 90, 100];
console.log(fibonacciSearch(nums, 85)); // → 8

// Custom objects
interface User { id: number; name: string }
const users: User[] = [
  { id: 1, name: 'Alice' },
  { id: 4, name: 'Bob'   },
  { id: 7, name: 'Carol' },
];
const idx = fibonacciSearch(
  users,
  { id: 4, name: '' },           // dummy target
  (a, b) => a.id - b.id
);
console.log(idx); // → 1
