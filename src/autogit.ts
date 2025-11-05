/**
 * In-place selection sort.
 * Sorts the array in ascending order.
 * Time:  O(n²)
 * Space: O(1)
 */
function selectionSort<T>(arr: T[]): T[] {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    // Find the index of the smallest element in the unsorted suffix
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }

    // Swap the found minimum with the first unsorted element
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}

/* ---------- Usage ---------- */
const nums = [64, 25, 12, 22, 11];
console.log("Original:", nums.join(", "));
selectionSort(nums);
console.log("Sorted:  ", nums.join(", "));
npx ts-node selection-sort.ts
Original: 64, 25, 12, 22, 11
Sorted:   11, 12, 22, 25, 64
