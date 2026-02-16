/**
 * Performs an in‑place Shell sort on `arr`.
 * The generic makes it usable for numbers, strings, or any comparable type.
 */
export function shellSort<T>(arr: T[], compare?: (a: T, b: T) => boolean) {
  const len = arr.length;
  // Default comparison: ascending numeric/string order
  const cmp = compare ?? ((a: T, b: T) => (a as any) < (b as any));

  // Start with a gap (Hibbard’s sequence is simple and effective)
  // gap = 1, 3, 7, 15, …  (2^k‑1)
  let gap = 1;
  while (gap < len) gap = 2 * gap + 1; // find largest Hibbard gap <= len

  // Descend gaps until 1
  while (gap >= 1) {
    // Insertion sort on elements gap apart
    for (let i = gap; i < len; i++) {
      const temp = arr[i];
      let j = i;
      // shift earlier gap‑sorted elements that are greater
      while (j >= gap && cmp(temp, arr[j - gap])) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = temp;
    }
    // Next gap
    gap = Math.floor((gap - 1) / 2); // inverse of 2*gap + 1
  }
}
const numbers = [23, 12, 1, 8, 34, 54, 2, 3];
shellSort(numbers);
console.log(numbers); // [1, 2, 3, 8, 12, 23, 34, 54]
const desc = (a: number, b: number) => a > b;
shellSort(numbers, desc);
