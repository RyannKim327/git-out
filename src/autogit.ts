/**
 * Shell sort (in-place, ascending order).
 * Uses the gap sequence: 1, 4, 13, 40, 121, 364, 1093, …
 * (3×previous + 1) until it is >= array length, then works backwards.
 *
 * Time-complexity:
 *   Worst-case:  O(n^(3/2))  (empirical for this sequence)
 *   Best-case:  O(n log n)
 * Space: O(1)
 */
function shellSort<T>(arr: T[]): T[] {
  const n = arr.length;

  // 1. Build the gap sequence up to the largest < n
  let h = 1;
  while (h < n / 3) h = h * 3 + 1;   // 1, 4, 13, 40, …

  // 2. Work backwards through the gaps
  while (h >= 1) {
    // 3. Do an insertion-sort for this gap
    for (let i = h; i < n; i++) {
      const temp = arr[i];
      let j = i;
      while (j >= h && arr[j - h] > temp) {
        arr[j] = arr[j - h];
        j -= h;
      }
      arr[j] = temp;
    }
    h = Math.floor(h / 3);            // next smaller gap
  }
  return arr;
}

/* ---------- small demo ---------- */
const nums = [64, 34, 25, 12, 22, 11, 90];
console.log('before:', nums);
shellSort(nums);
console.log('after: ', nums);
