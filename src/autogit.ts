/**
 * Iterative, bottom-up merge sort (stable).
 * @param data  Array of items that can be compared with `<`
 * @param cmp   Optional comparator (a,b)=>number, default ascending
 * @returns     New sorted array (original is left untouched)
 */
export function mergeSortIterative<T>(
  data: readonly T[],
  cmp: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): T[] {
  const a = data.slice();          // work on a copy
  const n = a.length;
  if (n < 2) return a;               // already sorted

  const aux: T[] = new Array(n);     // one auxiliary buffer is enough

  // Double the width of the sub-arrays that are already sorted
  for (let w = 1; w < n; w *= 2) {
    // Merge adjacent runs of length w
    for (let lo = 0; lo < n - w; lo += 2 * w) {
      const mid = lo + w;
      const hi  = Math.min(lo + 2 * w, n);
      merge(a, aux, lo, mid, hi, cmp);
    }
  }
  return a;
}

/* Merge a[lo:mid] with a[mid:hi] into a[lo:hi] (stable) */
function merge<T>(
  a: T[],
  aux: T[],
  lo: number,
  mid: number,
  hi: number,
  cmp: (a: T, b: T) => number
): void {
  let i = lo;      // cursor left part
  let j = mid;     // cursor right part
  let k = lo;      // cursor auxiliary array

  // Copy both halves into auxiliary buffer
  for (let x = lo; x < hi; x++) aux[x] = a[x];

  while (i < mid && j < hi) {
    a[k++] = cmp(aux[i], aux[j]) <= 0 ? aux[i++] : aux[j++];
  }
  // Copy leftovers (only left side can have leftovers)
  while (i < mid) a[k++] = aux[i++];
  // Right-side leftovers are already in place
}
const nums   = [9, 3, 7, 4, 1, 8, 2, 5, 0];
const sorted = mergeSortIterative(nums);
console.log(sorted); // [0,1,2,3,4,5,7,8,9]

// Descending order with custom comparator
const desc = mergeSortIterative(nums, (a, b) => b - a);
console.log(desc); // [9,8,7,5,4,3,2,1,0]
