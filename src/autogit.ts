/**
 * Quick‑sort a mutable array in‑place.
 *
 * @template T The element type to sort.
 * @param array    The array to sort.
 * @param compare  Optional comparator:
 *                 -<0 if a < b
 *                  0 if a == b
 *                 >0 if a > b
 *                  Defaults to the built‑in `<`/`>` for primitive types.
 */
function quickSort<T>(array: T[], compare?: (a: T, b: T) => number): void {
  const cmp = compare ?? defaultCompare;

  // Public wrapper that starts the recursive routine.
  sort(0, array.length - 1);

  /** Recursive partitioning */
  function sort(left: number, right: number): void {
    if (left >= right) return;          // one element or invalid range
    const pivotIdx = partition(left, right);
    sort(left, pivotIdx - 1);            // left partition
    sort(pivotIdx + 1, right);           // right partition
  }

  /**
   * Partition the sub‑array [left … right] around a pivot.
   * Returns the final pivot index so the caller can split.
   */
  function partition(left: number, right: number): number {
    const pivotIndex = right;            // choose the last element as pivot
    const pivotValue = array[pivotIndex];
    let storeIndex = left;               // first place where a value < pivot will go

    for (let i = left; i < right; i++) {
      if (cmp(array[i], pivotValue) < 0) {
        [array[i], array[storeIndex]] = [array[storeIndex], array[i]];
        storeIndex++;
      }
    }
    // Move pivot to its final place
    [array[storeIndex], array[pivotIndex]] = [array[pivotIndex], array[storeIndex]];
    return storeIndex;
  }
}

/** Default comparator for primitive types. */
function defaultCompare(a: unknown, b: unknown): number {
  if (a === b) return 0;
  return a < b ? -1 : 1;
}
const nums = [3, 8, 4, 1, 9, 5];
quickSort(nums);               // sorts in place
console.log(nums);             // [1, 3, 4, 5, 8, 9]

const words = ["banana", "apple", "pear"];
quickSort(words);              // defaults to lexical order
console.log(words);            // ["apple", "banana", "pear"]

// Custom order: descending numbers
quickSort(nums, (a, b) => b - a);
console.log(nums);             // [9, 8, 5, 4, 3, 1]
