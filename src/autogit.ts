/**
 * In-place quicksort (ascending).
 * @param arr  Array of numbers (or any type that supports `<` and `>`).
 * @param left  Left index (inclusive).  Defaults to 0.
 * @param right Right index (inclusive). Defaults to arr.length-1.
 */
function quickSort<T>(
  arr: T[],
  left = 0,
  right = arr.length - 1,
  compare: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): T[] {
  if (left >= right) return arr;

  const pivot = partition(arr, left, right, compare);
  quickSort(arr, left, pivot - 1, compare);
  quickSort(arr, pivot + 1, right, compare);
  return arr;
}

/** Lomuto partition scheme. */
function partition<T>(
  arr: T[],
  left: number,
  right: number,
  compare: (a: T, b: T) => number
): number {
  const pivotVal = arr[right];
  let i = left;

  for (let j = left; j < right; j++) {
    if (compare(arr[j], pivotVal) < 0) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }
  [arr[i], arr[right]] = [arr[right], arr[i]];
  return i;
}

/* ---------- Usage ---------- */
const nums = [3, 7, 2, 9, 1, 5, 4, 8, 6];
quickSort(nums);
console.log(nums); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// With custom comparator (descending):
const strs = ['pear', 'banana', 'apple'];
quickSort(strs, 0, strs.length - 1, (a, b) => b.localeCompare(a));
console.log(strs); // ["pear", "banana", "apple"]
