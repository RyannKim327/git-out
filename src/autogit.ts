/**
 * Selection sort – returns a **new** sorted array.
 * The original array is left untouched.
 *
 * @param arr   – source array
 * @returns     – a new array sorted in ascending order
 */
export function selectionSort<T>(arr: readonly T[]): T[] {
  const toSort = [...arr];          // clone so we don't mutate the caller's array
  const n = toSort.length;

  for (let i = 0; i < n - 1; i++) {
    // assume the smallest element is at i
    let minIndex = i;

    // find the real smallest element in the remaining unsorted section
    for (let j = i + 1; j < n; j++) {
      if (toSort[j] < toSort[minIndex]) {
        minIndex = j;
      }
    }

    // swap the found minimum with the element at i
    if (minIndex !== i) {
      [toSort[i], toSort[minIndex]] = [toSort[minIndex], toSort[i]];
    }
  }

  return toSort;
}
const unsorted = [9, 3, 10, 2, 7];
const sorted = selectionSort(unsorted);

console.log(sorted);      // [2, 3, 7, 9, 10]
console.log(unsorted);    // remains [9, 3, 10, 2, 7]
export function selectionSortRecursive<T>(arr: readonly T[]): T[] {
  const toSort = [...arr];
  const helper = (k: number) => {
    if (k >= toSort.length - 1) return;

    let minIdx = k;
    for (let i = k + 1; i < toSort.length; i++) {
      if (toSort[i] < toSort[minIdx]) minIdx = i;
    }

    if (minIdx !== k) [toSort[k], toSort[minIdx]] = [toSort[minIdx], toSort[k]];
    helper(k + 1);
  };

  helper(0);
  return toSort;
}
