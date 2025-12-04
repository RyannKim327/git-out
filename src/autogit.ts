/**
 * In-place quicksort (recursive).
 * @param arr  Array to sort
 * @param left  Left index (inclusive)
 * @param right  Right index (inclusive)
 */
function quickSort<T>(arr: T[], left = 0, right = arr.length - 1): void {
  if (left >= right) return;

  const pivot = partition(arr, left, right);
  quickSort(arr, left, pivot - 1);
  quickSort(arr, pivot + 1, right);
}

/**
 * Lomuto partition scheme.
 * Returns the final index of the pivot.
 */
function partition<T>(arr: T[], left: number, right: number): number {
  const pivotVal = arr[right];
  let i = left;

  for (let j = left; j < right; j++) {
    if (arr[j] <= pivotVal) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }
  [arr[i], arr[right]] = [arr[right], arr[i]];
  return i;
}

/* ---------- Usage example ---------- */
const nums = [3, 7, 2, 9, 1, 5, 4, 8, 6];
quickSort(nums);
console.log(nums); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
const qsort = <T>(a: T[]): T[] =>
  a.length <= 1
    ? a
    : [
        ...qsort(a.slice(1).filter(x => x < a[0])),
        a[0],
        ...qsort(a.slice(1).filter(x => x >= a[0]))
      ];
