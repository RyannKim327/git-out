/**
 * Returns the k-th smallest element of an array.
 *
 * @param arr   Array of numbers (or any comparable type).
 * @param k     1‑based index of the element to find.
 * @returns     The k‑th smallest value.
 *
 * @throws      If k is out of bounds.
 */
export function kthSmallest<T>(arr: T[], k: number): T {
  if (k < 1 || k > arr.length) {
    throw new Error(`k=${k} is not in the valid range 1..${arr.length}`);
  }

  // Work on a copy so the original array stays untouched.
  const a = arr.slice();
  let left = 0;
  let right = a.length - 1;

  while (true) {
    // Pick a pivot – here we just pick the middle element.
    const pivotIndex = left + Math.floor((right - left) / 2);
    const pivot = a[pivotIndex];

    // Partition step: elements < pivot go left, >= pivot go right.
    const pivotNewIndex = partition(a, left, right, pivot);

    if (pivotNewIndex === k - 1) {      // Found the k‑th smallest
      return a[pivotNewIndex];
    } else if (pivotNewIndex > k - 1) {  // Look in the left partition
      right = pivotNewIndex - 1;
    } else {                            // Look in the right partition
      left = pivotNewIndex + 1;
    }
  }
}

/**
 * Standard Lomuto partition scheme.
 *
 * @param a array to partition
 * @param lo left boundary
 * @param hi right boundary
 * @param pivotValue value the array should be partitioned around
 * @returns new index of the pivot after partition
 */
function partition<T>(a: T[], lo: number, hi: number, pivotValue: T): number {
  // Move pivot to the end for convenience.
  let pivotIndex = lo + (Math.random() * (hi - lo + 1)) | 0; // random pivot for stability
  [a[pivotIndex], a[hi]] = [a[hi], a[pivotIndex]];

  const pivot = a[hi];
  let storeIndex = lo;                         // index of the first element >= pivot

  for (let i = lo; i < hi; i++) {
    if (a[i] < pivot) {
      [a[i], a[storeIndex]] = [a[storeIndex], a[i]];
      storeIndex++;
    }
  }

  // place pivot after the last smaller element
  [a[storeIndex], a[hi]] = [a[hi], a[storeIndex]];
  return storeIndex;
}
export function kthSmallestSort<T>(arr: T[], k: number): T {
  if (k < 1 || k > arr.length) throw new Error('k out of bounds');
  return [...arr].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))[k - 1];
}
const nums = [7, 11, 5, 3, 9, 2];
console.log(kthSmallest(nums, 3)); // 5
console.log(kthSmallestSort(nums, 3)); // 5
