/**
 * Shell Sort (Shell, 1959)
 * Works by sorting elements that are a diminishing gap apart.
 * Time-complexity:  O(n^(3/2)) worst-case with Sedgewick’s gap sequence.
 * Space-complexity: O(1)
 */
export function shellSort<T>(arr: T[]): T[] {
  const a = arr.slice();          // avoid mutating caller’s array
  const n = a.length;

  // Sedgewick’s increments (good practical choice)
  const gaps = [701, 301, 132, 57, 23, 10, 4, 1];

  for (const gap of gaps) {
    if (gap >= n) continue;       // skip gaps larger than array

    // gapped insertion sort
    for (let i = gap; i < n; i++) {
      const temp = a[i];
      let j = i;
      while (j >= gap && a[j - gap] > temp) {
        a[j] = a[j - gap];
        j -= gap;
      }
      a[j] = temp;
    }
  }
  return a;
}

/* ---------- usage ---------- */
const data = [64, 34, 25, 12, 22, 11, 90];
const sorted = shellSort(data);
console.log('original:', data);
console.log('sorted  :', sorted);
npx ts-node shellSort.ts
original: [ 64, 34, 25, 12, 22, 11, 90 ]
sorted  : [ 11, 12, 22, 25, 34, 64, 90 ]
