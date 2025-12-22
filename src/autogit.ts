/**
 * In-place quicksort (ascending).
 * @param arr  Array of items that can be compared with `<`
 * @param left  Left index (inclusive) – leave empty to sort the whole array
 * @param right Right index (inclusive) – leave empty to sort the whole array
 */
export function quickSort<T>(
  arr: T[],
  left = 0,
  right = arr.length - 1
): T[] {
  if (left >= right) return arr;

  const pivot = arr[Math.floor((left + right) / 2)];

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

  // Recurse on the two halves
  if (left < j) quickSort(arr, left, j);
  if (i < right) quickSort(arr, i, right);

  return arr;
}

/* ---------- Usage ---------- */
const nums = [9, 3, 7, 4, 8, 2, 6, 5, 1];
quickSort(nums);
console.log(nums); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

const words = ['pear', 'apple', 'banana', 'apricot'];
quickSort(words);
console.log(words); // ['apple', 'apricot', 'banana', 'pear']
