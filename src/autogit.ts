/**
 * Sorts the array in ascending order using insertion sort.
 * @param arr Array of numbers (or any objects that can be compared with < and >)
 */
function insertionSort<T>(arr: T[]): T[] {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    /* Shift elements of arr[0..i-1] that are greater than key
       to one position ahead of their current position */
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

/* ---------- Usage demo ---------- */
const nums = [5, 2, 9, 1, 5, 6];
console.log('before:', nums);
insertionSort(nums);
console.log('after :', nums);
ts-node insertion-sort.ts
