/**
 * Bottom-up (iterative) merge sort.
 * Runs in O(n log n) time and O(n) extra space.
 * Stable (equal keys keep their original left-to-right order).
 */
export function mergeSortIterative<T>(a: T[]): T[] {
  const n = a.length;
  if (n < 2) return a;                 // already sorted

  const aux = a.slice();                // one auxiliary buffer
  let width = 1;                        // current run length

  while (width < n) {
    let left = 0;
    while (left < n) {
      const mid = Math.min(left + width, n);
      const right = Math.min(left + width * 2, n);
      merge(a, aux, left, mid, right);  // merge a[left:mid] with a[mid:right]
      left = right;
    }
    width *= 2;
  }
  return a;
}

/**
 * Merge two adjacent sorted slices a[l:mid] and a[mid:r] into one slice a[l:r].
 * Uses aux as temporary storage.
 */
function merge<T>(a: T[], aux: T[], l: number, mid: number, r: number): void {
  let i = l;      // cursor in left half
  let j = mid;    // cursor in right half
  let k = l;      // cursor in auxiliary array

  // Merge while both halves have elements
  while (i < mid && j < r) {
    // stable: choose left element on equality
    aux[k++] = a[i] <= a[j] ? a[i++] : a[j++];
  }

  // Copy leftovers (only one of these loops will run)
  while (i < mid) aux[k++] = a[i++];
  while (j < r)   aux[k++] = a[j++];

  // Copy back from aux to original array
  for (let t = l; t < r; t++) a[t] = aux[t];
}
const nums = [5, 3, 9, 1, 7, 2];
mergeSortIterative(nums);
console.log(nums); // [1, 2, 3, 5, 7, 9]
