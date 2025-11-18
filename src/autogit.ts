/**
 * In-place selection sort.
 * @param arr Array of items that implement the comparison operators.
 */
function selectionSort<T>(arr: T[]): T[] {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    // Assume the first unsorted element is the smallest
    let minIdx = i;

    // Find the real smallest element in the unsorted part
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    // Swap if a smaller element was found
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}

/* ---------- Example ---------- */
const nums = [64, 25, 12, 22, 11];
console.log("before:", nums);
selectionSort(nums);
console.log("after: ", nums); // [11, 12, 22, 25, 64]
tsc selection.ts && node selection.js
