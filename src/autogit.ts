/**
 * In-place Selection Sort (ascending order).
 * Time:  O(n²)
 * Space: O(1)
 */
function selectionSort<T>(arr: T[]): T[] {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    // Find the smallest element in the unsorted suffix
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }

    // Swap the found minimum with the current position
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}

/* ---------- Optional: pure version ---------- */
function selectionSortPure<T>(input: readonly T[]): T[] {
  const arr = [...input];          // clone
  selectionSort(arr);              // reuse in-place logic
  return arr;
}

/* ---------- Quick demo ---------- */
if (require.main === module) {
  const data = [64, 25, 12, 22, 11];
  console.log("original :", data);
  console.log("sorted   :", selectionSort(data));        // mutates data
  console.log("after    :", data);                       // data is now sorted
}
tsc selectionSort.ts
node selectionSort.js
original : [ 64, 25, 12, 22, 11 ]
sorted   : [ 11, 12, 22, 25, 64 ]
after    : [ 11, 12, 22, 25, 64 ]
