/**
 *  k is 1‑based: k = 1 → smallest, k = length → largest
 */
function kthSmallestBySort<T>(a: T[], k: number, cmp?: (a: T, b: T) => number): T | undefined {
  if (k < 1 || k > a.length) return undefined;
  const arr = a.slice();                     // don't touch the original
  arr.sort((x, y) => (cmp ? cmp(x, y) : (x as any) < (y as any) ? -1 : (x as any) > (y as any) ? 1 : 0));
  return arr[k - 1];
}
/**
 * Find the k‑th smallest element (1‑based) in place.
 *
 * @param arr  the array to search
 * @param k    1‑based index (1 = smallest)
 * @param cmp  optional compare function, defaults to the standard `< => >`
 * @returns    the k‑th smallest element, or `undefined` if k is out of bounds
 */
function kthSmallestQuickSelect<T>(
  arr: T[],
  k: number,
  cmp?: (a: T, b: T) => number
): T | undefined {
  if (k < 1 || k > arr.length) return undefined;
  const compare = cmp ?? ((a: T, b: T) => (a as any) < (b as any) ? -1 : (a as any) > (b as any) ? 1 : 0);
  let left = 0;
  let right = arr.length - 1;
  const target = k - 1;              // 0‑based

  while (left <= right) {
    // Pick a pivot (here the middle element)
    const pivotIdx = Math.floor((left + right) / 2);
    const pivotVal = arr[pivotIdx];

    // Partition: elements < pivot on the left, > pivot on the right
    let i = left;
    let j = right;
    while (i <= j) {
      while (compare(arr[i], pivotVal) < 0) i++;
      while (compare(arr[j], pivotVal) > 0) j--;
      if (i <= j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;
        j--;
      }
    }

    // Which side contains the target?
    if (j < target) left = i;
    else if (i > target) right = j;
    else return arr[target];
  }
}
const arr = [7, 3, 5, 2, 9, 1, 4];
const k = 3;           // find the 3rd smallest: answer should be 4

console.log(kthSmallestQuickSelect(arr, k)); // 4
