/**
 * In-place Shell sort (ascending order).
 * Works for any array whose items can be compared with < and >.
 * Time-complexity:  between O(n log n) and O(n²) depending on gap sequence.
 * Space-complexity: O(1)
 */
export function shellSort<T>(arr: T[]): T[] {
  const n = arr.length;
  if (n < 2) return arr;

  /* --- 1. Gap sequence (Ciura, 2001 – near-optimal for practical sizes) --- */
  let k = 0;
  const gaps: number[] = [];
  for (let g = 1; g < n; g = g * 2 + 1) gaps.push(g);   // 1, 3, 7, 15, 31…
  gaps.reverse();                                       // largest → smallest

  /* --- 2. H-sort with each gap --- */
  for (const h of gaps) {
    /* plain insertion sort, but comparing items h apart */
    for (let i = h; i < n; i++) {
      const temp = arr[i];
      let j = i;
      while (j >= h && arr[j - h] > temp) {
        arr[j] = arr[j - h];
        j -= h;
      }
      arr[j] = temp;
    }
  }
  return arr;
}

/* ------------ demo ------------ */
if (import.meta.vitest === undefined) {   // skip when running via Vitest/Jest
  const data = [64, 34, 25, 12, 22, 11, 90, 88];
  console.log('before:', data);
  shellSort(data);
  console.log('after: ', data);
}
