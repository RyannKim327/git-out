/**
 * Merge two sorted halves in `src` from `left`..`mid` and `mid`..`right`
 * into the destination array `dest`.
 */
function merge<T>(
  src: T[],
  dest: T[],
  left: number,
  mid: number,
  right: number,
  compare: (a: T, b: T) => number
) {
  let i = left;   // index into left half
  let j = mid;    // index into right half
  let k = left;   // index into dest

  while (i < mid && j < right) {
    dest[k++] = compare(src[i], src[j]) <= 0 ? src[i++] : src[j++];
  }

  // Copy any remaining elements from left half
  while (i < mid) dest[k++] = src[i++];
  // Copy any remaining elements from right half
  while (j < right) dest[k++] = src[j++];
}

/**
 * Bottom‑up merge sort.
 * @param arr   The array you want to sort in place.
 * @param cmp   Optional comparator: (a, b) => number
 *              (negative → a < b, zero → a == b, positive → a > b)
 */
export function mergeSortIterative<T>(
  arr: T[],
  cmp?: (a: T, b: T) => number
): void {
  const compare = cmp ?? ((a: any, b: any) => (a < b ? -1 : a > b ? 1 : 0));
  const n = arr.length;
  if (n <= 1) return;

  // A scratch array of the same size – we reuse it each pass.
  const temp: T[] = new Array(n);

  // The size of sub‑arrays we merge: 1, 2, 4, 8, …
  for (let width = 1; width < n; width *= 2) {
    // Merge in chunks of size 2*width
    for (let left = 0; left < n; left += 2 * width) {
      const mid = Math.min(left + width, n);
      const right = Math.min(left + 2 * width, n);
      merge(arr, temp, left, mid, right, compare);
    }

    // Now temp contains the sorted runs of size 2*width.
    // Copy it back to arr for the next pass.
    for (let i = 0; i < n; i++) arr[i] = temp[i];
  }
}
const data = [38, 27, 43, 3, 9, 82, 10];
mergeSortIterative(data);
console.log(data);
// → [3, 9, 10, 27, 38, 43, 82]
mergeSortIterative(data, (a, b) => b - a);  // descending order
