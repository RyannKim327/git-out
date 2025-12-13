/**
 * Interpolation Search
 * Best-case: O(log log n) for uniformly-distributed data
 * Worst-case: O(n) (e.g. all elements identical or exponentially increasing)
 * @param arr Sorted array of numbers
 * @param target Value to find
 * @returns Index of target or -1 if not found
 */
export function interpolationSearch(arr: number[], target: number): number {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high && target >= arr[low] && target <= arr[high]) {
    // Avoid division by zero when arr[high] === arr[low]
    if (arr[high] === arr[low]) {
      return arr[low] === target ? low : -1;
    }

    // Estimate the probe position
    const pos = low + Math.floor(
      ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])
    );

    // Bounds check (redundant for uniform data but keeps us safe)
    if (pos < low || pos > high) return -1;

    const value = arr[pos];

    if (value === target) return pos;
    if (value < target) low = pos + 1;
    else high = pos - 1;
  }

  return -1;
}

/* ---------- Quick sanity checks ---------- */
if (import.meta.vitest) {
  const { expect, test } = import.meta.vitest;

  test('interpolation search', () => {
    const data = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
    expect(interpolationSearch(data, 10)).toBe(4);
    expect(interpolationSearch(data, 3)).toBe(-1);
    expect(interpolationSearch([], 5)).toBe(-1);
    expect(interpolationSearch([5], 5)).toBe(0);
    expect(interpolationSearch([1, 1, 1, 1], 1)).toBe(0);
  });
}
const nums = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21];
const idx = interpolationSearch(nums, 13);
console.log(idx); // → 6
