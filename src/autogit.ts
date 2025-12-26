/**
 * In-place bubble sort.
 * @param arr Array of numbers (or any items that can be compared with `>`).
 * @returns The same array, now sorted in ascending order.
 */
function bubbleSort<T>(arr: T[]): T[] {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    // Last i elements are already in place
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // swap
        swapped = true;
      }
    }

    if (!swapped) break; // array is sorted
  }
  return arr;
}

/* ---------- Usage example ---------- */
const nums = [64, 34, 25, 12, 22, 11, 90];
console.log('Original:', nums);
bubbleSort(nums);
console.log('Sorted:  ', nums);
tsc bubble.ts
node bubble.js
Original: [ 64, 34, 25, 12, 22, 11, 90 ]
Sorted:   [ 11, 12, 22, 25, 34, 64, 90 ]
