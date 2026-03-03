/**
 * Random‑pivot quicksort for an array of numbers.
 *
 * @param arr – the array to sort (it will be sorted in place)
 * @returns the sorted array (same reference as the input)
 */
function randomQuickSort(arr: number[]): number[] {
  // Internal helper that works on a sub‑range [left, right]
  function sort(left: number, right: number) {
    if (left >= right) return;           // 0 or 1 element – nothing to do

    // Pick a random pivot index between left and right (inclusive)
    const pivotIndex = Math.floor(Math.random() * (right - left + 1)) + left;
    const pivotValue = arr[pivotIndex];

    // Move the pivot to the rightmost position for the partition step
    [arr[pivotIndex], arr[right]] = [arr[right], arr[pivotIndex]];

    // Standard Lomuto partition
    let storeIndex = left;
    for (let i = left; i < right; i++) {
      if (arr[i] < pivotValue) {
        [arr[i], arr[storeIndex]] = [arr[storeIndex], arr[i]];
        storeIndex++;
      }
    }

    // Put the pivot back in its final place
    [arr[storeIndex], arr[right]] = [arr[right], arr[storeIndex]];

    // Recurse on the two partitions
    sort(left, storeIndex - 1);
    sort(storeIndex + 1, right);
  }

  sort(0, arr.length - 1);
  return arr;
}

/*--------------------------------------------
  Example usage
--------------------------------------------*/

const data = [34, 7, 23, 32, 5, 62];
console.log('Unsorted:', data);

const sorted = randomQuickSort([...data]); // copy to avoid mutating the original
console.log('Sorted  :', sorted);
