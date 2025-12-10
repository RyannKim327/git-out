/**
 * In-place Bubble Sort (ascending order).
 * @param arr Array of numbers to be sorted.
 * @returns The same array reference, now sorted.
 */
function bubbleSort(arr: number[]): number[] {
  const n = arr.length;
  let swapped: boolean;

  do {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        // Swap elements
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
    // After each pass, the largest element among the unsorted
    // portion is bubbled to the end, so we can shorten the loop.
    // (We don't add that micro-optimization here for clarity.)
  } while (swapped);

  return arr;
}

/* ---------- Usage ---------- */
const data = [64, 34, 25, 12, 22, 11, 90];
console.log('Original:', data);
bubbleSort(data);
console.log('Sorted:  ', data);
npx tsc bubble.ts
node bubble.js
Original: [ 64, 34, 25, 12, 22, 11, 90 ]
Sorted:   [ 11, 12, 22, 25, 34, 64, 90 ]
