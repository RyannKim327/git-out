/**
 * In-place insertion sort.
 * @param arr Array of numbers
 * @returns The same array, now sorted ascending
 */
function insertionSort(arr: number[]): number[] {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    // Shift larger elements one position to the right
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

/* ---------- Usage ---------- */
const data = [9, 3, 1, 5, 2];
console.log(insertionSort(data)); // [1, 2, 3, 5, 9]
function insertionSortGeneric<T>(
  arr: T[],
  compare: (a: T, b: T) => number
): T[] {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    while (j >= 0 && compare(arr[j], key) > 0) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

/* ---------- Usage ---------- */
const words = ['pear', 'apple', 'orange'];
insertionSortGeneric(words, (a, b) => a.localeCompare(b));
console.log(words); // ["apple", "orange", "pear"]
