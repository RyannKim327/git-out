/**
 * Heap-Sort (ascending order) in TypeScript
 * Time:  O(n log n)
 * Space: O(1)  (in-place)
 */
export function heapSort<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[] {
  if (!arr || arr.length < 2) return arr;

  // Default to ascending order (max-heap)
  const cmp = compareFn || ((a, b) => (a > b ? 1 : a < b ? -1 : 0));

  const n = arr.length;

  /* ---------- 1) BUILD-MAX-HEAP ---------- */
  // Start from last parent node and sift-down
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    siftDown(arr, i, n - 1, cmp);
  }

  /* ---------- 2) EXTRACT-MAX REPEATEDLY ---------- */
  for (let end = n - 1; end > 0; end--) {
    // Move current max (root) to the final position
    [arr[0], arr[end]] = [arr[end], arr[0]];
    // Restore heap property on the reduced heap
    siftDown(arr, 0, end - 1, cmp);
  }

  return arr;
}

/**
 * Sift-down (a.k.a. heapify) for max-heap.
 * `end` is the last valid index of the current heap.
 */
function siftDown<T>(
  arr: T[],
  root: number,
  end: number,
  cmp: (a: T, b: T) => number
): void {
  while (true) {
    let largest = root;
    const left  = 2 * root + 1;
    const right = 2 * root + 2;

    if (left  <= end && cmp(arr[left],  arr[largest]) > 0) largest = left;
    if (right <= end && cmp(arr[right], arr[largest]) > 0) largest = right;

    if (largest === root) break;

    [arr[root], arr[largest]] = [arr[largest], arr[root]];
    root = largest;
  }
}

/* ----------------- Usage demo ----------------- */
if (require.main === module) {
  const data = [23, 1, 7, -4, 99, 0, 11];
  console.log("Original:", data.join(", "));
  heapSort(data);
  console.log("Sorted:  ", data.join(", "));

  // Descending order example
  const nums = [3, 1, 4, 1, 5, 9];
  heapSort(nums, (a, b) => b - a); // reverse comparator
  console.log("Descending:", nums.join(", "));
}
