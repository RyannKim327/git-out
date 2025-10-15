/**
 * Shell Sort (in-place, ascending order)
 * @param arr Array of numbers to be sorted
 * @returns the same array instance, now sorted
 */
export function shellSort(arr: number[]): number[] {
  const n = arr.length;
  if (n < 2) return arr;

  // Knuth’s interval sequence: h = 3*h + 1
  let h = 1;
  while (h < n / 3) h = 3 * h + 1;

  while (h >= 1) {
    // h-sort the array
    for (let i = h; i < n; i++) {
      const temp = arr[i];
      let j = i;
      while (j >= h && arr[j - h] > temp) {
        arr[j] = arr[j - h];
        j -= h;
      }
      arr[j] = temp;
    }
    h = Math.floor(h / 3);
  }
  return arr;
}

/* ---------- Usage example ---------- */
const data = [64, 34, 25, 12, 22, 11, 90];
console.log('before:', data);
shellSort(data);
console.log('after: ', data);
