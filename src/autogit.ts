/**
 * Performs an in‑place insertion sort on an array of numeric values.
 * @param data The array to sort – it will be mutated directly.
 */
export function insertionSort<T extends number[]> (data: T): void {
  // walk from the second element to the end
  for (let i = 1; i < data.length; i++) {
    const key = data[i];          // value we’re trying to insert
    let j = i - 1;

    /* Shift elements that are greater than `key` up by one
       position until we find the spot for the key. */
    while (j >= 0 && data[j] > key) {
      data[j + 1] = data[j];
      j--;
    }

    // put the key into its final place
    data[j + 1] = key;
  }
}
import { insertionSort } from "./insertion-sort";

const nums = [34, 8, 64, 51, 32, 24];
insertionSort(nums);
console.log(nums);  // → [ 8, 24, 32, 34, 51, 64 ]
