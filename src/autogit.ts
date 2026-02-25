/**
 * Compare two numbers (or any types that support `<` and `>`).
 * Returns positive if a > b, negative if a < b, zero otherwise.
 */
const compare = <T>(a: T, b: T): number => {
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
};

/**
 * Restores the max‑heap property for the sub‑array a[0 … n-1]
 * starting from index i, assuming its children already satisfy
 * the heap property.
 */
const heapify = <T>(a: T[], n: number, i: number): void => {
  let largest = i;
  const left  = 2 * i + 1;
  const right = 2 * i + 2;

  if (left  < n && compare(a[left],  a[largest]) > 0) largest = left;
  if (right < n && compare(a[right], a[largest]) > 0) largest = right;

  if (largest !== i) {
    [a[i], a[largest]] = [a[largest], a[i]];
    heapify(a, n, largest);
  }
};

/**
 * Turns an array into a max‑heap. Complexity O(n).
 */
const buildHeap = <T>(a: T[]): void => {
  const n = a.length;
  // start at the last parent node
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(a, n, i);
  }
};

/**
 * Heap‑sort: arr is sorted in‑place.
 */
export const heapSort = <T>(arr: T[]): void => {
  buildHeap(arr);
  for (let i = arr.length - 1; i > 0; i--) {
    // move current root (max) to the end
    [arr[0], arr[i]] = [arr[i], arr[0]];
    // heapify the reduced heap
    heapify(arr, i, 0);
  }
};
