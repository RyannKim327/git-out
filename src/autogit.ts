/**
 * Quick‑sorts an array in place and returns the same array reference.
 *
 * @param array   The array to sort. It is mutated in place.
 * @param left    Index of the first element to sort (inclusive).  Default: 0.
 * @param right   Index of the last element to sort (inclusive).  Default: array.length - 1.
 * @returns       The sorted array (same reference as the argument).
 */
function quickSort<T>(array: T[], left = 0, right: number = array.length - 1): T[] {
  // Base case: if the sub‑array has one or zero elements, it’s already sorted
  if (left >= right) return array;

  // Partition the array around a pivot and get its final index
  const pivotIndex = partition(array, left, right);

  // Recursively sort the two halves
  quickSort(array, left, pivotIndex - 1);
  quickSort(array, pivotIndex + 1, right);

  return array;
}

/**
 * Rearranges the elements in array[left…right] so that:
 *   – Elements < pivot sit left of the pivot
 *   – Elements >= pivot sit right of the pivot
 * Returns the final index of the pivot.
 */
function partition<T>(array: T[], left: number, right: number): number {
  // Take the rightmost element as pivot (last element strategy)
  const pivot = array[right];

  // Index of the smaller element
  let i = left - 1;

  for (let j = left; j < right; j++) {
    // Use the generic < operator; if needed, replace with a custom comparator.
    if (array[j] < pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]]; // swap
    }
  }

  // Place pivot in the correct spot
  [array[i + 1], array[right]] = [array[right], array[i + 1]];

  return i + 1; // pivot final position
}

// ─────────────────────────────────────────────────────────────────────────────────

/* Example usage */

const nums = [12, 4, 5, 6, 7, 3, 1, 15];
console.log('Before:', nums);

quickSort(nums);
console.log('After :', nums);     // → [1, 3, 4, 5, 6, 7, 12, 15]

const strings = ['pear', 'apple', 'orange', 'banana'];
quickSort(strings);
console.log(strings); // → ['apple', 'banana', 'orange', 'pear']
