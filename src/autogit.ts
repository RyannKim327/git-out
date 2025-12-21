/**
 * In-place quicksort (ascending).
 * @param arr  Array to be sorted.
 * @param left  Left index (inclusive).
 * @param right Right index (inclusive).
 */
function quickSort<T>(arr: T[], left = 0, right = arr.length - 1): void {
  if (left >= right) return;

  // ----- partition -----
  const pivot = arr[(left + right) >> 1];   // middle element
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
  // ----- /partition -----

  if (left < j) quickSort(arr, left, j);
  if (i < right) quickSort(arr, i, right);
}

/* ---------- usage ---------- */
const nums   = [9, 2, 7, 12, -4, 0];
quickSort(nums);
console.log(nums); // [-4, 0, 2, 7, 9, 12]

const words  = ['pear', 'apple', 'orange', 'apple'];
quickSort(words);
console.log(words); // ["apple", "apple", "orange", "pear"]
