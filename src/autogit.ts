/**
 * Heap‑sort – sorts an array of numbers in ascending order.
 * The algorithm works in O(n log n) time and O(1) extra space (in‑place).
 *
 * @param arr The array to sort – it will be mutated.
 */
export function heapSort(arr: number[]): void {
  const n = arr.length;

  // Step 1. Build a max‑heap.
  // The last non‑leaf node is at floor(n/2) - 1.
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    siftDown(arr, i, n);
  }

  // Step 2. Repeatedly extract the maximum element.
  for (let end = n - 1; end > 0; end--) {
    swap(arr, 0, end);          // Move current max to its final position.
    siftDown(arr, 0, end);      // Restore heap property for the reduced heap.
  }
}

/**
 * Restores the max‑heap property by sifting a node downwards.
 *
 * @param heap  The heap array.
 * @param start Index of the node to sift down.
 * @param size  The current size of the heap (elements >= size are already sorted).
 */
function siftDown(heap: number[], start: number, size: number): void {
  let root = start;

  while (true) {
    const left = 2 * root + 1;   // Left child index.
    const right = left + 1;      // Right child index.
    let largest = root;

    // If left child exists and is greater than root.
    if (left < size && heap[left] > heap[largest]) {
      largest = left;
    }

    // If right child exists and is greater than current largest.
    if (right < size && heap[right] > heap[largest]) {
      largest = right;
    }

    // If root is already the largest, the heap property holds.
    if (largest === root) break;

    // Swap root with the larger child and continue sifting down.
    swap(heap, root, largest);
    root = largest;
  }
}

/**
 * Utility to swap two elements in an array.
 *
 * @param a    Array containing the elements.
 * @param i    Index of the first element.
 * @param j    Index of the second element.
 */
function swap(a: number[], i: number, j: number): void {
  const tmp = a[i];
  a[i] = a[j];
  a[j] = tmp;
}
const data = [5, 3, 8, 4, 1, 2];
heapSort(data);
console.log(data);  // → [1, 2, 3, 4, 5, 8]
