// Functional merge sort: returns a new sorted array.
// If you don’t pass a comparator, a default one is used that handles numbers, strings, etc.
export function mergeSort<T>(
  array: T[],
  compare?: (a: T, b: T) => number
): T[] {
  // default comparator (works well for numbers and strings)
  const cmp = compare ?? ((a: any, b: any) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  if (array.length <= 1) return array.slice();

  const mid = Math.floor(array.length / 2);
  const left = mergeSort(array.slice(0, mid), cmp);
  const right = mergeSort(array.slice(mid), cmp);
  return merge(left, right, cmp);
}

function merge<T>(left: T[], right: T[], compare: (a: T, b: T) => number): T[] {
  const result: T[] = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (compare(left[i], right[j]) <= 0) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  while (i < left.length) result.push(left[i++]);
  while (j < right.length) result.push(right[j++]);
  return result;
}
// In-place-ish merge sort: sorts the input array in place.
// Uses a single buffer array to perform merges.
export function mergeSortInPlace<T>(
  array: T[],
  compare?: (a: T, b: T) => number
): void {
  const n = array.length;
  const buffer = new Array<T>(n);

  const cmp = compare ?? ((a: any, b: any) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  const sort = (l: number, r: number) => {
    if (r - l <= 1) return;
    const m = Math.floor((l + r) / 2);
    sort(l, m);
    sort(m, r);
    // merge [l, m) and [m, r) into buffer
    let i = l, j = m, k = 0;
    while (i < m && j < r) {
      buffer[k++] = cmp(array[i], array[j]) <= 0 ? array[i++] : array[j++];
    }
    while (i < m) buffer[k++] = array[i++];
    while (j < r) buffer[k++] = array[j++];
    // copy back
    for (let t = 0; t < k; t++) array[l + t] = buffer[t];
  };

  sort(0, n);
}
