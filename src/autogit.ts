/**
 * Iterative (bottom-up) merge sort.
 * Time: O(n log n)   Space: O(n)
 */
export function mergeSortIterative<T>(arr: T[]): T[] {
  const n = arr.length;
  if (n < 2) return arr;

  const aux = arr.slice();          // one auxiliary buffer
  let width = 1;                    // current sub-array size

  while (width < n) {
    for (let left = 0; left < n; left += 2 * width) {
      const mid = Math.min(left + width, n);
      const right = Math.min(left + 2 * width, n);

      // merge arr[left..mid-1] and arr[mid..right-1] into aux[left..right-1]
      let i = left, j = mid, k = left;
      while (i < mid && j < right)
        aux[k++] = arr[i] <= arr[j] ? arr[i++] : arr[j++];
      while (i < mid)  aux[k++] = arr[i++];
      while (j < right) aux[k++] = arr[j++];
    }

    // swap roles of arr and aux for next pass
    [arr, aux] = [aux, arr];
    width *= 2;
  }

  // if we ended with the result in aux, copy it back
  if (arr !== aux) {
    for (let i = 0; i < n; ++i) arr[i] = aux[i];
  }
  return arr;
}
const data = [3, 7, 1, -4, 0, 42, 8, 5];
console.log(mergeSortIterative([...data])); // [-4, 0, 1, 3, 5, 7, 8, 42]
