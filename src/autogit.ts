/**
 * In-place heap sort.
 * @param arr Array to sort.
 * @param compare Optional comparator (defaults to ascending for numbers).
 */
export function heapSort<T>(
  arr: T[],
  compare: (a: T, b: T) => number = (a, b) => (a as any) - (b as any)
): T[] {
  const n = arr.length;

  /* ---------- helpers ---------- */
  const parent = (i: number) => Math.floor((i - 1) / 2);
  const left   = (i: number) => 2 * i + 1;
  const right  = (i: number) => 2 * i + 2;

  /* Build max-heap */
  const heapify = (size: number, i: number) => {
    let largest = i;
    const l = left(i);
    const r = right(i);

    if (l < size && compare(arr[l], arr[largest]) > 0) largest = l;
    if (r < size && compare(arr[r], arr[largest]) > 0) largest = r;

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      heapify(size, largest);
    }
  };

  /* ---------- algorithm ---------- */
  // 1. Build max-heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(n, i);

  // 2. Extract elements one by one
  for (let end = n - 1; end > 0; end--) {
    [arr[0], arr[end]] = [arr[end], arr[0]]; // move current max to the end
    heapify(end, 0);                         // restore heap property on the remaining part
  }

  return arr;
}

/* ---------- demo ---------- */
if (require.main === module) {
  const nums = [7, 3, 9, 1, 5, 2];
  heapSort(nums);
  console.log(nums); // [1, 2, 3, 5, 7, 9]

  // Descending order
  const words = ['pear', 'apple', 'orange'];
  heapSort(words, (a, b) => b.localeCompare(a));
  console.log(words); // ['pear', 'orange', 'apple']
}
