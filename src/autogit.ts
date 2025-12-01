/**
 * Selection Sort (ascending order)
 * Time:  O(n²)
 * Space: O(1)  (in-place)
 */
function selectionSort<T>(arr: T[]): T[] {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    // Find the index of the smallest element in the unsorted suffix
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    // Swap the found minimum element with the first unsorted element
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }

  return arr;
}

/* ---------- Usage ---------- */
const nums   = [64, 25, 12, 22, 11];
const sorted = selectionSort([...nums]); // spread to avoid mutating the original
console.log('Original:', nums);  // [64, 25, 12, 22, 11]
console.log('Sorted:  ', sorted); // [11, 12, 22, 25, 64]
