/**
 * Heap-Sort (in-place, generic).
 * @param arr        Array to sort
 * @param compare    (a, b) => positive if a should come AFTER b
 *                   Default: (a, b) => b - a   → descending → ascending result
 */
export function heapSort<T>(
  arr: T[],
  compare: (a: T, b: T) => number = (a, b) => (b as any) - (a as any)
): T[] {
  const n = arr.length;

  /* ---- Helper: sift-down (max-heapify) ---- */
  function siftDown(i: number, last: number) {
    while (true) {
      let largest = i;
      const left  = 2 * i + 1;
      const right = 2 * i + 2;

      if (left  <= last && compare(arr[left],  arr[largest]) > 0) largest = left;
      if (right <= last && compare(arr[right], arr[largest]) > 0) largest = right;

      if (largest === i) break;
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      i = largest;
    }
  }

  /* ---- Build max-heap ---- */
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) siftDown(i, n - 1);

  /* ---- Extract elements one by one ---- */
  for (let end = n - 1; end > 0; end--) {
    [arr[0], arr[end]] = [arr[end], arr[0]];
    siftDown(0, end - 1);
  }

  return arr;
}

/* ---------- Usage examples ---------- */
if (import.meta.vitest) {
  const { test, expect } = import.meta.vitest;

  test('numbers ascending', () => {
    const data = [5, 2, 9, 1, 5, 6];
    heapSort(data, (a, b) => a - b); // min-heap comparator → ascending
    expect(data).toEqual([1, 2, 5, 5, 6, 9]);
  });

  test('strings descending', () => {
    const data = ['pear', 'apple', 'orange'];
    heapSort(data); // default comparator → descending
    expect(data).toEqual(['pear', 'orange', 'apple']);
  });
}
npx tsx yourFile.ts
npx vitest  # if you kept the tiny test block
