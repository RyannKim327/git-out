/**
 * Swaps two elements of an array.
 */
function swap<T>(arr: T[], i: number, j: number): void {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

/**
 * Moves the element at index `root` downwards to restore the max‑heap
 * property, assuming that the sub‑trees rooted at its children are
 * already max‑heaps.
 */
function sink<T>(arr: T[], root: number, size: number, compare: (a: T, b: T) => number): void {
  let largest = root;

  const left  = 2 * root + 1;
  const right = 2 * root + 2;

  if (left < size && compare(arr[left], arr[largest]) > 0) {
    largest = left;
  }
  if (right < size && compare(arr[right], arr[largest]) > 0) {
    largest = right;
  }

  if (largest !== root) {
    swap(arr, root, largest);
    sink(arr, largest, size, compare);
  }
}

/**
 * Builds a max‑heap from an arbitrary array.
 */
function buildMaxHeap<T>(arr: T[], compare: (a: T, b: T) => number): void {
  const size = arr.length;
  // Start from the last non‑leaf node and sink each one.
  for (let i = Math.floor(size / 2) - 1; i >= 0; i--) {
    sink(arr, i, size, compare);
  }
}

/**
 * Heap‑sort: sorts `arr` in ascending order.
 */
export function heapSort<T>(arr: T[], compare?: (a: T, b: T) => number): void {
  // Default to numeric ascending for numbers; for a generic compare,
  // provide a custom function.
  const cmp = compare ?? ((a, b) => (a as any) > (b as any) ? 1 : (a < b ? -1 : 0));

  // 1️⃣ Turn the array into a max‑heap.
  buildMaxHeap(arr, cmp);

  // 2️⃣ Repeatedly pull the max element to its final slot.
  for (let heapSize = arr.length; heapSize > 1; heapSize--) {
    // The current max is at 0 – move it to the end.
    swap(arr, 0, heapSize - 1);

    // Restore the heap property on the reduced heap.
    sink(arr, 0, heapSize - 1, cmp);
  }
}
const data = [3, 1, 4, 1, 5, 9, 2, 6];
heapSort(data);          // data is now [1, 1, 2, 3, 4, 5, 6, 9]
const unsorted = [10, 4, 7, 3, 8, 2];
heapSort(unsorted);
console.log(unsorted); // [2, 3, 4, 7, 8, 10]
