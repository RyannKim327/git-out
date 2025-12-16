/**
 * Shell sort (in-place, ascending order).
 * @param arr Array of numbers to sort.
 * @param gapSequence Optional gap sequence (defaults to Sedgewick’s increments).
 * @returns The same array instance, now sorted.
 */
export function shellSort(arr: number[], gapSequence?: number[]): number[] {
  const gaps = gapSequence ?? sedgewickGaps(arr.length);

  for (const gap of gaps) {
    // Straight insertion sort on every gapped sub-array
    for (let i = gap; i < arr.length; i++) {
      const temp = arr[i];
      let j = i;
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = temp;
    }
  }
  return arr;
}

/** Sedgewick’s increment sequence (good practical choice). */
function sedgewickGaps(n: number): number[] {
  const seq: number[] = [];
  let k = 0, hk = 1;
  while (hk < n) {
    seq.unshift(hk);
    // 9·2^k − 9·2^(k/2) + 1  (k even)
    // 8·2^k − 6·2^((k+1)/2) + 1 (k odd)
    k++;
    const exp = Math.floor(k / 2);
    hk = k & 1
      ? 9 * (1 << k) - 9 * (1 << exp) + 1
      : 8 * (1 << k) - 6 * (1 << exp) + 1;
  }
  return seq;
}

/* ---- demo ---- */
if (import.meta.main) {
  const data = [64, 34, 25, 12, 22, 11, 90];
  console.log("before:", data);
  shellSort(data);
  console.log("after: ", data);
}
