/**
 * Bottom-up (iterative) merge-sort.
 * Stable, O(n log n) time, O(n) extra memory.
 */
export function mergeSort<T>(a: T[]): T[] {
  const n = a.length;
  if (n < 2) return a;                 // already sorted

  const aux = a.slice();                 // one auxiliary buffer

  let width = 1;                         // current sub-array size
  while (width < n) {
    let left = 0;
    while (left < n - width) {
      const mid  = left + width;
      const right = Math.min(left + width * 2, n);
      merge(a, aux, left, mid, right); // merge a[left:mid] and a[mid:right]
      left = right;
    }
    width *= 2;
  }
  return a;
}

/**
 * Merge two consecutive sorted slices a[left:mid] and a[mid:right]
 * into the same positions of array a, using aux as scratch space.
 */
function merge<T>(a: T[], aux: T[], left: number, mid: number, right: number): void {
  let i = left;      // cursor in first half
  let j = mid;       // cursor in second half
  let k = left;      // cursor in auxiliary array

  // copy the slice we are about to overwrite
  for (let x = left; x < right; ++x) aux[x] = a[x];

  // standard two-finger merge
  while (i < mid && j < right) {
    if (aux[i] <= aux[j]) a[k++] = aux[i++];
    else                  a[k++] = aux[j++];
  }
  // copy any leftovers (only first half can have leftovers)
  while (i < mid) a[k++] = aux[i++];
  // second-half leftovers are already in place
}
const data = [9, 3, 7, 1, 4, 8, 2, 5, 0];
mergeSort(data);
console.log(data); // [0, 1, 2, 3, 4, 5, 7, 8, 9]
