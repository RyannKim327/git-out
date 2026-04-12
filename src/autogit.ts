/**
 * In‑place heap sort for an array of numbers.
 *
 * Complexity:  O(n log n) time, O(1) additional space
 */
export function heapSort(arr: number[]): void {
  const n = arr.length;

  // 1. Build a max‑heap
  for (let i = (n - 2) >> 1; i >= 0; i--) {
    heapify(arr, i, n);
  }

  // 2. Extract elements one by one
  for (let end = n - 1; end > 0; end--) {
    swap(arr, 0, end);         // move current max to its final position
    heapify(arr, 0, end);      // restore heap property on the reduced heap
  }
}

/** Ensure the subtree rooted at 'rootIdx' is a max‑heap up to 'size'. */
function heapify(arr: number[], rootIdx: number, size: number): void {
  let largest = rootIdx;
  const left = (rootIdx << 1) + 1;   // 2 * rootIdx + 1
  const right = (rootIdx << 1) + 2;  // 2 * rootIdx + 2

  if (left < size && arr[left] > arr[largest]) {
    largest = left;
  }
  if (right < size && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== rootIdx) {
    swap(arr, rootIdx, largest);
    heapify(arr, largest, size); // continue percolating down
  }
}

/** Swap two elements in the array. */
function swap(arr: number[], i: number, j: number): void {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
const data = [3, 1, 4, 1, 5, 9, 2, 6, 5];
heapSort(data);
console.log(data); // [1, 1, 2, 3, 4, 5, 5, 6, 9]
