/**
 * Merge‑sort for an array of T.
 *
 * @param array      – the array to sort (mutated in‑place)
 * @param compareFn – optional comparator (a, b) => number
 *                    (neg: < a, 0: equal, pos: > a)
 * @returns the sorted array (same reference as the input)
 */
export function mergeSort<T>(
  array: T[],
  compareFn: (a: T, b: T) => number = defaultCompare
): T[] {
  // Base case: a single element is already sorted.
  if (array.length <= 1) return array;

  // Split the array in half.
  const mid = Math.floor(array.length / 2);
  const left = array.slice(0, mid);
  const right = array.slice(mid);

  // Recursively sort each half then merge them.
  mergeSort(left, compareFn);
  mergeSort(right, compareFn);
  merge(array, left, right, compareFn);
  return array;               // return the same array reference
}

/**
 * Merge the two sorted halves back into `out`.
 */
function merge<T>(
  out: T[],
  left: T[],
  right: T[],
  compareFn: (a: T, b: T) => number
) {
  let i = 0, j = 0, k = 0;
  while (i < left.length && j < right.length) {
    if (compareFn(left[i], right[j]) <= 0) out[k++] = left[i++];
    else out[k++] = right[j++];
  }
  // Copy any remaining items.
  while (i < left.length) out[k++] = left[i++];
  while (j < right.length) out[k++] = right[j++];
}

/**
 * Default comparator for numbers or strings.
 */
function defaultCompare<T>(a: T, b: T): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}
const nums = [34, 7, 23, 32, 5, 62];
mergeSort(nums);            // in‑place sort
console.log(nums);          // [5, 7, 23, 32, 34, 62]

// With a custom comparator (e.g., reverse order)
mergeSort(nums, (a, b) => b - a);
console.log(nums);          // [62, 34, 32, 23, 7, 5]
