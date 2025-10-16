/**
 * In-place quicksort (recursive).
 * @param arr          Array to sort.
 * @param compareFn    Optional comparator. Defaults to ascending `<`/`>` for primitives.
 * @param left         Left index (used internally).
 * @param right        Right index (used internally).
 */
export function quickSort<T>(
  arr: T[],
  compareFn?: (a: T, b: T) => number,
  left = 0,
  right = arr.length - 1
): T[] {
  const cmp =
    compareFn ||
    ((a: T, b: T) => (a < b ? -1 : a > b ? 1 : 0));

  function partition(l: number, r: number): number {
    const pivot = arr[r]; // choose right-most as pivot
    let i = l - 1;        // place for swapping

    for (let j = l; j < r; j++) {
      if (cmp(arr[j], pivot) <= 0) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    [arr[i + 1], arr[r]] = [arr[r], arr[i + 1]];
    return i + 1;
  }

  if (left < right) {
    const p = partition(left, right);
    quickSort(arr, cmp, left, p - 1);
    quickSort(arr, cmp, p + 1, right);
  }
  return arr;
}

/* ---------- usage ---------- */
const nums = [3, 7, 2, 9, 1];
quickSort(nums);
console.log(nums); // [1, 2, 3, 7, 9]

const words = ['pear', 'Banana', 'apple'];
quickSort(words, (a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
console.log(words); // ["apple", "Banana", "pear"]
