/**
 * Sorts the input array in ascending order using insertion sort.
 * @param arr  Array of numbers (mutated in place)
 * @returns    The same array reference, now sorted
 */
function insertionSort(arr: number[]): number[] {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];          // Current element to insert
    let j = i - 1;

    // Shift larger elements to the right
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = key;            // Insert key at its correct spot
  }
  return arr;
}

/* ---------- Example usage ---------- */
const data = [9, 3, 7, 4, 1, 8];
console.log('Before:', data);
insertionSort(data);
console.log('After:', data);
tsc insertionSort.ts
node insertionSort.js
