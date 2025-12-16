/**
 * In-place quicksort (recursive).
 * @param arr  Array of numbers (or anything that can be compared with `<`)
 * @param left  Left index (inclusive).  Defaults to 0.
 * @param right Right index (inclusive).  Defaults to arr.length - 1.
 */
function quickSort(arr: number[], left = 0, right = arr.length - 1): void {
  if (left >= right) return;          // 0 or 1 element → already sorted

  // ---- partition step ----
  const pivot = arr[Math.floor((left + right) / 2)]; // choose middle element as pivot
  let i = left;
  let j = right;

  while (i <= j) {
    while (arr[i] < pivot) i++;
    while (arr[j] > pivot) j--;

    if (i <= j) {
      [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
      i++;
      j--;
    }
  }
  // ---- end partition ----

  // Recursively sort the two halves
  if (left < j) quickSort(arr, left, j);
  if (i < right) quickSort(arr, i, right);
}

/* ---------- usage ---------- */
const nums = [9, 3, 7, 4, 8, 2, 6, 5, 1];
quickSort(nums);
console.log(nums); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
