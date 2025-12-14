// Default comparator (works for numbers and strings)
function defaultCompare(a: any, b: any): number {
  if (a === b) return 0;
  // @ts-ignore
  if (a < b) return -1;
  // @ts-ignore
  if (a > b) return 1;
  return 0;
}

export function mergeSortIterative<T>(
  arr: T[],
  compare?: (a: T, b: T) => number
): T[] {
  const n = arr.length;
  if (n <= 1) return arr;

  const cmp = compare ?? defaultCompare;
  const aux = new Array<T>(n);
  let src: T[] = arr;
  let dest: T[] = aux;

  // width is the size of sorted blocks to merge
  for (let width = 1; width < n; width *= 2) {
    for (let i = 0; i < n; i += 2 * width) {
      const left = i;
      const mid = Math.min(i + width - 1, n - 1);
      const right = Math.min(i + 2 * width - 1, n - 1);

      if (mid >= left) {
        // merge src[left..mid] and src[mid+1..right] into dest[left..right]
        let k = left;
        let p = left;
        let q = mid + 1;

        while (p <= mid && q <= right) {
          if (cmp(src[p], src[q]) <= 0) dest[k++] = src[p++];
          else dest[k++] = src[q++];
        }
        while (p <= mid) dest[k++] = src[p++];
        while (q <= right) dest[k++] = src[q++];
      } else {
        // no left part, copy the segment
        for (let k = left; k <= right; k++) dest[k] = src[k];
      }
    }
    // swap buffers
    const tmp = src;
    src = dest;
    dest = tmp;
  }

  // If the final sorted data ended up in aux, copy back to the original array
  if (src !== arr) {
    for (let i = 0; i < n; i++) arr[i] = src[i];
  }

  return arr;
}
