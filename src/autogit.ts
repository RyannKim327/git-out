/**
 * In-place heap sort (ascending by default).
 * @param arr        Array to sort.
 * @param compareFn  Optional comparator. Defaults to ascending for numbers.
 * @returns          The same array instance, now sorted.
 */
export function heapSort<T>(
  arr: T[],
  compareFn: (a: T, b: T) => number = (a, b) => (a as any) - (b as any)
): T[] {
  const n = arr.length;

  /* ---------- helpers ---------- */
  const parent = (i: number) => ((i - 1) >> 1) >>> 0;
  const left   = (i: number) => (i * 2 + 1) >>> 0;
  const right  = (i: number) => (i * 2 + 2) >>> 0;

  const swap = (i: number, j: number) => [arr[i], arr[j]] = [arr[j], arr[i]];

  // Establish max-heap property (for ascending order)
  const heapify = (end: number, i: number) => {
    let largest = i;
    const l = left(i);
    const r = right(i);

    if (l < end && compareFn(arr[l], arr[largest]) > 0) largest = l;
    if (r < end && compareFn(arr[r], arr[largest]) > 0) largest = r;

    if (largest !== i) {
      swap(i, largest);
      heapify(end, largest);
    }
  };

  /* ---------- build max-heap ---------- */
  for (let i = parent(n - 1); i >= 0; --i) heapify(n, i);

  /* ---------- extract elements ---------- */
  for (let end = n - 1; end > 0; --end) {
    swap(0, end);          // move current max to final position
    heapify(end, 0);         // restore heap on remaining [0..end-1]
  }

  return arr;
}

/* ---------- quick demo ---------- */
if (require.main === module) {
  const nums = [5, 3, 6, 2, 9, 1];
  console.log("original:", nums);
  heapSort(nums);
  console.log("sorted:  ", nums);

  // Descending order example
  const words = ["pear", "apple", "banana"];
  heapSort(words, (a, b) => b.localeCompare(a));
  console.log("words ↓:", words);
}
npx ts-node heapSort.ts
original: [ 5, 3, 6, 2, 9, 1 ]
sorted:   [ 1, 2, 3, 5, 6, 9 ]
words ↓: [ 'pear', 'banana', 'apple' ]
