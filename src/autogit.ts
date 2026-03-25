/**
 * Heap sort – sorts the array *in place* in ascending order.
 *
 * @param arr - mutable array of comparable values
 */
export function heapSort<T>(arr: T[], cmp: (a: T, b: T) => number = defaultCmp): void {
  const n = arr.length;

  /** Default comparator for numbers / strings */
  function defaultCmp(a: T, b: T): number {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }

  /* ---------- heapify ----------
   *  Rearranges subtree rooted at `i` so that
   *  arr[i] is the largest of the subtree.
   *  `size` is the effective heap size.
   */
  const heapify = (i: number, size: number): void => {
    let largest = i;
    const left  = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < size && cmp(arr[left], arr[largest]) > 0)
      largest = left;

    if (right < size && cmp(arr[right], arr[largest]) > 0)
      largest = right;

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      heapify(largest, size);       // continue down
    }
  };

  /* ---------- 1. build max‑heap ---------- */
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(i, n);
  }

  /* ---------- 2. extract max repeatedly ---------- */
  for (let size = n; size > 1; size--) {
    // Move current max to the end.
    [arr[0], arr[size - 1]] = [arr[size - 1], arr[0]];

    // Restore heap property on the reduced heap.
    heapify(0, size - 1);
  }
}

/* ---------- Usage example ---------- */
const data = [5, 3, 8, 4, 1, 9, 2];
heapSort(data);          // in‑place
console.log(data);       // [1, 2, 3, 4, 5, 8, 9]
heapSort(array);          // sorts in place, ascending
