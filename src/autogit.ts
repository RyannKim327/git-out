/**
 * Insertion sort (ascending order).
 * @param arr Array to sort (modified in place)
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
const nums   = [5, 2, 9, 1, 5, 6];
const words  = ['pear', 'apple', 'orange', 'apple'];

console.log(insertionSort([...nums]));   // [1, 2, 5, 5, 6, 9]
console.log(insertionSort([...words]));  // ["apple", "apple", "orange", "pear"]
