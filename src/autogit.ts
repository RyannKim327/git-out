/**
 * Bubble sort – O(n²) average / worst case.
 *
 * @param arr – array that will be sorted (mutated)
 * @returns the same array reference, now sorted ascending
 */
function bubbleSort<T>(arr: T[]): T[] {
  const n = arr.length;

  // Outer loop: go through the array n‑1 times
  for (let i = 0; i < n - 1; i++) {
    // Inner loop scans up to the unsorted part
    // We can stop early when the array is already sorted
    let swapped = false;

    for (let j = 0; j < n - 1 - i; j++) {
      // Use > so that equal values stay in place
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }

    // No swaps means the array is sorted
    if (!swapped) break;
  }

  return arr;
}

// Example
const nums = [64, 34, 25, 12, 22, 11, 90];
console.log(bubbleSort(nums)); // [11, 12, 22, 25, 34, 64, 90]
