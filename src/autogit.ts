/**
 * Merges two consecutive sorted halves of `arr` into a single sorted segment.
 * `left` … start index of the first half
 * `mid`  … start index of the second half (i.e. left + size)
 * `right`… end index (exclusive) of the second half
 * The merged result is written back into `arr`.
 */
function merge(
  arr: number[],
  left: number,
  mid: number,
  right: number,
  temp: number[]
) {
  let i = left;   // index in first half
  let j = mid;    // index in second half
  let k = left;   // index in temp

  while (i < mid && j < right) {
    if (arr[i] <= arr[j]) temp[k++] = arr[i++];
    else                   temp[k++] = arr[j++];
  }

  // copy any remaining elements from the first half
  while (i < mid) temp[k++] = arr[i++];
  // anything left from the second half already sits in temp

  // copy back to the original array
  for (let p = left; p < right; ++p) arr[p] = temp[p];
}

/**
 * Iterative merge sort.
 * Works in O(n log n) time, O(n) auxiliary space for the temporary array.
 */
export function mergeSortIterative(arr: number[]): void {
  const n = arr.length;
  if (n <= 1) return;                 // already sorted

  const temp = new Array<number>(n);   // reuse this buffer

  // subarray size starts at 1 (single elements) and doubles each pass
  for (let sz = 1; sz < n; sz *= 2) {
    // merge adjacent subarrays of size sz
    for (let left = 0; left < n - sz; left += sz * 2) {
      const mid   = left + sz;          // left + sz is the start of the 2nd half
      const right = Math.min(left + sz * 2, n);
      merge(arr, left, mid, right, temp);
    }
  }
}

// ------------------------------------------------------------------
// Example usage
// ------------------------------------------------------------------

// Readable example – will sort the array in place
const sample = [38, 27, 43, 3, 9, 82, 10];
mergeSortIterative(sample);
console.log(sample);  // [3, 9, 10, 27, 38, 43, 82]
