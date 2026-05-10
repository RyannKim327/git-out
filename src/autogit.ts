/**
 * Generic Shell Sort.
 *
 * @param arr   The array to sort in‑place.
 * @param cmp   Optional comparator.  Returns a negative number if a < b,
 *              zero if a == b, positive if a > b.
 * @returns     The sorted array (same reference as input).
 *
 * @example
 *   const nums = [9, 5, 1, 4, 3];
 *   shellSort(nums);          // [1,3,4,5,9]
 *
 *   const nameList = ['Zoe', 'Alice', 'Bob'];
 *   shellSort(nameList, (a, b) => a.localeCompare(b)); // ['Alice','Bob','Zoe']
 */
function shellSort<T>(
  arr: T[],
  cmp?: (a: T, b: T) => number
): T[] {
  const len = arr.length;
  if (len < 2) return arr;          // already sorted

  // Default comparator uses JavaScript's < and > operators.
  const compare = cmp
    ? cmp
    : (a: T, b: T) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      };

  // Classic Shell sequence: n/2, n/4, …, 1
  let gap = Math.floor(len / 2);
  while (gap > 0) {
    // For each shift positions, perform an insertion sort on the sub‑array
    for (let i = gap; i < len; i++) {
      const temp = arr[i];
      let j = i;

      // Shift elements of the sub‑array that are greater than temp
      // rightward by one position.
      while (j >= gap && compare(arr[j - gap], temp) > 0) {
        arr[j] = arr[j - gap];
        j -= gap;
      }

      arr[j] = temp;
    }

    gap = Math.floor(gap / 2); // Reduce the gap for the next pass.
  }

  return arr;
}
const data = [22, 45, 12, 8, 4, 30, 6];
console.log('Before:', data);

shellSort(data);

console.log('After:', data);
Before: [22,45,12,8,4,30,6]
After: [4,6,8,12,22,30,45]
