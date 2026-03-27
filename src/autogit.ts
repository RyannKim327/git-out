/**
 * Merge‑sort an array **in place** using a bottom‑up (iterative) scheme.
 *
 * @param arr   The array to sort. Elements must be comparable using the `<=` operator.
 * @param buf   Optional temporary buffer. If omitted, a new one of the same length is created.
 * @returns     The sorted array (same reference as `arr`).
 */
export function mergeSortIterative<T>(arr: T[], buf?: T[]): T[] {
  const n = arr.length;
  if (n < 2) return arr;            // already sorted

  // Use an explicit buffer if one isn't supplied.
  const buffer = buf ?? (arr as unknown as T[]).slice();

  // start with run-length 1, double every pass
  for (let len = 1; len < n; len <<= 1) {
    // Scan over pairs of runs
    for (let i = 0; i < n; i += len * 2) {
      const left  = i;
      const mid   = Math.min(i + len, n);
      const right = Math.min(i + len * 2, n);

      // Merge arr[left…mid) and arr[mid…right) into buffer[left…right)
      let p = left, q = mid, b = left;
      while (p < mid && q < right) {
        buffer[b++] = (arr[p] <= arr[q] ? arr[p++] : arr[q++]);
      }
      while (p < mid) buffer[b++] = arr[p++];
      while (q < right) buffer[b++] = arr[q++];
    }
    // swap roles: buffer → arr
    [arr, buffer] = [buffer, arr];
  }

  // If the final sorted data sits in `buffer` we copy it back.
  if (Array.isArray(buffer) && arr !== buffer) {
    for (let i = 0; i < n; i++) arr[i] = buffer[i];
  }
  return arr;
}
const data = [9, 3, 7, 1, 4, 8, 0, 5, 2, 6];
mergeSortIterative(data);   // data is now sorted
console.log(data);          // [0,1,2,3,4,5,6,7,8,9]
