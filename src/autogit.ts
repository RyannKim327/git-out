/**
 * Bottom‑up merge sort.
 *
 * @param arr   The array to sort.  The sort is performed in place.
 * @returns     The sorted array (useful for chaining / convenience).
 */
export function mergeSortIterative<T>(arr: T[]): T[] {
  const n = arr.length;
  if (n <= 1) return arr;              // nothing to do

  // auxiliary array – we copy data in and out of it
  const aux = new Array<T>(n);

  // start with runs of length 1 and double until the whole array is covered
  for (let sz = 1; sz < n; sz <<= 1) {
    // merge adjacent runs of width `sz`
    for (let lo = 0; lo < n - sz; lo += sz * 2) {
      const mid = lo + sz;                     // end of left run
      const hi  = Math.min(lo + sz * 2, n);    // exclusive upper bound
      merge(arr, aux, lo, mid, hi);
    }
  }
  return arr;
}
/**
 * Merge two consecutive sorted halves `arr[lo..mid)` and `arr[mid..hi)`.
 * Output is written back into `arr` using the auxiliary buffer `aux`.
 */
function merge<T>(
  arr: T[],
  aux: T[],
  lo: number,
  mid: number,
  hi: number
): void {
  // copy the relevant segment into aux
  for (let i = lo; i < hi; i++) {
    aux[i] = arr[i];
  }

  let i = lo;      // pointer into left half
  let j = mid;     // pointer into right half
  for (let k = lo; k < hi; k++) {
    if (i >= mid) {
      arr[k] = aux[j++];
    } else if (j >= hi) {
      arr[k] = aux[i++];
    } else if (aux[j] < aux[i]) {   // you can plug in a custom comparator if you want
      arr[k] = aux[j++];
    } else {
      arr[k] = aux[i++];
    }
  }
}
// helper to display array nicely
const fmt = (a: number[]) => `[${a.join(', ')}]`;

// Random test helper
function randomArray(len: number, max = 100) {
  return Array.from({ length: len }, () => Math.floor(Math.random() * max));
}

// sanity checks
console.time('iterative');
const sorted1 = mergeSortIterative(randomArray(1_000_000));
console.timeEnd('iterative');          // ~200-300 ms on a typical laptop

// make sure it's really sorted
for (let i = 1; i < sorted1.length; i++) {
  if (sorted1[i - 1] > sorted1[i]) {
    throw new Error('Not sorted!');
  }
}
function mergeSortIterativeWith<T>(arr: T[], comp: (a: T, b: T) => number): T[] {
  const n = arr.length;
  if (n <= 1) return arr;
  const aux = new Array<T>(n);
  for (let sz = 1; sz < n; sz <<= 1) {
    for (let lo = 0; lo < n - sz; lo += sz * 2) {
      const mid = lo + sz;
      const hi  = Math.min(lo + sz * 2, n);
      mergeWith(arr, aux, lo, mid, hi, comp);
    }
  }
  return arr;
}

function mergeWith<T>(
  arr: T[],
  aux: T[],
  lo: number,
  mid: number,
  hi: number,
  comp: (a: T, b: T) => number
): void {
  for (let i = lo; i < hi; i++) aux[i] = arr[i];
  let i = lo, j = mid;
  for (let k = lo; k < hi; k++) {
    if (i >= mid) arr[k] = aux[j++];
    else if (j >= hi) arr[k] = aux[i++];
    else if (comp(aux[j], aux[i]) < 0) arr[k] = aux[j++];
    else arr[k] = aux[i++];
  }
}
