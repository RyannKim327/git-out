/**
 * Iterative (bottom‑up) merge sort.
 * @param arr The array to be sorted (in‑place).
 * @returns The sorted array – same reference as the input.
 */
function mergeSortIterative<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
  if (arr.length <= 1) return arr;          // nothing to do

  const n = arr.length;
  const temp: T[] = new Array(n);           // temporary buffer for merging

  // width is the size of sub‑runs to merge: 1, 2, 4, 8, ...
  for (let width = 1; width < n; width *= 2) {
    // left is the start of the first run in a pair
    for (let left = 0; left < n; left += 2 * width) {
      const mid   = Math.min(left + width, n);        // first run ends
      const right = Math.min(left + 2 * width, n);    // second run ends

      // merge [left, mid) and [mid, right) into temp
      let i = left,      // index in first run
          j = mid,       // index in second run
          k = left;      // index in temp

      while (i < mid && j < right) {
        // Use compareFn if supplied, else default <>
        const cmp = compareFn
          ? compareFn(arr[i], arr[j])
          : (arr[i] as any) < (arr[j] as any) ? -1 : ((arr[i] as any) > (arr[j] as any) ? 1 : 0);
        
        if (cmp <= 0) {
          temp[k++] = arr[i++];
        } else {
          temp[k++] = arr[j++];
        }
      }

      // copy any remaining items from the first run
      while (i < mid) temp[k++] = arr[i++];
      // copy any remaining items from the second run
      while (j < right) temp[k++] = arr[j++];

      // copy the merged part back into the original array
      for (let p = left; p < right; p++) {
        arr[p] = temp[p];
      }
    }
  }

  return arr;
}
const numbers = [38, 27, 43, 3, 9, 82, 10];
mergeSortIterative(numbers);
console.log(numbers); // [3, 9, 10, 27, 38, 43, 82]
mergeSortIterative(list, (a, b) => a.age - b.age);
