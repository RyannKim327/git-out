/**
 * Shell sort (ascending order).
 * @param arr Array of numbers to sort in place.
 */
function shellSort(arr: number[]): void {
  const n = arr.length;

  // Start with a large gap, then reduce the gap
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // Do a gapped insertion sort for this gap size.
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j: number;

      // Shift earlier gap-sorted elements up until the correct location for arr[i] is found
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        arr[j] = arr[j - gap];
      }

      // Put temp (the original arr[i]) in its correct location
      arr[j] = temp;
    }
  }
}

// --- Demo ---
const nums = [64, 34, 25, 12, 22, 11, 90];
shellSort(nums);
console.log(nums); // [11, 12, 22, 25, 34, 64, 90]
