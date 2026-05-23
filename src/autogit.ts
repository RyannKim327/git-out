/**
 * Merge two sorted sub‑ranges of `src` [l..m) and [m..r) into `dst[l..r)`.
 *
 * @param src   the source array (contents will not be mutated)
 * @param dst   the destination array into which the merged result goes
 * @param l     left index (inclusive)
 * @param m     middle index (left sub‑range ends here)
 * @param r     right index (exclusive)
 */
function merge<T>(src: T[], dst: T[], l: number, m: number, r: number): void {
    let i = l;      // iterator for left sub‑run
    let j = m;      // iterator for right sub‑run
    let k = l;      // iterator for destination

    while (i < m && j < r) {
        if (src[i] <= src[j]) {
            dst[k++] = src[i++];
        } else {
            dst[k++] = src[j++];
        }
    }

    // copy any leftovers (at most one of the two while above will run)
    while (i < m) dst[k++] = src[i++];
    while (j < r) dst[k++] = src[j++];
}

/**
 * Iterative bottom‑up merge sort.
 *
 * @remarks
 *   * `arr` is the array you want sorted—original remains untouched.
 *   * Returns a new sorted array. If you want to sort in place you
 *     could swap the references to the source and destination arrays
 *     after each pass.
 *
 * @param arr  array to sort
 * @returns    sorted copy of `arr`
 */
export function mergeSort<T>(arr: T[]): T[] {
    const n = arr.length;
    if (n <= 1) return arr.slice();   // trivial case

    let src = arr.slice();            // working copy
    let dst: T[] = new Array(n);      // auxiliary buffer

    // run lengths: 1, 2, 4, 8, ... until we cover the entire array
    for (let run = 1; run < n; run <<= 1) {
        // merge adjacent runs of current length
        for (let start = 0; start < n; start += 2 * run) {
            const mid = Math.min(start + run, n);
            const end = Math.min(start + 2 * run, n);
            merge(src, dst, start, mid, end);
        }

        // the freshly merged segments now sit in `dst`;
        // swap src/dst to let next pass read the new data
        [src, dst] = [dst, src];
    }

    // After the last pass `src` holds the sorted data (due to the final swap)
    return src;
}
