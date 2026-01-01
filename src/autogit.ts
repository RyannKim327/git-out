/**
 * Merge Sort (stable)
 * Time:  O(n log n) – best, average, worst
 * Space: O(n)      – needs auxiliary arrays
 */
export function mergeSort<T>(arr: T[]): T[] {
  if (arr.length < 2) return arr.slice();          // defensive copy
  const aux = arr.slice();                           // one shared buffer
  mergeSortRange(arr, aux, 0, arr.length - 1);
  return arr;
}

/**
 * Recursive divide step
 */
function mergeSortRange<T>(
  a: T[],
  aux: T[],
  left: number,
  right: number
): void {
  if (left >= right) return;

  const mid = left + Math.floor((right - left) / 2);
  mergeSortRange(a, aux, left, mid);
  mergeSortRange(a, aux, mid + 1, right);
  merge(a, aux, left, mid, right);
}

/**
 * Merge two consecutive sorted slices a[left..mid] and a[mid+1..right]
 */
function merge<T>(
  a: T[],
  aux: T[],
  left: number,
  mid: number,
  right: number
): void {
  // copy relevant slice to auxiliary array
  for (let i = left; i <= right; i++) aux[i] = a[i];

  let i = left;      // cursor for left half
  let j = mid + 1;     // cursor for right half
  let k = left;        // cursor for merged result

  while (i <= mid && j <= right) {
    // stable: <= keeps left element first
    a[k++] = aux[i] <= aux[j] ? aux[i++] : aux[j++];
  }
  // copy leftover elements (only left can have leftovers)
  while (i <= mid) a[k++] = aux[i++];
}
const nums = [38, 27, 43, 3, 9, 82, 10];
const sorted = mergeSort(nums);
console.log(sorted); // [3, 9, 10, 27, 38, 43, 82]
const descending = mergeSort([3, 1, 4], (a, b) => b - a);
export function mergeSort<T>(
  arr: T[],
  cmp: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): T[] { ... }
