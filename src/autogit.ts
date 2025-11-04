/**
 * Iterative (bottom-up) merge-sort.
 * Returns a *new* sorted array; the original is left untouched.
 */
export function mergeSortIterative<T>(
  src: readonly T[],
  compare: (a: T, b: T) => number = (a, b) => (a as any) - (b as any)
): T[] {
  const n = src.length;
  if (n < 2) return src.slice();          // already sorted or empty

  const a = src.slice();                    // working copy
  const b: T[] = new Array(n);              // scratch buffer

  let curr = a, next = b;                   // ping-pong buffers

  // Merge sub-arrays of width = w
  for (let w = 1; w < n; w *= 2) {
    for (let lo = 0; lo < n; lo += 2 * w) {
      const mid = Math.min(lo + w, n);
      const hi  = Math.min(lo + 2 * w, n);

      let i = lo, j = mid, k = lo;

      // Classical two-finger merge
      while (i < mid && j < hi) {
        next[k++] = compare(curr[i], curr[j]) <= 0 ? curr[i++] : curr[j++];
      }
      while (i < mid) next[k++] = curr[i++];
      while (j < hi)   next[k++] = curr[j++];
    }
    [curr, next] = [next, curr];            // swap buffers
  }
  return curr;                              // curr now holds the sorted data
}

/* ---------- demo ---------- */
if (import.meta.vitest) {
  const { expect, it } = import.meta.vitest;
  it('sorts numbers', () => {
    const data = [9, 3, 7, 4, 8, 2, 6, 5, 1];
    const sorted = mergeSortIterative(data);
    expect(sorted).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    expect(data).toEqual([9, 3, 7, 4, 8, 2, 6, 5, 1]); // original untouched
  });
}
