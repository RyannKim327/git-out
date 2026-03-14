/**
 * Bottom‑up merge sort – no recursion, only loops.
 * @param arr The array to sort, in place.
 * @returns The sorted array (same reference as the argument).
 */
export function mergeSortIterative<T>(arr: T[]): T[] {
  const len = arr.length;
  if (len < 2) return arr;          // already sorted

  // Temporary buffer reused for each merge
  const temp = new Array<T>(len);

  // Initial run width – start with runs of 1 element
  for (let width = 1; width < len; width <<= 1) {
    // Merge pairs of runs: left = i‑th run, right = i+width‑th run
    for (let i = 0; i < len; i += width << 1) {
      const left = i;
      const mid = Math.min(i + width, len);
      const right = Math.min(i + (width << 1), len);

      // Merge [left, mid) and [mid, right) into temp
      let l = left, r = mid, k = left;
      while (l < mid && r < right) {
        temp[k++] = (arr[l] as any <= arr[r] as any) ? arr[l++] : arr[r++];
      }
      while (l < mid) temp[k++] = arr[l++];
      while (r < right) temp[k++] = arr[r++];

      // Copy the merged segment back into arr
      for (let p = left; p < right; p++) arr[p] = temp[p];
    }
  }

  return arr;
}
