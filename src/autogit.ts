/**
 * Bubble sort for an array of numbers.
 * The function mutates the passed array and returns it so you can chain or immediately inspect it.
 *
 * @param arr – the array to sort
 * @returns the sorted array (same reference as `arr`)
 */
export function bubbleSort(arr: number[]): number[] {
  // The array’s length is used repeatedly, so cache it for speed.
  const n = arr.length;

  // Outer loop – each pass pushes the next largest element to its final spot at the end.
  // We can stop one element earlier on each pass because the last `pass` items are already sorted.
  for (let pass = 0; pass < n - 1; pass++) {
    // Track whether any swap happened this pass. If none, the array is sorted.
    let swapped = false;

    // Inner loop – compare adjacent pairs and swap if out of order.
    // We only need to go up to `n - pass - 1` because the last `pass` elements are in place.
    for (let i = 0; i < n - pass - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        // Simple swap using destructuring.
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }

    // If no two elements were swapped, no more passes are required.
    if (!swapped) break;
  }

  return arr;
}
const unsorted = [64, 34, 25, 12, 22, 11, 90];
console.log(bubbleSort(unsorted));        // [11, 12, 22, 25, 34, 64, 90]
