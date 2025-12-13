/**
 * In-place quicksort.
 * @param arr  Array to sort (mutated).
 * @param left  Left boundary (inclusive).
 * @param right Right boundary (inclusive).
 */
function quickSort<T>(arr: T[], left = 0, right = arr.length - 1): void {
  if (left >= right) return;

  const p = partition(arr, left, right);
  quickSort(arr, left, p - 1);
  quickSort(arr, p + 1, right);
}

/**
 * Lomuto partition: returns final index of pivot.
 */
function partition<T>(arr: T[], left: number, right: number): number {
  const pivot = arr[right];
  let i = left; // place for next smaller element

  for (let j = left; j < right; j++) {
    if (arr[j] <= pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }
  [arr[i], arr[right]] = [arr[right], arr[i]];
  return i;
}

/* ---------- Usage ---------- */
const nums = [9, 3, 7, 4, 69, 420, 42];
quickSort(nums);
console.log(nums); // [3, 4, 7, 9, 42, 69, 420]

const words = ['pear', 'apple', 'orange', 'banana'];
quickSort(words);
console.log(words); // ['apple', 'banana', 'orange', 'pear']
const quickSorted = <T>(arr: readonly T[]): T[] => {
  if (arr.length < 2) return [...arr];
  const pivot = arr[arr.length - 1];
  const left = arr.filter(x => x < pivot);
  const mid = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  return [...quickSorted(left), ...mid, ...quickSorted(right)];
};
