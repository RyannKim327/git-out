/**
 * Bottom‑up merge‑sort (iterative).
 *
 * @param arr          The array to sort – mutated in‑place.
 * @param compare      Optional compare function.  Defaults to numeric comparison.
 *
 * If you want a sort that works for arbitrary objects just provide a
 * compare function just like `Array.prototype.sort` expects:
 *   - negative if a < b
 *   - 0  if a == b
 *   - positive if a > b
 */
export function mergeSortIterative<T>(arr: T[], compare?: (a: T, b: T) => number): void {
  const n = arr.length;
  if (n <= 1) return; // already sorted

  // fall back to the natural < > if no comparator given
  const cmp = compare ?? ((a: T, b: T) => (a < b ? -1 : a > b ? 1 : 0));

  // auxiliary buffer – we'll read from one and write to the other
  const buffer = arr.slice(); // clone → same length, owns data

  // "width" is the size of the runs we merge.  Starts at 1 and doubles each pass.
  for (let width = 1; width < n; width <<= 1) {
    // For every pair of runs at this width:
    for (let leftStart = 0; leftStart < n; leftStart += width << 1) {
      const mid = Math.min(leftStart + width, n);          // end of first run
      const rightEnd = Math.min(leftStart + (width << 1), n); // end of second run
      const rightStart = mid;                            // start of second run

      // Merge arr[leftStart:mid] and arr[mid:rightEnd] into buffer
      let i = leftStart;  // pointer into first run (in arr or buffer)
      let j = rightStart; // pointer into second run
      let k = leftStart;  // write pointer into buffer

      // Decide which source (arr or buffer) contains the current runs.
      // On the first pass, arr contains the data; from the second pass onwards,
      // buffer holds the sorted runs from the previous width.
      const src = (width === 1) ? arr : buffer; // runs are in src for this pass
      const dst = buffer;                       // always write into buffer

      while (i < mid && j < rightEnd) {
        if (cmp(src[i] as any, src[j] as any) <= 0) {
          dst[k++] = src[i++];
        } else {
          dst[k++] = src[j++];
        }
      }
      // copy the rest of the left run (if any)
      while (i < mid) {
        dst[k++] = src[i++];
      }
      // copy the rest of the right run (if any)
      while (j < rightEnd) {
        dst[k++] = src[j++];
      }
    }

    // After each full pass, swap arr and buffer.
    // The “source” for the next pass becomes the array that was just written into.
    for (let i = 0; i < n; i++) {
      arr[i] = buffer[i];
    }
    // (No need to copy back – we overwrite `arr` each time.)
  }
}
const arr = [38, 27, 43, 3, 9, 82, 10];
mergeSortIterative(arr);
console.log(arr); // [3, 9, 10, 27, 38, 43, 82]
