/**
 * In-place insertion sort.
 * @param arr Array of numbers to be sorted.
 * @returns The same array instance, now sorted.
 */
function insertionSort(arr: number[]): number[] {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    // Shift elements that are greater than key to one position ahead
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

/* ---------- Usage example ---------- */
const data = [9, 3, 7, 4, 1];
console.log('before:', data);
insertionSort(data);
console.log('after: ', data);   // [1, 3, 4, 7, 9]
