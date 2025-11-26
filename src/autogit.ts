/**
 * Merge-sort (stable, ascending order).
 * Works for any type that supports the `<` operator.
 * Time-complexity:  Θ(n log n)
 * Space-complexity: Θ(n)  (due to the temporary arrays used while merging)
 */
export function mergeSort<T>(arr: readonly T[]): T[] {
  // Defensive copy so the original array is not mutated
  const copy = [...arr];
  _mergeSort(copy, 0, copy.length - 1);
  return copy;
}

/* -------------------------------------------------
 * Internal helpers
 * ------------------------------------------------- */
function _mergeSort<T>(a: T[], left: number, right: number): void {
  if (left >= right) return;          // 0 or 1 element → already sorted
  const mid = Math.floor((left + right) / 2);
  _mergeSort(a, left, mid);            // sort left half
  _mergeSort(a, mid + 1, right);      // sort right half
  _merge(a, left, mid, right);        // merge the two halves
}

function _merge<T>(a: T[], left: number, mid: number, right: number): void {
  const leftSize  = mid - left + 1;
  const rightSize = right - mid;

  // Temporary arrays for the two halves
  const L = a.slice(left, left + leftSize);
  const R = a.slice(mid + 1, mid + 1 + rightSize);

  let i = 0, j = 0, k = left;

  // Merge back into the original array in sorted order
  while (i < leftSize && j < rightSize) {
    a[k++] = L[i] <= R[j] ? L[i++] : R[j++];
  }
  // Copy any leftovers
  while (i < leftSize)  a[k++] = L[i++];
  while (j < rightSize) a[k++] = R[j++];
}

/* -------------------------------------------------
 * Usage examples
 * ------------------------------------------------- */
console.log(mergeSort([5, 3, 8, 4, 2]));          // [2, 3, 4, 5, 8]
console.log(mergeSort([10]));                     // [10]
console.log(mergeSort([]));                       // []
console.log(mergeSort(["b", "d", "a", "c"]));    // ["a", "b", "c", "d"]

// Works with custom comparator too (see below)
// Instead of:  L[i] <= R[j]
a[k++] = cmp(L[i], R[j]) <= 0 ? L[i++] : R[j++];
export function mergeSortWith<T>(
  arr: readonly T[],
  cmp: (a: T, b: T) => number
): T[] { /* … */ }
