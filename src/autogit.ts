/**
 * In-place insertion sort.
 * @param arr Array of numbers (or anything that can be compared with `<` and `>`)
 * @returns the same array, now sorted
 */
function insertionSort<T>(arr: T[]): T[] {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    // Shift larger items one position to the right
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

/* ---------- Usage ---------- */
const nums = [5, 2, 9, 1, 5, 6];
console.log(insertionSort(nums)); // [1, 2, 5, 5, 6, 9]
