/**
 * In-place selection sort.
 * Time:  O(n²)
 * Space: O(1)
 */
function selectionSort<T>(arr: T[]): T[] {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    // Find index of smallest element in the unsorted suffix
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }

    // Swap current front with the smallest found
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
Original: 64, 25, 12, 22, 11
Sorted:   11, 12, 22, 25, 64
