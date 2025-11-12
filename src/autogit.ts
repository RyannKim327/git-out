/**
 * Iterative, stable, bottom-up merge sort.
 * @param arr        Array to sort (in place)
 * @param compareFn  Optional comparator. Defaults to ascending `<`.
 */
export function mergeSortIterative<T>(
  arr: T[],
  compareFn: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): void {
  const n = arr.length;
  if (n < 2) return;

  // One auxiliary buffer that we swap between the two halves
  const aux: T[] = new Array(n);

  // Bottom-up: merge subarrays of size 1, 2, 4, 8...
  for (let width = 1; width < n; width *= 2) {
    // Copy current state into aux
    aux.set(arr);

    // Merge adjacent runs of length `width`
    for (let left = 0; left < n; left += 2 * width) {
      const mid = Math.min(left + width, n);
      const right = Math.min(left + 2 * width, n);

      let i = left;      // cursor in left half
      let j = mid;       // cursor in right half
      let k = left;      // cursor in original array

      // Merge the two sorted runs
      while (i < mid && j < right) {
        if (compareFn(aux[i], aux[j]) <= 0) {
          arr[k++] = aux[i++];
        } else {
          arr[k++] = aux[j++];
        }
      }
      // Copy leftovers
      while (i < mid) arr[k++] = aux[i++];
      while (j < right) arr[k++] = aux[j++];
    }
  }
}

/* ---------- demo ---------- */
const nums = [5, 2, 9, 1, 5, 6];
mergeSortIterative(nums);
console.log(nums); // [1, 2, 5, 5, 6, 9]
