/**
 * Bubble Sort (ascending order)
 * @param arr Array of numbers
 * @returns the same array, now sorted
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
    // so next pass can ignore the last element.
  } while (swapped);

  return arr;
}

/* ---------- Usage ---------- */
const data = [64, 34, 25, 12, 22, 11, 90];
console.log('Original:', data.join(','));
bubbleSort(data);
console.log('Sorted:  ', data.join(','));
tsc bubble.ts
node bubble.js
Original: 64,34,25,12,22,11,90
Sorted:   11,12,22,25,34,64,90
