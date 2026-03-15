/**
 * Returns the kth smallest value in `arr` (1‑based k).
 *  Throws an error if k is out of bounds.
 */
export function kthSmallest(arr: number[], k: number): number {
  if (k <= 0 || k > arr.length) {
    throw new RangeError('k is out of bounds');
  }

  // Work on a copy so the original array stays intact.
  const a = arr.slice();

  const quickSelect = (left: number, right: number, index: number) => {
    // If the segment contains only one element, that's the answer.
    if (left === right) return a[left];

    const pivotIndex = partition(left, right);
    if (pivotIndex === index) {
      return a[pivotIndex];
    } else if (pivotIndex < index) {
      return quickSelect(pivotIndex + 1, right, index);
    } else {
      return quickSelect(left, pivotIndex - 1, index);
    }
  };

  const partition = (left: number, right: number): number => {
    // Pick a pivot.  Using the middle element keeps the code short; you could
    // shuffle or use Median‑of‑Three for better worst‑case guarantees.
    const pivot = a[Math.floor((left + right) / 2)];
    let i = left;
    let j = right;

    while (i <= j) {
      while (a[i] < pivot) i++;
      while (a[j] > pivot) j--;
      if (i <= j) {
        [a[i], a[j]] = [a[j], a[i]];
        i++;
        j--;
      }
    }
    return i - 1; // pivot final position
  };

  // `k-1` because the array index is 0‑based.
  return quickSelect(0, a.length - 1, k - 1);
}
export function kthSmallestBySort(arr: number[], k: number): number {
  if (k <= 0 || k > arr.length) throw new RangeError('k is out of bounds');
  const sorted = [...arr].sort((a, b) => a - b);
  return sorted[k - 1];
}
class MinHeap {
  private data: number[] = [];

  push(val: number) {
    this.data.push(val);
    this.bubbleUp(this.data.length - 1);
  }

  /* ... bubbleUp, bubbleDown, peek, pop ... */

  /** Return kth smallest (1‑based). */
  kth(k: number): number {
    if (k <= 0 || k > this.data.length) throw new RangeError();
    const heapCopy = [...this.data];
    let result = -Infinity;
    for (let i = 0; i < k; i++) {
      result = heapCopy[0];
      this.swap(heapCopy, 0, heapCopy.length - 1);
      heapCopy.pop();
      this.sinkDown(heapCopy, 0);
    }
    return result;
  }

  /* helper methods omitted for brevity */
}
