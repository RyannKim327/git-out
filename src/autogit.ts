/**
 * Classic in‑place quick‑sort.
 *
 * @param arr  The array to be sorted (in‑place).
 * @param left The starting index (default: 0).
 * @param right The ending index (default: arr.length‑1).
 *
 * @returns The same array, now sorted.
 */
function quickSort<T>(arr: T[], left = 0, right = arr.length - 1): T[] {
  if (left >= right) return arr;          // base case: 0 or 1 item

  // Pick a pivot—here we just take the middle element.
  const pivotIndex = Math.floor((left + right) / 2);
  const pivot = arr[pivotIndex];

  // Partition: everything less than the pivot goes left, everything
  // greater or equal goes right.  Elements equal to the pivot can go either side.
  let i = left;
  let j = right;
  while (i <= j) {
    while (arr[i] < pivot) i++;   // find an element on the wrong side (left)
    while (arr[j] > pivot) j--;   // find an element on the wrong side (right)

    if (i <= j) {                 // swap the out‑of‑place elements
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
      j--;
    }
  }

  // Recursively sort the two partitions.
  // The first call deals with the left two halves *unless* they overlap.
  if (left < j) quickSort(arr, left, j);
  if (i < right) quickSort(arr, i, right);

  return arr;
}
const unsorted = [3, 7, 2, 5, 1, 4, 6];
quickSort(unsorted);        // unsorted is now [1,2,3,4,5,6,7]
