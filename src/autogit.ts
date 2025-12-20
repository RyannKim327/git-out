/**
 * In-place insertion sort.
 * @param arr Array of numbers (or anything that can be compared with `<` and `>`)
 * @returns the same array, now sorted
 */
function insertionSort<T>(arr: T[]): T[] {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    // Shift larger items to the right
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
function insertionSortWithComparator<T>(
  arr: T[],
  cmp: (a: T, b: T) => number
): T[] {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    while (j >= 0 && cmp(arr[j], key) > 0) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

// Example: sort strings descending
const words = ['pear', 'apple', 'orange'];
console.log(insertionSortWithComparator(words, (a, b) => b.localeCompare(a)));
// ["pear", "orange", "apple"]
