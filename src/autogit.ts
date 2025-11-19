/**
 * In-place insertion sort.
 * @param arr  Array of items that can be compared with `<` and `>`
 * @returns    The same array, now sorted in ascending order
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

/* ---------- Usage example ---------- */
const nums = [5, 2, 9, 1, 5, 6];
console.log(insertionSort(nums)); // [1, 2, 5, 5, 6, 9]

const words = ['pear', 'apple', 'orange', 'apple'];
console.log(insertionSort(words)); // ["apple", "apple", "orange", "pear"]
tsc insertion.ts
node insertion.js
