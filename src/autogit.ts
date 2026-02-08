/**
 * Merges two sorted slices `left` and `right` into a single sorted array.
 * The operation is stable — items that compare equal keep their original
 * relative order.
 */
function merge<T>(left: T[], right: T[], compare: (a: T, b: T) => number): T[] {
  const result: T[] = [];
  let i = 0;          // index into left
  let j = 0;          // index into right

  while (i < left.length && j < right.length) {
    if (compare(left[i], right[j]) <= 0) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  // Append any remaining elements
  return result.concat(left.slice(i), right.slice(j));
}

/**
 * Recursively sorts `array` using merge sort.
 *
 * @param array   – the array to sort
 * @param compare – a comparator returning a negative number if a < b,
 *                  zero if a == b, and a positive number otherwise.
 *
 * @returns a NEW sorted array; the input array is left untouched.
 */
export function mergeSort<T>(array: T[], compare: (a: T, b: T) => number): T[] {
  // Base case: arrays of length 0 or 1 are already sorted
  if (array.length <= 1) {
    return array.slice();          // shallow copy to stay pure
  }

  const mid = Math.floor(array.length / 2);
  const left  = array.slice(0, mid);
  const right = array.slice(mid);

  // Sort each half and merge
  const sortedLeft  = mergeSort(left,  compare);
  const sortedRight = mergeSort(right, compare);

  return merge(sortedLeft, sortedRight, compare);
}

/* ---------------------------------------------------------
   Example usage:
   ---------------------------------------------------------

   // Numeric sort (ascending)
   const numbers = [32, 5, 73, 1, 42];
   const sortedNumbers = mergeSort(numbers, (a, b) => a - b);

   // String sort by length
   const words = ["banana", "apple", "fig", "cherry"];
   const sortedByLength = mergeSort(words, (a, b) => a.length - b.length);
   -------------------------------------------------------- */
