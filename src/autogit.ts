/**
 * In-place quicksort (recursive).
 * @param arr  Array of numbers (or anything with a `<` operator).
 * @param left  Left index (inclusive).
 * @param right Right index (inclusive).
 */
function quickSort<T>(arr: T[], left = 0, right = arr.length - 1): T[] {
  if (left >= right) return arr;          // 0 or 1 element → already sorted

  // 1. Partition step
  const pivot = partition(arr, left, right);

  // 2. Recursively sort the two halves
  quickSort(arr, left, pivot - 1);
  quickSort(arr, pivot + 1, right);

  return arr;
}

/**
 * Lomuto partition scheme.
 * Returns the final index of the pivot after partitioning.
 */
function partition<T>(arr: T[], left: number, right: number): number {
  const pivotVal = arr[right];              // choose right-most element as pivot
  let i = left - 1;                         // place for the next smaller element

  for (let j = left; j < right; j++) {
    if (arr[j] < pivotVal) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];  // swap
    }
  }
  // Put pivot after last smaller element
  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
  return i + 1;
}

/* ---------- Usage example ---------- */
const nums = [9, 2, 7, 12, -4, 0, 3];
quickSort(nums);
console.log(nums); // [-4, 0, 2, 3, 7, 9, 12]
