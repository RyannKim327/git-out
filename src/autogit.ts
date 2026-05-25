/**
 * Insertion sort (in‑place).
 *
 * @param arr The array you want to sort. It will be sorted *mutably*.
 * @param compare Optional comparator. If omitted, numeric or string ascending order is used.
 * @returns The same array reference, now sorted.
 */
export function insertionSort<T>(
  arr: T[],
  compare?: (a: T, b: T) => number
): T[] {
  // Default to JS native >/< when no comparator is supplied
  const cmp = compare ?? ((a: T, b: T) => {
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  });

  // Work from index 1 to the end; index 0 is already “sorted” by itself
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    // Move elements that are greater than `key` one position to the right
    while (j >= 0 && cmp(arr[j], key) > 0) {
      arr[j + 1] = arr[j];
      j--;
    }

    // Place `key` in its correct spot
    arr[j + 1] = key;
  }

  return arr;
}
const nums = [8, 3, 5, 4, 6, 1];
console.log(insertionSort(nums)); // -> [1, 3, 4, 5, 6, 8]

// With a custom comparator: sort strings by length (descending)
const fruits = ['apple', 'kiwi', 'banana', 'fig'];
const byLengthDesc = (a: string, b: string) => b.length - a.length;
console.log(insertionSort(fruits, byLengthDesc));
