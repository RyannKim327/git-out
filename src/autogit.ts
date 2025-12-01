// merge-sort.ts

/**
 * Merge two *sorted* sub-arrays into one sorted array.
 * Left half:  arr[l..m]   (inclusive)
 * Right half: arr[m+1..r] (inclusive)
 */
function merge<T>(arr: T[], l: number, m: number, r: number, compare: (a: T, b: T) => number): void {
  const leftSize = m - l + 1;
  const rightSize = r - m;

  // Temp arrays (typed via generics)
  const L: T[] = new Array(leftSize);
  const R: T[] = new Array(rightSize);

  for (let i = 0; i < leftSize; i++) L[i] = arr[l + i];
  for (let j = 0; j < rightSize; j++) R[j] = arr[m + 1 + j];

  let i = 0;      // index for L
  let j = 0;      // index for R
  let k = l;      // index for merged section in original array

  while (i < leftSize && j < rightSize) {
    if (compare(L[i], R[j]) <= 0) {
      arr[k++] = L[i++];
    } else {
      arr[k++] = R[j++];
    }
  }

  // Copy leftovers
  while (i < leftSize) arr[k++] = L[i++];
  while (j < rightSize) arr[k++] = R[j++];
}

/**
 * Recursive merge sort (in-place, but uses O(n) extra memory via merge).
 * Sorts the portion arr[l..r] (inclusive).
 */
function mergeSortRecursive<T>(arr: T[], l: number, r: number, compare: (a: T, b: T) => number): void {
  if (l >= r) return;               // 0 or 1 element → already sorted
  const m = Math.floor((l + r) / 2);
  mergeSortRecursive(arr, l, m, compare);
  mergeSortRecursive(arr, m + 1, r, compare);
  merge(arr, l, m, r, compare);
}

/**
 * Public helper: sorts the entire array *in place* and returns it for chaining.
 * Default comparator works for numbers, strings, Dates, etc.
 */
export function mergeSort<T>(
  arr: T[],
  compare: (a: T, b: T) => number = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): T[] {
  if (arr.length < 2) return arr;
  mergeSortRecursive(arr, 0, arr.length - 1, compare);
  return arr;
}

/* -------------------------------------------------
 * Optional: iterative (bottom-up) version
 * -------------------------------------------------
 * Guarantees O(n log n) time and O(n) space without recursion.
 */
export function mergeSortIterative<T>(
  arr: T[],
  compare: (a: T, b: T) = (a, b) => (a < b ? -1 : a > b ? 1 : 0)
): T[] {
  const n = arr.length;
  const aux: T[] = arr.slice(); // working buffer

  for (let width = 1; width < n; width *= 2) {
    for (let left = 0; left < n; left += 2 * width) {
      const mid = Math.min(left + width - 1, n - 1);
      const right = Math.min(left + 2 * width - 1, n - 1);
      merge(arr, left, mid, right, compare);
    }
  }
  return arr;
}

/* -------------------------------------------------
 * Quick sanity check
 * ------------------------------------------------- */
if (require.main === module) {
  const nums = [5, 3, 8, 4, 2, 7, 1, 10];
  console.log("original:", nums);
  mergeSort(nums);
  console.log("sorted  :", nums);

  // Descending order example
  const words = ["pear", "banana", "apple", "cherry"];
  mergeSort(words, (a, b) => b.localeCompare(a));
  console.log("words desc:", words);
}
