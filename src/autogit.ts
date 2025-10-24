/**
 * Iterative (bottom-up) merge sort.
 * Returns the same array instance, now sorted.
 */
export function mergeSortIterative(a: number[]): number[] {
  const n = a.length;
  if (n < 2) return a;

  // one auxiliary buffer that we ping-pong between
  const aux = new Array<number>(n);

  // width of the sub-array being merged (1, 2, 4, 8 ...)
  for (let w = 1; w < n; w *= 2) {
    // left start
    for (let left = 0; left < n - w; left += 2 * w) {
      const mid = left + w;
      const right = Math.min(left + 2 * w, n); // upper bound exclusive

      // merge a[left..mid-1] and a[mid..right-1] into aux[left..right-1]
      let i = left;
      let j = mid;
      let k = left;

      while (i < mid && j < right) {
        aux[k++] = a[i] <= a[j] ? a[i++] : a[j++];
      }
      while (i < mid) aux[k++] = a[i++];
      while (j < right) aux[k++] = a[j++];
    }

    // copy back for next pass (or swap pointers)
    for (let i = 0; i < n; i++) a[i] = aux[i];
  }
  return a;
}

/* ---------- quick sanity check ---------- */
if (require.main === module) {
  const data = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
  console.log("before:", data.join());
  mergeSortIterative(data);
  console.log("after: ", data.join());
}
