/**
 * Sorts an array of numbers (or any type that can be compared) in place.
 * @param arr The array to be sorted. Mutation is intentional for O(1) auxiliary space.
 */
export function insertionSort<T>(arr: T[]): void {
  // Nothing to do for empty or single‑element arrays
  if (arr.length < 2) return;

  // Iterate over the array starting at index 1 because the sub‑array
  // arr[0..i‑1] is already considered sorted.
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    // Shift elements that are greater than the key one position to the right.
    // This makes space for the key to sit in its correct sorted spot.
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }

    // Place the key after the element just smaller than it
    arr[j + 1] = key;
  }
}
const nums = [5, 2, 9, 1, 5, 6];
insertionSort(nums);
console.log(nums); // [1, 2, 5, 5, 6, 9]
