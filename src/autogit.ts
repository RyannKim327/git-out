/**
 * Iterative (bottom-up) merge-sort.
 * @param a  Array to be sorted **in place**.
 * @param c  Optional comparator (defaults to ascending `<`).
 */
export function mergeSort<T>(
  a: T[],
  c: (x: T, y: T) => number = (x, y) => (x < y ? -1 : x > y ? 1 : 0)
): void {
  const n = a.length;
  if (n < 2) return;

  // One shared auxiliary buffer big enough for the largest merge we’ll ever do.
  const aux: T[] = new Array(n >> 1);

  // Bottom-up: merge sub-arrays of width 1, 2, 4, 8, ...
  for (let w = 1; w < n; w <<= 1) {
    // leftRun0 = 0..w-1, leftRun1 = w..2w-1, ...
    for (let left = 0; left < n; left += w << 1) {
      const mid = left + w;
      const right = Math.min(mid + w, n);

      // Nothing to do if the right half is empty or already in order.
      if (mid >= right) continue;

      // Copy left half into aux buffer (only the part we’ll overwrite).
      const len = Math.min(w, right - mid);
      for (let i = 0; i < len; ++i) aux[i] = a[left + i];

      // Standard two-finger merge back into the original array.
      let i = 0;          // index in aux[]
      let j = mid;        // index in second half
      let k = left;       // index in original array
      while (i < len && j < right) {
        a[k++] = c(aux[i], a[j]) <= 0 ? aux[i++] : a[j++];
      }
      // Copy any leftovers from aux[] (right half is already in place).
      while (i < len) a[k++] = aux[i++];
    }
  }
}

/* ---------- Sanity check ---------- */
if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it('sorts', () => {
    const data = [5, 3, 9, 1, 4, 8, 2, 7, 6];
    mergeSort(data);
    expect(data).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
}
const nums = [3, 1, 4, 1, 5, 9, 2, 6];
mergeSort(nums);
console.log(nums); // [1, 1, 2, 3, 4, 5, 6, 9]

// Descending order
const strs = ['banana', 'apple', 'cherry'];
mergeSort(strs, (a, b) => b.localeCompare(a));
console.log(strs); // ['cherry', 'banana', 'apple']
