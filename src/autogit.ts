/**
 * Shell Sort (generic, ascending order).
 * @param arr Array to sort (in place).
 * @param gapSeq Optional gap sequence (defaults to Sedgewick's increments).
 * @returns The same array, now sorted.
 */
export function shellSort<T>(
  arr: T[],
  gapSeq: number[] = sedgewickGaps(arr.length)
): T[] {
  const n = arr.length;
  if (n < 2) return arr;

  for (const gap of gapSeq) {
    // Straight insertion sort on every gapped sub-array
    for (let i = gap; i < n; i++) {
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

/**
 * Sedgewick gap sequence (1986) – good average-case performance.
 * Returns gaps in *descending* order, largest ≤ length.
 */
function sedgewickGaps(n: number): number[] {
  const gaps: number[] = [];
  let k = 0, g = 0;
  // 9·4^k − 9·2^k + 1  and  4^(k+2) − 3·2^(k+2) + 1
  while (g < n) {
    g = k & 1
      ? 9 * (2 ** k - 2 ** (k >> 1)) + 1
      : 9 * (2 ** k - 2 ** ((k - 1) >> 1)) + 1;
    if (g < n) gaps.unshift(g); // prepend to keep descending
    k++;
  }
  return gaps.length ? gaps : [1]; // at least 1
}

/* ---------- Usage ---------- */
const nums = [64, 34, 25, 12, 22, 11, 90];
shellSort(nums);
console.log(nums); // [11, 12, 22, 25, 34, 64, 90]

const words = ["pear", "apple", "orange", "banana"];
shellSort(words);
console.log(words); // ["apple", "banana", "orange", "pear"]
