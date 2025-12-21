/**
 * In-place quicksort (ascending).
 * @param arr Array of items that can be compared with `<`
 * @param left  Start index (inclusive).  Default = 0
 * @param right End index (inclusive).    Default = arr.length-1
 */
function quickSort<T>(arr: T[], left = 0, right = arr.length - 1): void {
  if (left >= right) return;          // 0 or 1 element → already sorted

  const pivot = partition(arr, left, right);
  quickSort(arr, left, pivot - 1);    // Sort left part
  quickSort(arr, pivot + 1, right);   // Sort right part
}

/**
 * Lomuto partition scheme.
 * Returns the final index of the pivot.
 */
function partition<T>(arr: T[], left: number, right: number): number {
  const pivot = arr[right];           // Choose right-most element as pivot
  let i = left - 1;                 // Place for swapping

  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  // Put pivot after last smaller element
  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
  return i + 1;
}

/* ---------- Usage example ---------- */
const nums = [9, 3, 7, 4, 8, 2, 6, 5, 1];
quickSort(nums);
console.log(nums); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
