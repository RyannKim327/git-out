/**
 * Merge two sorted slices of `arr` into a temporary array.
 *
 * @param arr  source array
 * @param tmp  temporary array of the same length
 * @param left  start index of the first slice
 * @param mid   end index (exclusive) of the first slice and start of the second
 * @param right end index (exclusive) of the second slice
 */
function merge(
  arr: number[],
  tmp: number[],
  left: number,
  mid: number,
  right: number
): void {
  let i = left;   // index in first slice
  let j = mid;    // index in second slice
  let k = left;   // index in tmp

  // Copy the relevant segment to tmp
  for (let idx = left; idx < right; idx++) tmp[idx] = arr[idx];

  // Merge back into arr
  while (i < mid && j < right) {
    arr[k++] = tmp[i] <= tmp[j] ? tmp[i++] : tmp[j++];
  }
  while (i < mid) arr[k++] = tmp[i++];
  while (j < right) arr[k++] = tmp[j++];
}

/**
 * Iterative merge sort.
 *
 * @param arr  array to sort in‑place
 */
function mergeSortIterative(arr: number[]): void {
  const n = arr.length;
  if (n < 2) return; // already sorted

  const tmp = new Array<number>(n);

  // Run size = 1, 2, 4, 8, ...
  for (let run = 1; run < n; run *= 2) {
    for (let left = 0; left < n; left += 2 * run) {
      const mid = Math.min(left + run, n);
      const right = Math.min(left + 2 * run, n);
      if (mid < right) merge(arr, tmp, left, mid, right);
    }
  }
}
const nums = [34, 7, 23, 32, 5, 62];
mergeSortIterative(nums);
console.log(nums); // [5, 7, 23, 32, 34, 62]
