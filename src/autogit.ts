/**
 * In‑place insertion sort.
 *
 * @param arr  The array to sort.  It will be mutated.
 * @param compare Optional comparison function.  If omitted, the default
 *                 JavaScript `<` operator is used (suitable for numbers,
 *                 strings, etc.).
 * @returns The sorted array (same reference as the input).
 */
export function insertionSort<T>(
  arr: T[],
  compare?: (a: T, b: T) => number
): T[] {
  if (arr.length < 2) return arr;          // already sorted

  // Default comparer: a < b => -1, a > b => +1, else 0
  const cmp = compare ?? ((a: T, b: T) => (a < b ? -1 : a > b ? 1 : 0));

  // Start from the second element – the first is trivially sorted.
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;

    // Move elements that are greater than key one position ahead.
    while (j >= 0 && cmp(arr[j], key) > 0) {
      arr[j + 1] = arr[j];
      j--;
    }

    // Place key after the element just smaller than it.
    arr[j + 1] = key;
  }

  return arr;
}
const nums = [8, 3, 5, 1, 9, 6];
console.log(insertionSort(nums)); // [1, 3, 5, 6, 8, 9]

const words = ['pear', 'apple', 'orange'];
console.log(insertionSort(words)); // ['apple', 'orange', 'pear']

// Custom comparator (reverse order for numbers)
console.log(insertionSort([4, 1, 7, 3], (a, b) => b - a));
// [7, 4, 3, 1]
