/**
 * Bubble Sort (ascending order)
 * @param arr Array of numbers
 * @returns the same array, sorted in-place
 */
function bubbleSort(arr: number[]): number[] {
  const n = arr.length;
  let swapped: boolean;

  do {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        // swap
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
    // After each pass the largest element is at the end,
    // so the next pass can ignore the last element.
    n--;
  } while (swapped);

  return arr;
}

// --- Demo ---
const data = [64, 34, 25, 12, 22, 11, 90];
console.log('Before:', data);
bubbleSort(data);
console.log('After: ', data);
tsc bubble.ts
node bubble.js
Before: [ 64, 34, 25, 12, 22, 11, 90 ]
After:  [ 11, 12, 22, 25, 34, 64, 90 ]
