/**
 * In-place quicksort.
 * @param arr  Array of items that can be compared with `<` and `>`.
 * @param left  Left index (inclusive).  Defaults to 0.
 * @param right Right index (inclusive). Defaults to arr.length-1.
 */
function quickSort<T>(arr: T[], left = 0, right = arr.length - 1): T[] {
  if (left >= right) return arr;

  const pivot = arr[Math.floor((left + right) / 2)];

  let i = left;
  let j = right;

  while (i <= j) {
    while (arr[i] < pivot) i++;
    while (arr[j] > pivot) j--;

    if (i <= j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
      j--;
    }
  }

  if (left < j) quickSort(arr, left, j);
  if (i < right) quickSort(arr, i, right);

  return arr;
}

/* ---------- Usage ---------- */
const nums = [3, 7, 2, 9, 1, 5, 4, 8, 6];
quickSort(nums);
console.log(nums); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
