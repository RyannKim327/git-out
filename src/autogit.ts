// Merge two sorted sub‑ranges [l .. mid] and [mid+1 .. r] into tmp
function merge(
  arr: number[],
  tmp: number[],
  l: number,
  mid: number,
  r: number
): void {
  let i = l;        // pointer for the left half
  let j = mid + 1;  // pointer for the right half
  let k = l;        // pointer for the tmp array

  // Merge until one half runs out
  while (i <= mid && j <= r) {
    if (arr[i] <= arr[j]) tmp[k++] = arr[i++];
    else tmp[k++] = arr[j++];
  }

  // Copy any remaining elements of the left half
  while (i <= mid) tmp[k++] = arr[i++];

  // Copy any remaining elements of the right half
  while (j <= r) tmp[k++] = arr[j++];

  // Return merged result back to the original array
  for (let p = l; p <= r; p++) arr[p] = tmp[p];
}

/**
 * Bottom‑up merge sort (iterative).
 *
 * @param arr - The array to sort (in‑place)
 */
function mergeSortIterative(arr: number[]): void {
  const n = arr.length;
  const tmp = new Array<number>(n);

  // sz = 1, 2, 4, 8, ...  (size of sub‑arrays to merge)
  for (let sz = 1; sz < n; sz <<= 1) {
    // l = start index of sub‑array pair
    for (let l = 0; l < n - sz; l += sz << 1) {
      const mid = l + sz - 1;
      const r = Math.min(l + (sz << 1) - 1, n - 1);
      merge(arr, tmp, l, mid, r);
    }
  }
}
const data = [38, 27, 43, 3, 9, 82, 10];
mergeSortIterative(data);
console.log(data); // [3, 9, 10, 27, 38, 43, 82]
