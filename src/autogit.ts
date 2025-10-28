/**
 * In-place Shell sort (ascending) using Knuth's gap sequence.
 * @param arr Array of numbers (or any items that support < and >)
 */
function shellSort<T>(arr: T[]): T[] {
  // 1. Build the Knuth gap sequence: 1, 4, 13, 40, 121, ...
  let h = 1;
  const n = arr.length;
  while (h < n / 3) h = 3 * h + 1;

  // 2. Loop over the gaps (down to 1)
  while (h >= 1) {
    // 3. h-sort the array (insertion-sort style)
    for (let i = h; i < n; i++) {
      const temp = arr[i];
      let j = i;
      while (j >= h && arr[j - h] > temp) {
        arr[j] = arr[j - h];
        j -= h;
      }
      arr[j] = temp;
    }
    h = Math.floor(h / 3);
  }
  return arr;
}

/* ---------- Usage example ---------- */
const nums = [64, 34, 25, 12, 22, 11, 90];
console.log('Before:', nums);
shellSort(nums);
console.log('After: ', nums);
npx ts-node shellsort.ts
Before: [ 64, 34, 25, 12, 22, 11, 90 ]
After:  [ 11, 12, 22, 25, 34, 64, 90 ]
