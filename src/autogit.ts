/**
 * Bubble Sort (ascending order)
 * @param arr Array of numbers to sort IN-PLACE
 * @returns the same array reference, now sorted
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
    // After each pass, the largest element among the unsorted
    // part is bubbled to the end, so we can shorten the loop.
    // (Not shown here for clarity, but easy to add.)
  } while (swapped);

  return arr;
}

/* ---------- Quick test ---------- */
const data = [5, 3, 8, 4, 2];
console.log("before:", data);
bubbleSort(data);
console.log("after: ", data); // [2, 3, 4, 5, 8]
tsc bubble.ts
node bubble.js
