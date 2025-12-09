/**
 * Iterative (bottom-up) merge sort.
 *  – Stable
 *  – O(n log n) time, O(n) extra memory (one auxiliary buffer)
 *  – Works for any type with a comparator
 */
export function mergeSort<T>(
  arr: T[],
  compare: (a: T, b: T) => number = (a, b) =>
    a < b ? -1 : a > b ? 1 : 0
): void {
  const n = arr.length;
  if (n < 2) return;

  // One auxiliary buffer that we flip between as we merge
  const aux: T[] = arr.slice();

  // Bottom-up: merge sub-arrays of size 1, 2, 4, 8 …
  for (let width = 1; width < n; width *= 2) {
    // Left start of every pair of runs
    for (let left = 0; left < n; left += 2 * width) {
      const mid = Math.min(left + width, n);
      const right = Math.min(left + 2 * width, n);

      // Merge the two runs arr[left..mid) and arr[mid..right) into aux
      let i = left;
      let j = mid;
      let k = left;

      while (i < mid && j < right) {
        aux[k++] = compare(arr[i], arr[j]) <= 0 ? arr[i++] : arr[j++];
      }
      while (i < mid) aux[k++] = arr[i++];
      while (j < right) aux[k++] = arr[j++];
    }

    // Swap roles of arr and aux for next pass
    [arr, aux] = [aux, arr];
  }

  // If we ended with the result in aux, copy it back
  if (arr !== aux) {
    for (let i = 0; i < n; i++) arr[i] = aux[i];
  }
}

/* ---------- Demo ---------- */
const nums = [5, 3, 8, 4, 2, 7, 1, 10];
mergeSort(nums);
console.log(nums); // [1, 2, 3, 4, 5, 7, 8, 10]
