/**
 * In-place heap-sort.
 * @param arr  Array to sort (ascending).
 * @param compare Optional comparator. Defaults to (a, b) => a - b.
 */
export function heapSort<T>(
  arr: T[],
  compare: (a: T, b: T) => number = (a, b) => (a as any) - (b as any)
): void {
  const n = arr.length;

  /* ---------- 1. Build max-heap ---------- */
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    siftDown(i, n);
  }

  /* ---------- 2. Repeatedly extract max ---------- */
  for (let end = n - 1; end > 0; end--) {
    swap(0, end);          // move current max to final position
    siftDown(0, end);      // restore heap property on the reduced heap
  }

  /* ---------- helpers ---------- */
  function siftDown(root: number, size: number): void {
    while (true) {
      let largest = root;
      const left = 2 * root + 1;
      const right = 2 * root + 2;

      if (left < size && compare(arr[left], arr[largest]) > 0) largest = left;
      if (right < size && compare(arr[right], arr[largest]) > 0) largest = right;

      if (largest === root) break;

      swap(root, largest);
      root = largest;
    }
  }

  function swap(i: number, j: number): void {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

/* ---------- quick demo ---------- */
if (require.main === module) {
  const data = [23, 1, 7, 4, 99, 55, 3];
  heapSort(data);
  console.log(data); // [1, 3, 4, 7, 23, 55, 99]
}
heapSort(users, (u1, u2) => u2.age - u1.age); // descending by age
