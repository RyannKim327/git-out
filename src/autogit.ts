/**
 * Sorts an array using Bubble Sort algorithm.
 * @param array - The array to be sorted.
 * @returns A sorted copy of the input array (does not mutate the original).
 */
function bubbleSort(array: number[]): number[] {
  // Create a copy to avoid mutating the original array
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    // Track if any swaps occurred in this pass
    let swapped = false;

    // Last i elements are already in place
    for (let j = 0; j < n - 1 - i; j++) {
      // Compare adjacent elements
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }

    // Early termination if array is already sorted
    if (!swapped) break;
  }

  return arr;
}

// Example Usage
const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
const sortedArray = bubbleSort(unsortedArray);

console.log(sortedArray); // Output: [11, 12, 22, 25, 34, 64, 90]
console.log(unsortedArray); // Original array remains unchanged: [64, 34, 25, 12, 22, 11, 90]
/**
 * Generic Bubble Sort with custom comparator.
 * @param array - Array to sort.
 * @param comparator - Function to compare elements (default: ascending order).
 * @returns Sorted array copy.
 */
function genericBubbleSort<T>(
  array: T[],
  comparator: (a: T, b: T) => boolean = (a, b) => a > b
): T[] {
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    let swapped = false;
    for (let j = 0; j < n - 1 - i; j++) {
      if (comparator(arr[j], arr[j + 1])) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }

  return arr;
}

// Example Usage with Strings
const strings = ["banana", "apple", "date", "cherry"];
const sortedStrings = genericBubbleSort(strings);
console.log(sortedStrings); // ["apple", "banana", "cherry", "date"]

// Example with Custom Comparator (Descending Order)
const descendingSort = genericBubbleSort([4, 2, 7, 1], (a, b) => a < b);
console.log(descendingSort); // [7, 4, 2, 1]
